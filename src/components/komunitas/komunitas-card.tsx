'use client';

import { Community } from '@/lib/types/komunitas';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  const router = useRouter();
  
  const handleJoin = () => {
    router.push(`/komunitas/${community.id}`);
  };

  return (
    <Card className="w-full bg-slate-50 rounded-lg overflow-hidden">
      <div className="flex justify-end p-3">
        <button className="text-gray-500">
          <MoreVertical size={20} />
        </button>
      </div>
      <CardContent className="flex flex-col items-center pt-0 pb-4">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-4">
          <Image 
            src={community.logoUrl} 
            alt={community.name} 
            width={80} 
            height={80}
            className="rounded-full"
          />
        </div>
        <h3 className="font-bold text-2xl text-center">{community.name}</h3>
        <p className="text-gray-600 mt-1">{community.followers.toLocaleString()} pengikut</p>
      </CardContent>
      <CardFooter className="pb-5">
        <Button 
          className="w-full bg-blue-800 hover:bg-blue-900 text-white rounded-full py-2"
          onClick={handleJoin}
        >
          Bergabung
        </Button>
      </CardFooter>
    </Card>
  );
}