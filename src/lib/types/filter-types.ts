// types/filterTypes.ts
import { FilterParams } from '@/hooks/useJobsQuery';

export type SectionKey =
  | "prioritaskan"
  | "jenisDisabilitas"
  | "tingkatPendidikan"
  | "pengalamanKerja"
  | "tipePekerjaan"
  | "kebijakanKerja";

export type OpenSectionsState = {
  [key in SectionKey]: boolean;
};

export interface SelectedFilters {
  prioritaskan: string;
  jenisDisabilitas: string[];
  tingkatPendidikan: string[];
  pengalamanKerja: string[];
  tipePekerjaan: string[];
  kebijakanKerja: string[];
}

export interface FilterProps {
  onFilterChange: (filters: FilterParams) => void;
  initialFilters?: FilterParams;
}

export const disabilityTypeMap: Record<string, string> = {
  "Tuna Rungu": "tuna-rungu",
  "Tuna Wicara": "tuna-wicara",
  "Tuna Daksa": "tuna-daksa",
  "Tuna Netra": "tuna-netra",
  "Disabilitas Mental": "disabilitas-mental",
};

export const educationLevelMap: Record<string, string> = {
  "Doktor (S3)": "Doktor S3",
  "Magister (S2)": "Magister S2",
  "Sarjana (S1)": "Sarjana S1",
  "Diploma III": "Diploma III",
  "Diploma (D1-D4)": "Diploma",
  "SMA/SMK/Sederajat": "SMA/SMK",
  "SMP/Sederajat": "SMP",
};

export const experienceDurationMap: Record<string, string> = {
  "Tidak Berpengalaman": "0 tahun",
  "Fresh Graduate": "fresh graduate",
  "Kurang dari Setahun": "<1 tahun",
  "1-3 Tahun": "1-3 tahun",
  "3-5 Tahun": "3-5 tahun",
  "Lebih dari 5 Tahun": ">5 tahun",
};

export const typeDurationMap: Record<string, string> = {
  "Penuh Waktu": "full-time",
  "Kontrak": "contract",
  "Magang": "internship",
  "Freelance": "freelance",
};

export const policyLocationMap: Record<string, string> = {
  "Kerja di Kantor": "wfo",
  "Kerja di Rumah (Remote)": "wfh",
  "Hybrid (Kantor dan Rumah)": "hybrid",
};

export const reverseDisabilityMap = Object.entries(disabilityTypeMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

export const reverseEducationMap = Object.entries(educationLevelMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

export const reverseExperienceMap = Object.entries(experienceDurationMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

export const reverseTypeMap = Object.entries(typeDurationMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

export const reversePolicyMap = Object.entries(policyLocationMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);