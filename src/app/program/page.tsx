import { AdvertisementSlider } from "@/components/program/advertisement";
import { BootcampGrid } from "@/components/program/bootcamp-grid";
import { advertisementData, bootcampData } from "@/components/program/mockData";
import Navbar from "@/components/navbar/navbar";
import VoiceSearch from "@/components/speech-recognition";

export default function Programs() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="w-full">
        <AdvertisementSlider
          advertisements={advertisementData}
          autoSlideInterval={5000}
        />
      </section>
      <section className="container mx-auto py-16 px-4 space-y-4">
        <VoiceSearch></VoiceSearch>
        <BootcampGrid bootcamps={bootcampData} />
      </section>
    </main>
  );
}
