"use client";

import React, { useState } from "react";

interface VehicleType {
  name: string;
  count: number;
  isSelected?: boolean;
}

interface VehicleTypeFilterProps {
  vehicleTypes: VehicleType[];
  onVehicleTypeChange: (selectedTypes: string[]) => void;
}

const VehicleTypeItem = ({ 
  vehicleType, 
  onToggle, 
  isSelected 
}: { 
  vehicleType: VehicleType; 
  onToggle: (name: string) => void;
  isSelected: boolean;
}) => {
  const handleToggle = () => {
    onToggle(vehicleType.name);
  };

  return (
    <button
      className={`${
        isSelected && "text-blue"
      } group flex items-center justify-between ease-out duration-200 hover:text-blue w-full`}
      onClick={handleToggle}
    >
      <div className="flex items-center gap-2">
        <div
          className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
            isSelected ? "border-blue bg-blue" : "bg-white border-gray-3"
          }`}
        >
          <svg
            className={isSelected ? "block" : "hidden"}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-left">{vehicleType.name}</span>
      </div>
      <span
        className={`${
          isSelected ? "text-white bg-blue" : "bg-gray-2"
        } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue`}
      >
        {vehicleType.count}
      </span>
    </button>
  );
};

interface VehicleTypeFilterPropsExtended extends VehicleTypeFilterProps {
  selectedVehicleTypes?: string[];
}

const VehicleTypeFilter = ({ vehicleTypes, onVehicleTypeChange, selectedVehicleTypes = [] }: VehicleTypeFilterPropsExtended) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  const handleTypeToggle = (typeName: string) => {
    const updatedSelection = selectedVehicleTypes.includes(typeName)
      ? selectedVehicleTypes.filter(name => name !== typeName)
      : [...selectedVehicleTypes, typeName];
    
    onVehicleTypeChange(updatedSelection);
  };

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && "shadow-filter"
        }`}
      >
        <p className="text-dark">Vehicle Type</p>
        <button
          aria-label="button for vehicle type dropdown"
          className={`text-dark ease-out duration-200 ${
            toggleDropdown && "rotate-180"
          }`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div
        className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${
          toggleDropdown ? "flex" : "hidden"
        }`}
      >
        {vehicleTypes.map((vehicleType, key) => (
          <VehicleTypeItem 
            key={key} 
            vehicleType={vehicleType} 
            onToggle={handleTypeToggle}
            isSelected={selectedVehicleTypes.includes(vehicleType.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeFilter;