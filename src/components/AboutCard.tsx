import { HiAcademicCap } from "react-icons/hi";

const AboutCard = ({
  image,
  heading,
  text,
}: {
  image: string;
  heading: string;
  text: string;
}) => {
  return (
    <div className="relative shadow-md shadow-black/20 w-[100%] md:w-[45%] lg:w-[290px] md:min-h-[350px] md:max-h-[350px]  rounded-lg overflow-clip hover:shadow-lg group mt-5">
      <img
        src={image}
        alt=""
        className="w-full h-[200px] object-cover object-left rounded-tl-lg rounded-tr-lg group-hover:scale-110 transition-all"
      />
      <HiAcademicCap className="absolute top-2 text-white text-3xl right-2" />
      <div className="p-6 py-5">
        <h3 className="text-lg font-semibold text-center pb-2">{heading}</h3>
        <p className=" text-center text-xs">{text}</p>
      </div>
    </div>
  );
};

export default AboutCard;
