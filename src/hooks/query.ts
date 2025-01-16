import { useQuery } from "@tanstack/react-query";
import {
  getAboutContent,
  getAccountStatus,
  getData,
  getGalleryContent,
  getHistoryContent,
  getNewsContent,
  getNewsContentById,
  getSliderContent,
} from "../services/api";
export const useGetInitialData = () => {
  return useQuery({
    queryKey: ["initial"],
    queryFn: () => getData(),
  });
};
export const useSliderContent = () => {
  return useQuery({
    queryKey: ["slider"],
    queryFn: () => getSliderContent(),
  });
};
export const useAboutContent = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => getAboutContent(),
  });
};
export const useHistoryContent = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => getHistoryContent(),
  });
};
export const useGalleryContent = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: () => getGalleryContent(),
  });
};
export const useNewsContent = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => getNewsContent(),
  });
};
export const useNewsContentById = (id: string) => {
  return useQuery({
    queryKey: ["news", { id }],
    queryFn: () => getNewsContentById(id),
    enabled: !!id,
  });
};
export const useAccountStatus = () => {
  return useQuery({
    queryKey: ["account-status"],
    queryFn: () => getAccountStatus(),
    retry: 0,
    refetchInterval: 1000 * 60 * 20,
  });
};
