import { Slider as SliderTypes } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { IMAGE_URL } from "@/services/api";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
type Props = {
  content: SliderTypes[] | [];
};
const Slider = ({ content }: Props) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  return (
    <Carousel
      className="block w-full lg:w-[60%] relative bg-white"
      plugins={[plugin.current as any]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="">
        {content.map((data) => (
          <CarouselItem
            className="block w-full relative h-[calc(100vh-430px)] lg:h-[calc(100vh-72px)]"
            key={data.id}
          >
            <img
              src={IMAGE_URL + data.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bg-black/40 inset-o w-full h-full top-0 pb-5 flex justify-center items-end py-0 px-0 text-stone-300">
              <div className="text-left md:text-center first-letter:capitalize w-full md:pb-5 px-5 md:px-10 select-none">
                <h2 className="text-xl lg:text-4xl lg:text-[2.8rem] leading-[1] font-black text-slate-300">
                  {data.sliderText}
                </h2>
                <p className="px-2 py-3 text-xs lg:text-sm text-gray-300 first-letter:capitalize">
                  {data.sliderSubText}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-4xl border-none bg-transparent md:bg-slate-300 text-white md:text-primary p-1 ring-0 md:ring-1 md:ring-slate-300 rounded-full absolute top-[50%] left-3" />
      <CarouselNext className="text-4xl border-none bg-transparent md:bg-slate-300 text-white md:text-primary p-1 ring-0 md:ring-1 md:ring-slate-300 rounded-full absolute top[50%] right-3" />
    </Carousel>
  );
};

export default Slider;
