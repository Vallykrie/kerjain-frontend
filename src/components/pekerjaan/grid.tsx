// components/JobCardGrid.tsx
import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';

interface JobListing {
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

const JobCardGrid: FC = () => {
  // Sample data based on the image
  const jobListings: JobListing[] = [
    {
      id: '1',
      title: 'Crew Kitchen',
      company: {
        name: 'Ramen MieMiw',
        logo: '/logos/miemiw.png',
        address: 'Jl. Bangka No. 1D, Pela Mampang, Jakarta Selatan'
      },
      salary: {
        min: 3,
        max: 4.5
      },
      requirements: {
        education: 'Minimal SMA/SMK',
        experience: '1-3 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Kerja di Kantor'
      },
      postedTime: '7 menit yang lalu'
    },
    {
      id: '2',
      title: 'Creative Digital Content',
      company: {
        name: 'PT Excare Warranty Indonesia',
        logo: '/logos/excare.png',
        address: 'Jl. Fatmawati Raya No. 9B, Gandaria, Jakarta Selatan'
      },
      salary: {
        min: 3.1,
        max: 6
      },
      requirements: {
        education: 'Minimal SMA/SMK',
        experience: '<1 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Hybrid'
      },
      postedTime: '15 menit yang lalu'
    },
    {
      id: '3',
      title: 'Account Receivable (AR)',
      company: {
        name: 'PT Endo Medica Nusantara',
        logo: '/logos/endo.png',
        address: 'Jl. Tegalan Raya No. 1 G, Jakarta Timur, Indonesia'
      },
      salary: {
        min: 4,
        max: 5.3
      },
      requirements: {
        education: 'Minimal Diploma',
        experience: '1-3 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Kerja di Kantor'
      },
      postedTime: '21 menit yang lalu'
    },
    {
      id: '4',
      title: 'Admin Finance',
      company: {
        name: 'Bakoel Koffie',
        logo: '/logos/bakoel.png',
        address: 'Jl. Cikini Raya No.25, Menteng, Jakarta Pusat'
      },
      salary: {
        min: 3.5,
        max: 4
      },
      requirements: {
        education: 'Minimal SMA/SMK',
        experience: '1-3 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Kerja di Kantor'
      },
      postedTime: '30 menit yang lalu'
    },
    {
      id: '5',
      title: 'Driver',
      company: {
        name: 'PT. DARYA CIPTA PRATAMA',
        logo: '/logos/darya.png',
        address: 'Gandaria 8 Office Tower, Jakarta Selatan'
      },
      salary: {
        min: 4,
        max: 4.9
      },
      requirements: {
        education: 'Minimal SMA/SMK',
        experience: '1-3 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Kerja di Kantor'
      },
      postedTime: '45 menit yang lalu'
    },
    {
      id: '6',
      title: 'Graphic Designer',
      company: {
        name: 'PT UNIMITRA ANDALAN SEJATI',
        logo: '/logos/unimitra.png',
        address: 'Jl. Tekno 1, Cikarang Utara, Bekasi'
      },
      salary: {
        min: 4.5,
        max: 5
      },
      requirements: {
        education: 'Minimal Diploma',
        experience: '3-5 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Kerja di Kantor'
      },
      postedTime: '15 menit yang lalu'
    },
    {
      id: '7',
      title: 'Outlet Crew / Staff Toko',
      company: {
        name: 'Pisang Ungu',
        logo: '/logos/pisang.png',
        address: 'Tangerang Selatan'
      },
      salary: {
        min: 2,
        max: 2.8
      },
      requirements: {
        education: 'Minimal SMA/SMK',
        experience: '<1 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Kerja di Kantor'
      },
      postedTime: '45 menit yang lalu'
    },
    {
      id: '8',
      title: 'Admin Social Media',
      company: {
        name: 'Buna Home Care',
        logo: '/logos/buna.png',
        address: 'Klinik Buna Homecare, Pamulang, Tangerang Selatan'
      },
      salary: {
        min: 2,
        max: 3
      },
      requirements: {
        education: 'Minimal SMA/SMK',
        experience: '<1 Tahun'
      },
      workInfo: {
        schedule: 'Penuh Waktu',
        location: 'Kerja di Rumah'
      },
      postedTime: '15 menit yang lalu'
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobListings.map((job) => (
          <Card key={job.id} className="overflow-hidden">
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
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Tuna Rungu</Badge>
                {job.title === 'Crew Kitchen' || job.title === 'Driver' || job.title === 'Outlet Crew / Staff Toko' ? (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Tuna Wicara</Badge>
                ) : null}
                <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200">{job.requirements.education}</Badge>
                <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200">{job.requirements.experience}</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200">{job.workInfo.schedule}</Badge>
                <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200">{job.workInfo.location}</Badge>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src={`/api/placeholder/40/40`} 
                    alt={`${job.company.name} logo`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <div className="font-medium">{job.company.name}</div>
                  <div className="text-sm text-gray-500">{job.company.address}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
              <div className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-sm">
                Terbaru
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{job.postedTime}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <BookmarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobCardGrid;