import axios from "axios";
import {
  About,
  AccoutStatus,
  Auth,
  EditHistory,
  Gallery,
  History,
  InitialData,
  News,
  ResponseMessage,
  Slider,
} from "../types";

export const BASE_URL = "http://localhost:3001";
export const IMAGE_URL = BASE_URL + "/images/";

const Api = axios.create({
  baseURL: BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const getData = async () =>
  (await Api.get("/dashboard")).data.data as InitialData;
export const getAccountStatus = async () =>
  (await Api.get("/auth/account/status")).data as AccoutStatus;
export const validateAuth = async (data: Auth) =>
  (await Api.post("/auth/login", data)).data;
export const addSlider = async (data: FormData) =>
  (
    await Api.post("/dashboard/slider", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;
export const addAbout = async (data: FormData) =>
  (
    await Api.post("/dashboard/about", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;
export const addNews = async (data: FormData) =>
  (
    await Api.post("/dashboard/news", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;

export const addToGallery = async (data: FormData) =>
  (
    await Api.post("/dashboard/gallery", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;
export const editSlider = async (id: string, data: FormData) =>
  (
    await Api.put(`/dashboard/slider/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;
export const editAbout = async (id: string, data: FormData) =>
  (
    await Api.put(`/dashboard/about/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;
export const editNews = async (id: string, data: FormData) =>
  (
    await Api.put(`/dashboard/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;
export const editGallery = async (id: string, data: FormData) =>
  (
    await Api.put(`/dashboard/gallery/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data as ResponseMessage;
export const editHistory = async (data: EditHistory) =>
  (await Api.put(`/dashboard/history`, data)).data as ResponseMessage;
export const getSliderContent = async () =>
  (await Api.get("/dashboard/slider")).data.data as Slider[] | [];
export const deleteSliderContent = async (id: string) =>
  (await Api.delete(`/dashboard/slider/${id}`)).data as ResponseMessage;
export const deleteNews = async (id: string) =>
  (await Api.delete(`/dashboard/news/${id}`)).data as ResponseMessage;
export const deleteSingleGallery = async (id: string) =>
  (await Api.delete(`/dashboard/gallery/${id}`)).data as ResponseMessage;
export const deleteAboutContent = async (id: string) =>
  (await Api.delete(`/dashboard/about/${id}`)).data as ResponseMessage;
export const getAboutContent = async () =>
  (await Api.get("/dashboard/about")).data.data as About[] | [];
export const getHistoryContent = async () =>
  (await Api.get("/dashboard/history")).data.data as History | null;
export const getGalleryContent = async () =>
  (await Api.get("/dashboard/gallery")).data.data as Gallery[] | [];
export const getNewsContent = async () =>
  (await Api.get("/dashboard/news")).data.data as News[] | [];
export const getNewsContentById = async (id: string) =>
  (await Api.get(`/dashboard/news/${id}`)).data.data as News;
export const logout = async () => (await Api.get("/auth/logout")).data.data;
export const addViews = async (id: string) =>
  (await Api.put(`/dashboard/news/${id}/views`)).data as ResponseMessage;
export const addLikes = async (id: string, data: { like: boolean }) =>
  (await Api.put(`/dashboard/news/${id}/likes`, data)).data as ResponseMessage;
