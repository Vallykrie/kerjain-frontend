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
}
