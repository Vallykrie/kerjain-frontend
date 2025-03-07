import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/navbar/navbar";
import { Toaster } from "sonner";
import LiveChat from "@/components/live-chat/tawk-to-chat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KerjaIn",
  description:
    "KerjaIn adalah platform inklusif yang membuka akses bagi penyandang disabilitas untuk menemukan peluang kerja sesuai dengan keahlian dan minat mereka. Selain melamar pekerjaan, pengguna dapat bergabung dalam komunitas yang suportif untuk berbagi pengalaman, mendapatkan motivasi, dan memperluas jaringan. Tak hanya itu, fitur edukasi di KerjaIn memungkinkan pengguna mengasah keterampilan melalui pelatihan dan materi pembelajaran agar lebih siap bersaing di dunia kerja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <LiveChat />
        {children}
      </body>
    </html>
  );
}
