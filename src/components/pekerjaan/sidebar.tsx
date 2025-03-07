"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Define types for section keys
type SectionKey =
  | "prioritaskan"
  | "jenisDisabilitas"
  | "tingkatPendidikan"
  | "pengalamanKerja"
  | "tipePekerjaan"
  | "kebijakanKerja";

// Define type for open sections state
type OpenSectionsState = {
  [key in SectionKey]: boolean;
};

// Define type for selected filters
interface SelectedFilters {
  prioritaskan: string;
  jenisDisabilitas: string[];
  tingkatPendidikan: string[];
  pengalamanKerja: string[];
  tipePekerjaan: string[];
  kebijakanKerja: string[];
}

const Filter: React.FC = () => {
  // State for accordion sections
  const [openSections, setOpenSections] = useState<OpenSectionsState>({
    prioritaskan: true,
    jenisDisabilitas: true,
    tingkatPendidikan: true,
    pengalamanKerja: true,
    tipePekerjaan: true,
    kebijakanKerja: true,
  });

  // Toggle accordion section
  const toggleSection = (section: SectionKey): void => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  // Selected filter values
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    prioritaskan: "Paling Relevan",
    jenisDisabilitas: ["Tuna Rungu"],
    tingkatPendidikan: [],
    pengalamanKerja: ["1-3 Tahun"],
    tipePekerjaan: [],
    kebijakanKerja: [],
  });

  // Handle checkbox change
  const handleCheckboxChange = (section: SectionKey, value: string): void => {
    setSelectedFilters((prev) => {
      // Get the current values for this section
      const sectionValues = [...prev[section]];

      // Toggle the value
      const newValues = sectionValues.includes(value)
        ? sectionValues.filter((item) => item !== value)
        : [...sectionValues, value];

      return {
        ...prev,
        [section]: newValues,
      };
    });
  };

  // Handle priority button click
  const handlePriorityClick = (value: string): void => {
    setSelectedFilters((prev) => ({
      ...prev,
      prioritaskan: value,
    }));
  };

  // Helper to check if a value is selected
  const isSelected = (section: SectionKey, value: string): boolean => {
    return selectedFilters[section].includes(value);
  };

  // Check if priority button is selected
  const isPrioritySelected = (value: string): boolean =>
    selectedFilters.prioritaskan === value;

  return (
    <div className="w-full max-w-sm border rounded-lg bg-white">
      {/* Prioritaskan Section */}
      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("prioritaskan")}
        >
          <h3 className="font-bold">Prioritaskan</h3>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              openSections.prioritaskan ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {openSections.prioritaskan && (
          <div className="p-4 pt-0 space-x-2">
            <Button
              variant={
                isPrioritySelected("Paling Relevan") ? "default" : "outline"
              }
              className={`rounded-full text-sm ${
                isPrioritySelected("Paling Relevan")
                  ? "bg-blue_primary text-white hover:bg-blue-800"
                  : "border-blue_primary text-blue_bg-blue_primary bg-white"
              }`}
              onClick={() => handlePriorityClick("Paling Relevan")}
            >
              Paling Relevan
            </Button>
            <Button
              variant={isPrioritySelected("Terbaru") ? "default" : "outline"}
              className={`rounded-full text-sm ${
                isPrioritySelected("Terbaru")
                  ? "bg-blue_primary text-white hover:bg-blue-800"
                  : "border-blue_primary text-blue_bg-blue_primary bg-white"
              }`}
              onClick={() => handlePriorityClick("Terbaru")}
            >
              Terbaru
            </Button>
          </div>
        )}
      </div>

      {/* Jenis Disabilitas Section */}
      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("jenisDisabilitas")}
        >
          <h3 className="font-bold">Jenis Disabilitas</h3>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              openSections.jenisDisabilitas ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {openSections.jenisDisabilitas && (
          <div className="p-4 pt-0 space-y-2">
            {[
              "Tuna Rungu",
              "Tuna Wicara",
              "Tuna Daksa",
              "Tuna Netra",
              "Disabilitas Mental",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                className="border-blue_primary data-[state=checked]:bg-blue_primary"
                  id={`disabilitas-${option}`}
                  checked={isSelected("jenisDisabilitas", option)}
                  onCheckedChange={() =>
                    handleCheckboxChange("jenisDisabilitas", option)
                  }
                />
                <label
                  htmlFor={`disabilitas-${option}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tingkat Pendidikan Section */}
      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("tingkatPendidikan")}
        >
          <h3 className="font-bold">Tingkat Pendidikan</h3>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              openSections.tingkatPendidikan ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {openSections.tingkatPendidikan && (
          <div className="p-4 pt-0 space-y-2">
            {[
              "Doktor (S3)",
              "Magister (S2)",
              "Sarjana (S1)",
              "Diploma III",
              "Diploma (D1-D4)",
              "SMA/SMK/Sederajat",
              "SMP/Sederajat",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                className="border-blue_primary data-[state=checked]:bg-blue_primary"
                  id={`pendidikan-${option}`}
                  checked={isSelected("tingkatPendidikan", option)}
                  onCheckedChange={() =>
                    handleCheckboxChange("tingkatPendidikan", option)
                  }
                />
                <label
                  htmlFor={`pendidikan-${option}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pengalaman Kerja Section */}
      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("pengalamanKerja")}
        >
          <h3 className="font-bold">Pengalaman Kerja</h3>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              openSections.pengalamanKerja ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {openSections.pengalamanKerja && (
          <div className="p-4 pt-0 space-y-2">
            {[
              "Tidak Berpengalaman",
              "Fresh Graduate",
              "Kurang dari Setahun",
              "1-3 Tahun",
              "3-5 Tahun",
              "Lebih dari 5 Tahun",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                className="border-blue_primary data-[state=checked]:bg-blue_primary"
                  id={`pengalaman-${option}`}
                  checked={isSelected("pengalamanKerja", option)}
                  onCheckedChange={() =>
                    handleCheckboxChange("pengalamanKerja", option)
                  }
                />
                <label
                  htmlFor={`pengalaman-${option}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tipe Pekerjaan Section */}
      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("tipePekerjaan")}
        >
          <h3 className="font-bold">Tipe Pekerjaan</h3>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              openSections.tipePekerjaan ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {openSections.tipePekerjaan && (
          <div className="p-4 pt-0 space-y-2">
            {["Penuh Waktu", "Kontrak", "Magang", "Freelance"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                className="border-blue_primary data-[state=checked]:bg-blue_primary"
                  id={`tipe-${option}`}
                  checked={isSelected("tipePekerjaan", option)}
                  onCheckedChange={() =>
                    handleCheckboxChange("tipePekerjaan", option)
                  }
                />
                <label
                  htmlFor={`tipe-${option}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kebijakan Kerja Section */}
      <div>
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("kebijakanKerja")}
        >
          <h3 className="font-bold">Kebijakan Kerja</h3>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              openSections.kebijakanKerja ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {openSections.kebijakanKerja && (
          <div className="p-4 pt-0 space-y-2">
            {[
              "Kerja di Kantor",
              "Kerja di Rumah (Remote)",
              "Hybrid (Kantor dan Rumah)",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                className="border-blue_primary data-[state=checked]:bg-blue_primary"
                  id={`kebijakan-${option}`}
                  checked={isSelected("kebijakanKerja", option)}
                  onCheckedChange={() =>
                    handleCheckboxChange("kebijakanKerja", option)
                  }
                />
                <label
                  htmlFor={`kebijakan-${option}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
