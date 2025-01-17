import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import img1 from "../assets/images/pexels-ann-h-45017-1762851.jpg";
import img2 from "../assets/images/pexels-n-voitkevich-5642086.jpg";
import img3 from "../assets/images/pexels-steve-1629818.jpg";
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
export const getRandomImages = (i: number) => {
  const image = (i + 1) % 2 === 0 ? img1 : (1 + i) % 3 === 0 ? img2 : img3;

  return image;
};
