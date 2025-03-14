    export interface Community {
    id: string;
    name: string;
    followers: number;
    logoUrl: string;
  }
  
  export interface ChatMessage {
    id: string;
    author: {
      name: string;
      avatar: string;
      username: string;
    };
    content: string;
    timestamp: string;
    hashtags?: string[];
  }