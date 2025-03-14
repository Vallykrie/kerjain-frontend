import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface JobResponse {
  id: number;
  name: string;
  description: string;
  salary: number;
  location: string;
  company_id: number;
  disability_id: number;
  education_id: number;
  experience_id: number;
  type_id: number;
  policy_id: number;
  created_at: string;
  updated_at: string;
  company?: {
    id: number;
    name: string;
    location: string;
    description: string;
    logo: string;
    created_at: string;
    updated_at: string;
  };
  disability?: {
    id: number;
    type: string;
    created_at: string;
    updated_at: string;
  };
  education?: {
    id: number;
    level: string;
    created_at: string;
    updated_at: string;
  };
  experience?: {
    id: number;
    duration: string;
    created_at: string;
    updated_at: string;
  };
  type?: {
    id: number;
    duration: string;
    created_at: string;
    updated_at: string;
  };
  policy?: {
    id: number;
    location: string;
    created_at: string;
    updated_at: string;
  };
}

export interface ApiResponse {
  message: string;
  data: {
    current_page: number;
    data: JobResponse[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
  };
}

export interface JobListing {
  id: string;
  title: string;
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
    experience?: string;
    education?: string;
    skills?: string[];
  };
  workInfo: {
    schedule: string;
    location: string;
  };
  postedTime: string;
  disabilityTypes: string[];
}

export interface FilterParams {
  search?: string;
  company_name?: string;
  disability_type?: string[];
  education_level?: string[];
  experience_duration?: string[];
  type_duration?: string[];
  policy_location?: string[];
  prioritize?: "relevant" | "latest";
  page?: number;
}

const formatPostedTime = (createdAt: string): string => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} jam yang lalu`;
  } else {
    const days = Math.floor(diffInMinutes / (24 * 60));
    return `${days} hari yang lalu`;
  }
};

const transformJobData = (job: JobResponse): JobListing => {
  const salaryNumber = job.salary;
  const minSalary = salaryNumber / 1000000; 
  const maxSalary = minSalary * 1.5;

  const disabilityTypes: string[] = [];
  if (job.disability?.type) {
    disabilityTypes.push(job.disability.type);
  }

  return {
    id: job.id.toString(),
    title: job.name,
    company: {
      name: job.company?.name || "Company Name",
      logo: job.company?.logo || "/api/placeholder/40x40",
      address: job.company?.location || "Location not specified",
    },
    salary: {
      min: parseFloat(minSalary.toFixed(1)),
      max: parseFloat(maxSalary.toFixed(1)),
    },
    requirements: {
      education: job.education?.level || "Not specified",
      experience: job.experience?.duration || "Not specified",
    },
    workInfo: {
      schedule: job.type?.duration || "Not specified",
      location: job.policy?.location || "Not specified",
    },
    postedTime: formatPostedTime(job.created_at),
    disabilityTypes: disabilityTypes,
  };
};

const mapFiltersToQueryParams = (filters: FilterParams) => {
  const params: Record<string, string | string[]> = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.company_name) {
    params.company_name = filters.company_name;
  }

  if (filters.disability_type && filters.disability_type.length > 0) {
    params.disability_type = filters.disability_type.join(",");
  }

  if (filters.education_level && filters.education_level.length > 0) {
    params.education_level = filters.education_level.join(",");
  }

  if (filters.experience_duration && filters.experience_duration.length > 0) {
    params.experience_duration = filters.experience_duration.join(",");
  }

  if (filters.type_duration && filters.type_duration.length > 0) {
    params.type_duration = filters.type_duration.join(",");
  }

  if (filters.policy_location && filters.policy_location.length > 0) {
    params.policy_location = filters.policy_location.join(",");
  }

  if (filters.page) {
    params.page = filters.page.toString();
  }

  if (filters.prioritize) {
    params.sort = filters.prioritize;
  }

  return params;
};

export const useJobsQuery = (filters: FilterParams = {}) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const params = mapFiltersToQueryParams(filters);
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/api/jobsIn`,
        { params }
      );

      // Transform the data
      const transformedJobs = response.data.data.data.map(transformJobData);

      return {
        jobs: transformedJobs,
        pagination: {
          currentPage: response.data.data.current_page,
          totalPages: response.data.data.last_page,
          totalItems: response.data.data.total,
        },
      };
    },
  });
};

export const useJobDetails = (jobId: string | undefined) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      if (!jobId) {
        throw new Error("Job ID is required");
      }
      const response = await axios.get<{ message: string; data: JobResponse }>(
        `${API_BASE_URL}/api/jobsIn/${jobId}`
      );
      return transformJobData(response.data.data);
    },
    enabled: !!jobId, 
  });
};
