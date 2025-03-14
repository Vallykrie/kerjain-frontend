"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Building, MapPin, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useJobsQuery, JobListing } from "@/hooks/useJobsQuery";

interface JobDetailResponse {
  name: string;
  description: string;
  salary: number;
  location: string;
  company_name: string;
  disability_type: string;
  education_level: string;
  experience_duration: string;
  type_duration: string;
  policy_location: string;
}

interface TransformedJob {
  id: string;
  title: string;
  description: string;
  company: {
    name: string;
    logo: string;
    address: string;
  };
  salary: {
    min: number;
    max: number;
  };
  requirements: {
    education: string;
    experience: string;
  };
  workInfo: {
    schedule: string;
    location: string;
  };
  disabilityTypes: string[];
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [job, setJob] = useState<JobDetailResponse | null>(null);
  const [transformedJob, setTransformedJob] = useState<TransformedJob | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/jobsIn/${jobId}`);
        console.log("API Response:", response.data);

        const jobData = response.data.data;
        setJob(jobData);

        setTransformedJob({
          id: jobId,
          title: jobData.name,
          description: jobData.description,
          company: {
            name: jobData.company_name,
            logo: "/api/placeholder/200x200",
            address: jobData.location,
          },
          salary: {
            min: Math.floor(jobData.salary / 1000000),
            max: Math.ceil((jobData.salary * 1.5) / 1000000),
          },
          requirements: {
            education: jobData.education_level,
            experience: jobData.experience_duration,
          },
          workInfo: {
            schedule: jobData.type_duration,
            location: jobData.policy_location,
          },
          disabilityTypes: [jobData.disability_type],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, API_BASE_URL]);

  const { data: recommendationsData } = useJobsQuery({ page: 1 });
  const [recommendations, setRecommendations] = useState<JobListing[]>([]);

  useEffect(() => {
    if (recommendationsData?.jobs) {
      const filteredJobs = recommendationsData.jobs
        .filter((recJob) => recJob.id !== jobId)
        .slice(0, 2);
      setRecommendations(filteredJobs);
    }
  }, [recommendationsData, jobId]);

  const handleGoBack = () => {
    router.back();
  };

  const handleApplyJob = () => {
    router.push(`/lamaran/${jobId}`);
  };

  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Save job:", jobId);
  };

  const handleShareJob = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Share job:", jobId);
  };

  const getDisabilityLabel = (type: string): string => {
    const mapping: Record<string, string> = {
      "tuna-rungu": "Tuna Rungu",
      "tuna-wicara": "Tuna Wicara",
      "tuna-daksa": "Tuna Daksa",
      "tuna-netra": "Tuna Netra",
      "disabilitas-mental": "Disabilitas Mental",
    };
    return mapping[type] || type;
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-4 px-4 sm:px-6">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-60 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (isError || !job || !transformedJob) {
    return (
      <div className="container max-w-4xl mx-auto py-4 px-4 sm:px-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Pencarian</span>
        </button>

        <div className="p-8 text-center border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Lowongan tidak ditemukan
          </h2>
          <p className="text-gray-600 mb-4">
            Maaf, lowongan yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Button
            onClick={handleGoBack}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Kembali ke Pencarian
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4 bg-gray-50 h-fit">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span>Pencarian</span>
      </button>
      <div className="flex flex-row space-x-3  max-xl:flex-col">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            {/* Job detail section */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Company logo */}
                <div className="w-full md:w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/api/placeholder/200/200"
                    alt={`${transformedJob.company.name} logo`}
                    className="w-full h-auto object-contain p-4"
                  />
                </div>

                {/* Job details */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {transformedJob.disabilityTypes.map((type, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="text-2xl font-bold mb-2">
                    {transformedJob.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    <span>{transformedJob.company.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{transformedJob.company.address}</span>
                  </div>

                  <div className="text-lg font-semibold mb-6">
                    Rp {transformedJob.salary.min.toLocaleString()} -{" "}
                    {transformedJob.salary.max.toLocaleString()}/Bulan
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        Tipe Pekerjaan:{" "}
                      </span>
                      <span className="font-medium">
                        {transformedJob.workInfo.schedule}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        Minimal Pendidikan:{" "}
                      </span>
                      <span className="font-medium">
                        {transformedJob.requirements.education}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        Pengalaman:{" "}
                      </span>
                      <span className="font-medium">
                        {transformedJob.requirements.experience}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        Lokasi Kerja:{" "}
                      </span>
                      <span className="font-medium">
                        {transformedJob.workInfo.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 py-6 px-8"
                      onClick={handleApplyJob}
                    >
                      Lamar Kerja
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 border-gray-300"
                        onClick={handleSaveJob}
                      >
                        <Bookmark className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 border-gray-300"
                        onClick={handleShareJob}
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company details section */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Detail Perusahaan</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {transformedJob.company.name} berkomitmen untuk membuka
                kesempatan kerja yang inklusif dan ramah bagi semua individu,
                termasuk penyandang disabilitas dan mereka yang berasal dari
                berbagai latar belakang.
              </p>
              {job.description && (
                <p className="text-gray-700 mt-4">{job.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations section */}
        <div className="">
          <h2 className="text-xl font-bold mb-4">Rekomendasi Lainnya</h2>
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((rec) => (
              <Card
                key={rec.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => router.push(`/pekerjaan/${rec.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{rec.title}</h3>

                      <div className="flex flex-wrap gap-2 my-2">
                        {rec.disabilityTypes.map((type, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {getDisabilityLabel(type)}
                          </Badge>
                        ))}
                        <Badge variant="secondary" className="bg-gray-100">
                          {rec.requirements.education}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 my-2">
                        <Badge variant="secondary" className="bg-gray-100">
                          {rec.requirements.experience}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-100">
                          {rec.workInfo.schedule}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-100">
                          {rec.workInfo.location}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                          <img
                            src={rec.company.logo || `/api/placeholder/32/32`}
                            alt={`${rec.company.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {rec.company.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rec.company.address}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600 font-medium whitespace-nowrap">
                        Rp {rec.salary.min} jt - {rec.salary.max} jt
                      </div>
                      <div className="mt-auto">
                        <div className="bg-yellow-100 text-yellow-800 text-xs py-1 px-3 rounded-full mt-4">
                          Paling Relevan
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {rec.postedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
