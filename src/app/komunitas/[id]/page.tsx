// app/community/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { ChatMessage } from "@/lib/types/komunitas";
import ChatMessageComponent from "@/components/komunitas/chat";
import { ArrowLeft, Mic, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import Navbar from "@/components/navbar/navbar";

export default function CommunityChat() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom of chat when component mounts
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  // Mock data for community name
  const communityNames: Record<string, string> = {
    "tuna-rungu-indonesia": "Tuna Rungu Indonesia",
    "tuna-daksa-indonesia": "Tuna Daksa Indonesia",
    "sehat-mental-indonesia": "Sehat Mental Indonesia",
  };

  const communityName = communityNames[id] || "Komunitas";

  // Mock data for chat messages
  const messages: ChatMessage[] = [
    {
      id: "1",
      author: {
        name: "Raisa Nayara",
        username: "raisanyra",
        avatar: "https://via.placeholder.com/48/F8F9FA/333333?text=RN",
      },
      content:
        "Jadi tunarungu bukan berarti nggak bisa kerja di kantor! Aku udah 2 tahun jadi telemarketer, pakai chat dan video call dengan caption buat komunikasi. Tantangan? Banyak! Tapi komunikasi yang efektif dan teknologi bantu itu kuncinya. Jangan takut coba! 💪",
      timestamp: "15 menit yang lalu",
      hashtags: ["TunaRunguBerkarya"],
    },
    {
      id: "2",
      author: {
        name: "Reza Arya",
        username: "aryarz",
        avatar: "https://via.placeholder.com/48/F8F9FA/333333?text=RA",
      },
      content:
        'Dulu aku mikir, "Tuna rungu bisa kerja jadi editor video nggak, ya?" 🤔 Soalnya kan editor biasanya harus dengar audio, kasih efek suara yang pas, dan sinkronisasi musik... Semua kayaknya mustahil buat aku yang nggak bisa mendengar. Tapi aku NEKAT coba! 🎬 Awalnya belajar dari nol, mulai dari memahami software editing, pakai waveform buat lihat ritme suara, sampai baca transkrip buat nyesuaiin dialog. Aku pakai subtitle otomatis dan bantuan visual buat ngedit, terus mengandalkan getaran dan cahaya buat ngikutin beat musik.',
      timestamp: "15 menit yang lalu",
      hashtags: ["TunaRunguBerkarya", "EditorTunaRungu"],
    },
    {
      id: "3",
      author: {
        name: "Zainuddin",
        username: "znuddin",
        avatar: "https://via.placeholder.com/48/F8F9FA/333333?text=Z",
      },
      content:
        'Dulu aku mikir, "Tuna rungu bisa kerja jadi desainer grafis nggak, ya?" 🤔 Soalnya komunikasi sama klien dan tim itu penting. Tapi dengan chat, email, dan referensi visual, aku bisa! Sekarang? Karyaku udah dipakai banyak brand, dan aku terus berkembang di industri kreatif! 🎨💼📱',
      timestamp: "15 menit yang lalu",
      hashtags: ["DesainerTunaRungu"],
    },
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar></Navbar>
      <div className="p-12 ">
        <div className="rounded-3xl border ">
          {/* Header */}
          <header className="bg-blue-800 text-white p-4 flex items-center">
            <button onClick={handleBack} className="mr-4">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{communityName}</h1>
          </header>

          {/* Chat Messages */}
          <div
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 8rem)" }}
          >
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ketik pesan di sini"
                className="flex-grow rounded-full border-gray-300"
              />
              <button className="p-2 text-gray-500">
                <Mic size={20} />
              </button>
              <button className="p-2 rounded-full bg-blue-800 text-white">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
