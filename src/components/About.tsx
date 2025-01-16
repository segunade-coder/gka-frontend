import AboutCard from "./AboutCard";
import FloatingTag from "./FloatingTag";
import { About as AboutTypes } from "../types";
import { IMAGE_URL } from "../services/api";
type Props = {
  content: AboutTypes[] | null;
};
const About = ({ content }: Props) => {
  return (
    <section
      className="py-24 pb-10 px-5 lg:px-20 relative min-h-[100vh]"
      id="about"
    >
      <FloatingTag text="About Us" className="" />
      <div className="flex flex-col lg:flex-row lg:justify-between py-6 w-full">
        <h2 className="text-3xl font-bold">
          About Our Prestigious <br /> School
        </h2>
        <p className="text-justify border-l-4 h-fit py-1 border-primary lg:pr-20 pl-3 text-sm lg:w-[40%]">
          Learn about our prestigious school and some of our outstanding
          qualities
        </p>
      </div>
      <div className="flex gap-2 w-full py-5 flex-wrap lg:flex-wrap md:justify-center items-center ">
        {content?.map((list) => (
          <AboutCard
            key={list.id}
            image={`${IMAGE_URL}${list.image}`}
            heading={list.title}
            text={list.subTitle}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
