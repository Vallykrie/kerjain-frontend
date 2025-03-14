"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean; // true: memperlihatkan proses transkripsi
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "id-ID";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        setSearchText(transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSearchText("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex w-full justify-center items-center space-x-2">
        <div className="relative w-full">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Cari Nama Pekerjaan, Skill, Lokasi, dan Perusahaan"
            className="w-full pr-10 bg-[#F0F3F9] border-[#F0F3F9] h-14 text-lg max-md:text-sm max-md:h-8"
            aria-label="Search input"
          />
        </div>

        {isSupported && (
          <button
            type="button"
            onClick={toggleListening}
            aria-label={isListening ? "Stop listening" : "Start voice search"}
            className="h-10 w-10"
          >
            {isListening ? (
              <MicOff className="h-full w-full" />
            ) : (
              <Mic className="h-full w-full" />
            )}
          </button>
        )}

        <Button
          type="submit"
          variant="default"
          size="icon"
          aria-label="Submit search"
          className="w-1/4 h-14 font-semibold text-xl rounded-xl bg-[#05195B] hover:bg-blue-900 max-md:text-sm max-md:h-8"
        >
          Cari
        </Button>
      </form>

      {isListening && (
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 text-destructive">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </span>
            <span>Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
}
