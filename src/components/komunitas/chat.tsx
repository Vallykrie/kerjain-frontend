import { ChatMessage } from '@/lib/types/komunitas';
import Image from 'next/image';

interface ChatMessageProps {
  message: ChatMessage;
}

export default function ChatMessageComponent({ message }: ChatMessageProps) {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-800">
          <Image 
            src={message.author.avatar} 
            alt={message.author.name} 
            width={48} 
            height={48}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold">{message.author.name}</h4>
          <span className="text-gray-500 text-sm">@{message.author.username}</span>
          <span className="text-gray-500 text-sm ml-auto">{message.timestamp}</span>
        </div>
        <p className="text-gray-800 mb-2">{message.content}</p>
        {message.hashtags && message.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {message.hashtags.map((tag, index) => (
              <span key={index} className="text-blue-600">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}