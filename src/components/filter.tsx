// components/Filter.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FilterParams } from "@/hooks/useJobsQuery";
import {
  SectionKey,
  OpenSectionsState,
  SelectedFilters,
  FilterProps,
  disabilityTypeMap,
  educationLevelMap,
  experienceDurationMap,
  typeDurationMap,
  policyLocationMap,
  reverseDisabilityMap,
  reverseEducationMap,
  reverseExperienceMap,
  reverseTypeMap,
  reversePolicyMap
} from "@/lib/types/filter-types";

const Filter: React.FC<FilterProps> = ({ onFilterChange, initialFilters }) => {
  const [openSections, setOpenSections] = useState<OpenSectionsState>({
    prioritaskan: true,
    jenisDisabilitas: true,
    tingkatPendidikan: true,
    pengalamanKerja: true,
    tipePekerjaan: true,
    kebijakanKerja: true,
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    prioritaskan: "Paling Relevan",
    jenisDisabilitas: [],
    tingkatPendidikan: [],
    pengalamanKerja: [],
    tipePekerjaan: [],
    kebijakanKerja: [],
  });

  // Track if filters were edited
  const [filtersEdited, setFiltersEdited] = useState(false);

  // Initialize with any filters passed in
  useEffect(() => {
    if (initialFilters) {
      const newSelectedFilters: SelectedFilters = {
        prioritaskan: initialFilters.prioritize === 'latest' ? 'Terbaru' : 'Paling Relevan',
        jenisDisabilitas: [],
        tingkatPendidikan: [],
        pengalamanKerja: [],
        tipePekerjaan: [],
        kebijakanKerja: [],
      };
      
      // Map back from API values to UI labels
      if (initialFilters.disability_type) {
        newSelectedFilters.jenisDisabilitas = initialFilters.disability_type.map(type => 
          reverseDisabilityMap[type] || type
        );
      }
      
      if (initialFilters.education_level) {
        newSelectedFilters.tingkatPendidikan = initialFilters.education_level.map(level => 
          reverseEducationMap[level] || level
        );
      }
      
      if (initialFilters.experience_duration) {
        newSelectedFilters.pengalamanKerja = initialFilters.experience_duration.map(exp => 
          reverseExperienceMap[exp] || exp
        );
      }
      
      if (initialFilters.type_duration) {
        newSelectedFilters.tipePekerjaan = initialFilters.type_duration.map(type => 
          reverseTypeMap[type] || type
        );
      }
      
      if (initialFilters.policy_location) {
        newSelectedFilters.kebijakanKerja = initialFilters.policy_location.map(policy => 
          reversePolicyMap[policy] || policy
        );
      }
      
      setSelectedFilters(newSelectedFilters);
    }
  }, [initialFilters]);

  // Convert UI selections to API parameters
  const getApiFilters = (): FilterParams => {
    const filters: FilterParams = {
      prioritize: selectedFilters.prioritaskan === 'Terbaru' ? 'latest' : 'relevant',
    };
    
    if (selectedFilters.jenisDisabilitas.length > 0) {
      filters.disability_type = selectedFilters.jenisDisabilitas.map(
        type => disabilityTypeMap[type] || type
      );
    }
    
    if (selectedFilters.tingkatPendidikan.length > 0) {
      filters.education_level = selectedFilters.tingkatPendidikan.map(
        level => educationLevelMap[level] || level
      );
    }
    
    if (selectedFilters.pengalamanKerja.length > 0) {
      filters.experience_duration = selectedFilters.pengalamanKerja.map(
        exp => experienceDurationMap[exp] || exp
      );
    }
    
    if (selectedFilters.tipePekerjaan.length > 0) {
      filters.type_duration = selectedFilters.tipePekerjaan.map(
        type => typeDurationMap[type] || type
      );
    }
    
    if (selectedFilters.kebijakanKerja.length > 0) {
      filters.policy_location = selectedFilters.kebijakanKerja.map(
        policy => policyLocationMap[policy] || policy
      );
    }
    
    return filters;
  };
  
  // Apply filters when button is clicked
  const applyFilters = () => {
    const filters = getApiFilters();
    onFilterChange(filters);
    setFiltersEdited(false);
  };
  
  // Apply filters automatically when priority changes
  useEffect(() => {
    if (initialFilters && !filtersEdited) {
      return; // Skip on initial load
    }
    
    // Auto-apply only for priority change
    const filters = getApiFilters();
    onFilterChange(filters);
  }, [selectedFilters.prioritaskan, onFilterChange, filtersEdited, initialFilters]);

  const toggleSection = (section: SectionKey): void => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const handleCheckboxChange = (section: SectionKey, value: string): void => {
    setFiltersEdited(true);
    setSelectedFilters((prev) => {
      const sectionValues = [...prev[section]];

      const newValues = sectionValues.includes(value)
        ? sectionValues.filter((item) => item !== value)
        : [...sectionValues, value];

      return {
        ...prev,
        [section]: newValues,
      };
    });
  };

  const handlePriorityClick = (value: string): void => {
    setSelectedFilters((prev) => ({
      ...prev,
      prioritaskan: value,
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      prioritaskan: "Paling Relevan",
      jenisDisabilitas: [],
      tingkatPendidikan: [],
      pengalamanKerja: [],
      tipePekerjaan: [],
      kebijakanKerja: [],
    });
    
    onFilterChange({
      prioritize: 'relevant',
    });
    
    setFiltersEdited(false);
  };

  const isSelected = (section: SectionKey, value: string): boolean => {
    return selectedFilters[section].includes(value);
  };

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
                  ? "bg-blue-600 text-white hover:bg-blue-800"
                  : "border-blue-600 text-blue-600 bg-white"
              }`}
              onClick={() => handlePriorityClick("Paling Relevan")}
            >
              Paling Relevan
            </Button>
            <Button
              variant={isPrioritySelected("Terbaru") ? "default" : "outline"}
              className={`rounded-full text-sm ${
                isPrioritySelected("Terbaru")
                  ? "bg-blue-600 text-white hover:bg-blue-800"
                  : "border-blue-600 text-blue-600 bg-white"
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
                  className="border-blue-600 data-[state=checked]:bg-blue-600"
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
                  className="border-blue-600 data-[state=checked]:bg-blue-600"
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
                  className="border-blue-600 data-[state=checked]:bg-blue-600"
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
                  className="border-blue-600 data-[state=checked]:bg-blue-600"
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
      <div className="border-b">
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
                  className="border-blue-600 data-[state=checked]:bg-blue-600"
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
      
      {/* Filter Action Buttons */}
      <div className="p-4 space-y-2">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={applyFilters}
          disabled={!filtersEdited}
        >
          Terapkan Filter
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={resetFilters}
        >
          Reset Filter
        </Button>
      </div>
      
      {/* Selected Filter Summary */}
      {(selectedFilters.jenisDisabilitas.length > 0 || 
       selectedFilters.tingkatPendidikan.length > 0 || 
       selectedFilters.pengalamanKerja.length > 0 || 
       selectedFilters.tipePekerjaan.length > 0 || 
       selectedFilters.kebijakanKerja.length > 0) && (
        <div className="p-4 border-t">
          <h3 className="font-bold mb-2">Filter Aktif</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.jenisDisabilitas.map(type => (
              <div key={type} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center">
                {type}
                <button 
                  className="ml-1 text-blue-800 hover:text-blue-900"
                  onClick={() => handleCheckboxChange("jenisDisabilitas", type)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedFilters.tingkatPendidikan.map(level => (
              <div key={level} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                {level}
                <button 
                  className="ml-1 text-green-800 hover:text-green-900"
                  onClick={() => handleCheckboxChange("tingkatPendidikan", level)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedFilters.pengalamanKerja.map(exp => (
              <div key={exp} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
                {exp}
                <button 
                  className="ml-1 text-yellow-800 hover:text-yellow-900"
                  onClick={() => handleCheckboxChange("pengalamanKerja", exp)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedFilters.tipePekerjaan.map(type => (
              <div key={type} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center">
                {type}
                <button 
                  className="ml-1 text-purple-800 hover:text-purple-900"
                  onClick={() => handleCheckboxChange("tipePekerjaan", type)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedFilters.kebijakanKerja.map(policy => (
              <div key={policy} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center">
                {policy}
                <button 
                  className="ml-1 text-red-800 hover:text-red-900"
                  onClick={() => handleCheckboxChange("kebijakanKerja", policy)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;