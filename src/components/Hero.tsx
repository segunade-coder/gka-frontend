import { FaArrowRightLong } from "react-icons/fa6";
import { Hero as HeroTypes, Slider } from "../types";
import HeroSlider from "./Slider";
import { numberFormatter } from "@/lib/utils";
type Props = {
  content: HeroTypes | null;
  slider: Slider[] | [];
};
const Hero = ({ content, slider }: Props) => {
  if (!content) {
    return <div>Something went wrong</div>;
  }

  return (
    <section className="hero-content flex flex-col lg:flex-row px-0 lg:px-10 lg:pr-0 pb-20 h-[calc(100vh-70px)]">
      <article className="md:w-[65%] md:px-10 order-1 lg:flex-1 px-5 lg:px-2 lg:-order-1 py-5 md:py-3 lg:py-10 text-gray-700 flex flex-col md:justify-center pr-5 h-[calc(100vh-72px)]">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold lg:leading-[4rem] tracking-wide md:py-2 ">
          {content.mainText}
        </h1>
        <p className="text-xs md:text-sm py-5">{content.subText}</p>
        <div className="flex gap-5 my-2">
          <a
            href="#"
            className="btn-with-icon bg-primary w-fit gap-3 text-white md:text-xs lg:text-sm"
          >
            See Admin Plus <FaArrowRightLong />
          </a>
          <a
            href="#about"
            className="btn-with-icon bg-transparent ring-primary ring-1 w-fit gap-5 text-primary md:text-xs lg:text-sm"
          >
            Learn More
          </a>
        </div>
        <div className="flex gap-3 lg:gap-10 items-center w-full">
          <div className="flex flex-col py-3 md:py-7">
            <p className="md:text-lg lg:text-3xl font-semibold">
              {numberFormatter.format(content.teachers)}
              <small className="text-primary">+</small>
            </p>
            <span className="py-1">Teachers</span>
          </div>
          <div className="flex flex-col md:py-7">
            <p className="md:text-lg lg:text-3xl font-semibold">
              {numberFormatter.format(content.student)}
            </p>
            <span className="py-1">Students</span>
          </div>
          <div className="flex flex-col md:py-7">
            <p className="md:text-lg lg:text-3xl font-semibold">
              A<small className="text-primary">+</small>
            </p>
            <span className="py-1">Accreditation</span>
          </div>
        </div>
      </article>
      <HeroSlider content={slider} />
    </section>
  );
};

export default Hero;
