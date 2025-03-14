"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import { useJobsQuery, FilterParams, JobListing } from "@/hooks/useJobsQuery";
import { useRouter } from "next/navigation";

interface JobCardGridProps {
  filters?: FilterParams;
}

const JobCardGrid: FC<JobCardGridProps> = ({ filters }) => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useJobsQuery(filters);
  

  const handleCardClick = (jobId: string) => {
    router.push(`/pekerjaan/${jobId}`);
    // window.open(`${API_BASE_URL}/pekerjaan/${jobId}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="overflow-hidden animate-pulse">
              <CardHeader className="p-4 h-20 bg-gray-200" />
              <CardContent className="p-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded" />
              </CardContent>
              <CardFooter className="p-4 bg-gray-100 h-12" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <div className="p-4 border rounded-lg bg-red-50 text-red-600">
          <p className="font-medium">Error loading jobs</p>
          <p className="text-sm">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  // Early return if no data
  if (!data || data.jobs.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="p-4 border rounded-lg bg-gray-50 text-gray-600 text-center">
          <p className="font-medium">Tidak ada lowongan yang ditemukan</p>
          <p className="text-sm">Coba ubah filter pencarian anda</p>
        </div>
      </div>
    );
  }

  const getDisabilityLabel = (type: string): string => {
    const mapping: Record<string, string> = {
      "tuna-rungu": "Tuna Rungu",
      "tuna-wicara": "Tuna Wicara",
      "tuna-daksa": "Tuna Daksa",
      "tuna-netra": "Tuna Netra",
    };

    return mapping[type] || type;
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.jobs.map((job: JobListing) => (
          <Card
            key={job.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handleCardClick(job.id)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <div className="text-gray-600 font-medium">
                  Rp {job.salary.min} jt - {job.salary.max} jt
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {job.disabilityTypes.map((type, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {getDisabilityLabel(type)}
                  </Badge>
                ))}
                <Badge
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  {job.requirements.education}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  {job.requirements.experience}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  {job.workInfo.schedule}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  {job.workInfo.location}
                </Badge>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={job.company.logo || `/api/placeholder/40/40`}
                    alt={`${job.company.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{job.company.name}</div>
                  <div className="text-sm text-gray-500">
                    {job.company.address}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
              <div className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-sm">
                Terbaru
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{job.postedTime}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {data.pagination && data.pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {[...Array(data.pagination.totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={
                  data.pagination.currentPage === index + 1
                    ? "default"
                    : "outline"
                }
                size="sm"
                className={
                  data.pagination.currentPage === index + 1 ? "bg-blue-600" : ""
                }
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCardGrid;
