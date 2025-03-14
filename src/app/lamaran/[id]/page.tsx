import FormWrapper from "@/components/lamaran/form-wrapper";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pb-12">
      <Navbar />
      <section className="p-12 h-fit w-fit rounded-3xl bg-gray-50 mx-auto">
        <FormWrapper />
      </section>
    </main>
  );
}
