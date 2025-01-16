import { generateErrorMessage } from "@/lib/utils";
import {
  addAbout,
  addLikes,
  addNews,
  addSlider,
  addToGallery,
  addViews,
  deleteAboutContent,
  deleteNews,
  deleteSingleGallery,
  deleteSliderContent,
  editAbout,
  editGallery,
  editHistory,
  editNews,
  editSlider,
  validateAuth,
} from "@/services/api";
import { Auth, EditHistory as EditHistorySchema } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
export const useDeleteSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSliderContent(id),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["slider"],
        });
      } else {
        toast.dismiss("loading-delete-slider");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useAddSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => addSlider(data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["slider"],
        });
      } else {
        toast.dismiss("loading-add-slider");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useEditSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      editSlider(id, data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["slider"],
        });
      } else {
        toast.dismiss("loading-edit-slider");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useAddAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => addAbout(data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["about"],
        });
      } else {
        toast.dismiss("loading-add-about");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useDeleteAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAboutContent(id),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["about"],
        });
      } else {
        toast.dismiss("loading-delete-about");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useEditAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      editAbout(id, data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["about"],
        });
      } else {
        toast.dismiss("loading-edit-about");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useEditHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditHistorySchema) => editHistory(data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["history"],
        });
      } else {
        toast.dismiss("loading-edit-history");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useAddToGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => addToGallery(data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["gallery"],
        });
      } else {
        toast.dismiss("loading-add-gallery");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useEditGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      editGallery(id, data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["gallery"],
        });
      } else {
        toast.dismiss("loading-edit-gallery");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useDeleteSingleGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSingleGallery(id),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["gallery"],
        });
      } else {
        toast.dismiss("loading-delete-gallery");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useAddNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => addNews(data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["news"],
        });
      } else {
        toast.dismiss("loading-add-news");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: Auth) => validateAuth(data),
    onSettled: async (_data, err) => {
      if (!err) {
      } else {
        toast.dismiss("loading-login");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useEditNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      editNews(id, data),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["news"],
        });
      } else {
        toast.dismiss("loading-edit-news");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNews(id),
    onSettled: async (_data, err) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["news"],
        });
      } else {
        toast.dismiss("loading-delete-news");
        const errorMessage = generateErrorMessage(err as AxiosError);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
  });
};
export const useAddViews = () => {
  return useMutation({
    mutationFn: (id: string) => addViews(id),
  });
};
export const useAddLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, value }: { id: string; value: { like: boolean } }) =>
      addLikes(id, value),
    onSettled: async (_data, err, { id }) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: ["news", { id }],
        });
      }
    },
  });
};
