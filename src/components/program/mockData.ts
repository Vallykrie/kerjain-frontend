import { Advertisement } from "@/components/program/advertisement";
import { BootcampType } from "@/components/program/bootcamp-card";
import digitalMarketing from "public/digital-marketing.png";
import productManagement from "public/product-management.png";
import akutansi from "public/akutansi.png";
import graphicDesign from "public/graphic-design.png";

// Mock advertisement data
export const advertisementData: Advertisement[] = [
  {
    id: 1,
    imageUrl: "https://placehold.co/1080x1080",
    altText: "Walking Aid Tongkat Siku with 130KG capacity",
    redirectUrl: "#walking-aid",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/1080x1080",
    altText: "Wheelchair Scales with digital measurement",
    redirectUrl: "#wheelchair-scales",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/1080x1080",
    altText: "Special discount for BPJS Kesehatan cardholders",
    redirectUrl: "#health-discount",
  },
];

// Mock bootcamp data
export const bootcampData: BootcampType[] = [
  {
    id: "digital-marketing",
    title: "Bootcamp Digital Marketing",
    imageUrl: digitalMarketing,
    startDate: "19 April",
    endDate: "3 Juni 2025",
    price: 550000,
    originalPrice: 670000,
    detailUrl: "/bootcamp/digital-marketing",
  },
  {
    id: "project-management",
    title: "Project & Product Management",
    imageUrl: productManagement,
    startDate: "20 April",
    endDate: "8 Juni 2025",
    price: 230000,
    originalPrice: 320000,
    detailUrl: "/bootcamp/project-management",
  },
  {
    id: "accounting-tax",
    title: "Accounting, Tax, & Audit",
    imageUrl: akutansi,
    startDate: "15 Maret",
    endDate: "23 Juni 2025",
    price: 430000,
    detailUrl: "/bootcamp/accounting-tax",
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Canva",
    imageUrl: graphicDesign,
    startDate: "3 Juli",
    endDate: "8 September 2025",
    price: 145000,
    originalPrice: 220000,
    detailUrl: "/bootcamp/graphic-design",
  },
];