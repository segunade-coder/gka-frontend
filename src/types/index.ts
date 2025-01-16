export interface Hero {
  id: string;
  mainText: string;
  subText: string;
  teachers: number;
  student: number;
  updatedAt: string;
  createdAt: string;
}
export interface Slider {
  id: string;
  image: string;
  sliderText: string;
  sliderSubText: string;
  updatedAt: string;
  createdAt: string;
}
export interface About {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  updatedAt: string;
  createdAt: string;
}
export interface ResponseMessage {
  status: boolean;
  message: string;
  data?: any;
}
export interface History {
  id: string;
  text: string;
  yearsInService: number;
  image?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Gallery {
  id: string;
  image: string;
}
export interface News {
  id: string;
  image: string;
  title: string;
  body: string;
  views: number;
  likes: number;
  publish: boolean;
  edited: boolean;
  updatedAt: string;
  createdAt: string;
}
export interface InitialData {
  hero: Hero;
  slider: Slider[];
  about: About[];
  history: History;
  gallery: Gallery[];
  news: News[];
}
export type Auth = {
  email: string;
  password: string;
};
export type AccoutStatus = {
  id: string;
  email: string;
  fullName: string;
  profile: string | null;
};
export type AddSlider = {
  image: string;
  sliderText: string;
  sliderSubText: string;
};
export type EditHistory = {
  history: string;
  years: number;
  id: string;
};
