import { useState } from "react";

interface ToggleSwitchProps {
    label: string;
    onToggle?: () => void;
    isChecked?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, onToggle, isChecked }) => {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-xs">
        {label}
      </span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
            isChecked ? "bg-coffi-purple" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </button>
    </div>
  );
};
