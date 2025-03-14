import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import instagram from "public/instagram.svg";
import facebook from "public/facebook.svg";
import twitter from "public/twitter.svg";

const Footer = () => {
  return (
    <footer className="w-full h-fit pb-24 bg-blue_primary p-16 space-y-4 text-white max-[500px]:p-4">
      <div className="grid grid-cols-4 max-[930px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4 h-1/2">
        <div className="space-y-3 max-[500px]:space-y-0">
          <h3 className="text-4xl font-bold max-lg:text-2xl max-xl:text-3xl">
            Tentang Kami
          </h3>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            Video Profil
          </h4>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            Testimoni
          </h4>
        </div>
        <div className="space-y-3 max-[500px]:space-y-0">
          <h3 className="text-4xl font-bold max-lg:text-2xl max-xl:text-3xl">
            Layanan
          </h3>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            WorkIn - Lowongan Kerja
          </h4>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            CommIn - Komunitas
          </h4>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            EduIn - Program Edukasi
          </h4>
        </div>
        <div className="space-y-3 max-[500px]:space-y-0">
          <h3 className="text-4xl font-bold max-lg:text-2xl max-xl:text-3xl">
            Link Partner
          </h3>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            Universitas Brawijaya
          </h4>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            Startup Hub Malang
          </h4>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            Tech Corp Indonesia
          </h4>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            Dicoding
          </h4>
        </div>
        <div className="space-y-3 max-[500px]:space-y-0">
          <h3 className="text-4xl font-bold max-lg:text-2xl max-xl:text-3xl">
            Contact Us
          </h3>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            kerjaIn@gmail.com
          </h4>
          <h4 className="text-lg max-lg:text-base max-[500px]:text-sm">
            KerjaIn – Malang Office Jl. Ijen Boulevard No. 25, Klojen, Malang,
            Jawa Timur 65119
          </h4>
        </div>
      </div>
      <div className="grid grid-cols-2 max-[930px]:grid-cols-1 gap-4 h-1/2">
        <div className="space-y-3 max-[500px]:space-y-0">
          <h3 className="text-4xl font-bold max-lg:text-2xl max-xl:text-3xl">
            Jelajah KerjaIn
          </h3>
          <div className="flex flex-row space-x-3 max-[500px]:flex-col max-[500px]:space-y-3">
            <h4 className="text-xl max-lg:text-base">Sudah punya akun?</h4>
            <Button className="bg-white text-blue_primary flex-1 h-14 font-bold text-lg max-lg:text-base max-[500px]:text-xs max-[500px]:">
              Login Sekarang
            </Button>
          </div>
          <div className="flex flex-row space-x-3 max-[500px]:flex-col max-[500px]:space-y-3">
            <h4 className="text-xl max-lg:text-base">Belum punya akun?</h4>
            <Button className="bg-white text-blue_primary flex-1 h-14 font-bold text-lg max-lg:text-base max-[500px]:text-xs max-[500px]: ">
              Daftarkan Dirimu Sekarang
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="max-[930px]:hidden"></div>
          <div className="space-y-3 max-[500px]:space-y-0">
            <h3 className="text-4xl font-bold max-lg:text-2xl max-xl:text-3xl">
              Follow Us
            </h3>
            <div className="flex flex-row space-x-3">
              <Image
                src={instagram}
                alt="instagram"
                width={72}
                height={72}
                className="max-[500px]:w-10 max-[500px]:h-10"
              ></Image>
              <Image
                src={facebook}
                alt="facebook"
                width={72}
                height={72}
                className="max-[500px]:w-10 max-[500px]:h-10"
              ></Image>
              <Image
                src={twitter}
                alt="twitter"
                width={72}
                height={72}
                className="max-[500px]:w-10 max-[500px]:h-10"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
