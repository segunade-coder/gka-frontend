import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateErrorMessage = (error: AxiosError) => {
  const code = (error.response?.data as { errorCode: number }).errorCode;
  let message = "";
  switch (code) {
    case 2002:
      message = "Invalid data sent";
      break;
    case 1001:
      message = "Invalid login credentials provided";
      break;
    default:
      message = "Something went wrong";
      break;
  }
  return message;
};
export const numberFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});
