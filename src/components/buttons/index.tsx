"use client"

import { MouseEventHandler } from "react";
import { LoaderSpinner } from "../loaders/spinner";

interface SimpleButtonProps {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
  text,
  action,
  disabled = false,
  loading = false,
  full = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`
          w-full ${!full ? "max-w-[240px]" : ""}
          flex items-center justify-center
          coffi-gradient-blue-to-purple text-white rounded-lg py-[7px] px-6 mx-1 shadow-md shadow-coffi-purple/30 
          hover:bg-coffi-blue-300 hover:shadow-md hover:shadow-coffi-purple/50 transition-all duration-500 ease-in-out
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
      `}
      onClick={!disabled && !loading ? action : () => {}}
    >
      {loading ? (
        <LoaderSpinner />
      ) : (
        <span className="font-semibold text-md">{text}</span>
      )}
    </button>
  );
};

export const SimpleLightButton: React.FC<SimpleButtonProps> = ({
  text,
  action,
  disabled = false,
  loading = false,
  full = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`
          w-full ${!full ? "max-w-[240px]" : ""}
          flex items-center justify-center
          coffi-gradient-blue-to-purple-light text-coffi-purple rounded-lg py-[7px] px-6 mx-1 shadow-md shadow-coffi-blue/20 
          hover:bg-coffi-blue-300 hover:shadow-md hover:shadow-coffi-blue/50 transition-all duration-500 ease-in-out
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
      `}
      onClick={!disabled && !loading ? action : () => {}}
    >
      {loading ? (
        <LoaderSpinner />
      ) : (
        <span className="font-semibold text-md">{text}</span>
      )}
    </button>
  );
};

export const SimpleButtonOutline: React.FC<SimpleButtonProps> = ({
  text,
  action,
  full = false,
}) => {
  return (
    <button
      className={`
          ${
            !full ? "max-w-[300px" : "w-full"
          } border-[1px] border-solid border-coffi-purple-300 text-coffi-purple rounded-lg py-[6px] px-6 mx-1 hover:bg-coffi-purple-50 transition-all duration-500 ease-in-out
        `}
      onClick={action}
    >
      <span className="font-semibold text-md">{text}</span>
    </button>
  );
};

export const SimpleDarkButton: React.FC<SimpleButtonProps> = ({
  text,
  action,
  full = false,
}) => {
  return (
    <button
      className={`
          ${
            !full ? "max-w-[300px" : "w-full"
          } bg-coffi-purple text-coffi-white rounded-lg py-[6px] px-6 mx-1 hover:bg-coffi-purple/90 transition-all duration-500 ease-in-out
        `}
      onClick={action}
    >
      <span className="font-semibold text-md">{text}</span>
    </button>
  );
};
