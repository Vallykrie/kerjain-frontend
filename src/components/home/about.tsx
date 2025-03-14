import React from "react";

const About = () => {
  return (
    <div className="bg-[#082A98] flex justify-center items-center min-h-screen p-52 gap-8 max-w max-xl:px-20 max-lg:px-20 max-md:px-10 max-sm:px-5 max-lg:flex-col">
      <div className="bg-[#FFFDD9] p-5 rounded-xl h-fit min-h-[500px] w-1/2 max-lg:w-full max-lg:min-h-0 space-y-10 flex-col justify-center items-center max-md:space-y-4">
        <h1 className="text-5xl font-black text-center max-lg:text-4xl max-md:text-3xl max-sm:text-xl">
          Tentang KerjaIn
        </h1>
        <p className="max-lg:text-xl max-md:text-lg max-sm:text-sm">
          KerjaIn adalah platform inklusif yang membuka akses bagi penyandang
          disabilitas untuk menemukan peluang kerja sesuai dengan keahlian dan
          minat mereka. Selain melamar pekerjaan, pengguna dapat bergabung dalam
          komunitas yang suportif untuk berbagi pengalaman, mendapatkan
          motivasi, dan memperluas jaringan. Tak hanya itu, fitur edukasi di
          KerjaIn memungkinkan pengguna mengasah keterampilan melalui pelatihan
          dan materi pembelajaran agar lebih siap bersaing di dunia kerja.
        </p>
      </div>
      <div className="rounded-3xl w-full h-[500px]">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/sEhS83z3XRM?si=ohcTWe-vj2MUEw91"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default About;
