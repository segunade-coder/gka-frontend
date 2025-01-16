import { MdKeyboardArrowRight } from "react-icons/md";
import FloatingTag from "./FloatingTag";
import { Gallery as GalleryTypes } from "../types";
import { IMAGE_URL } from "@/services/api";
type Props = {
  content: GalleryTypes[] | [];
};
const Gallery = ({ content }: Props) => {
  return (
    <section className="py-24 pb-10 px-5 lg:px-20 relative" id="gallery">
      <FloatingTag text="Gallery" className="lg:-left-7" />
      <div className="py-4 w-full">
        <h2 className="text-3xl font-bold">Check out Our Gallery</h2>
        <p className="text-primary">// Moments that we have captured.</p>
      </div>
      <div className="flex gap-5 md:gap-3 flex-wrap justify-center">
        {content.map((gallery) => (
          <img
            src={IMAGE_URL + gallery.image}
            key={gallery.id}
            alt=""
            className="w-[100%] md:w-[48%] md:h-[25rem] h-[20rem]  lg:w-56 lg:h-56 object-cover rounded-xl object-top"
            loading="lazy"
          />
        ))}
        {content && content.length > 0 ? (
          <a
            href="gallery/all"
            className="w-fit md:w-[48%] md:h-[25rem] h-fit lg:w-56 lg:h-56 flex items-center justify-center lg:bg-primary/10 md:bg-primary/10 rounded-xl scale-75"
          >
            <span className="font-medium flex text-xl items-center py-6 lg:py-3 px-5 rounded-md bg-transparent w-fit gap-1 text-primary">
              See All <MdKeyboardArrowRight />
            </span>
          </a>
        ) : (
          <div>No Gallery Image</div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
