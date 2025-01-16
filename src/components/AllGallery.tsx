import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useGalleryContent } from "@/hooks/query";
import QueryError from "./QueryError";
import QueryLoader from "./QueryLoader";
import { IMAGE_URL } from "@/services/api";
import { Gallery } from "@/types";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
const AllNews = () => {
  const { data: gallery, isLoading, isError, refetch } = useGalleryContent();
  const [slider, setSlider] = useState<Gallery[] | []>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  const clickImage = (i: number) => {
    setOpenDialog(true);
    if (gallery) {
      const beforeIndex = gallery?.slice(0, i);
      const afterIndex = gallery?.slice(i);
      setSlider(afterIndex?.concat(beforeIndex));
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-screen h-[90%]">
          <DialogHeader>
            <DialogTitle>Gallery</DialogTitle>
            <DialogDescription>Memorable moments</DialogDescription>
          </DialogHeader>
          <Carousel
            className="block w-full h-full md:h-[70%]"
            plugins={[plugin.current as any]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="">
              {slider.map((data) => (
                <CarouselItem className="" key={data.id}>
                  <img
                    src={IMAGE_URL + data.image}
                    alt=""
                    className="w-full h-full max-h-[505px] md:h-[100%] object-cover object-top"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-4xl border-none bg-transparent bg-slate-300 md:bg-white  text-primary p-1 ring-1 md:ring-0 ring-slate-300 rounded-full absolute top-[50%] left-1 md:-left-11" />
            <CarouselNext className="text-4xl border-none bg-transparent bg-slate-300 md:bg-white text-primary p-1 ring-1 md:ring-0 ring-slate-300 rounded-full absolute top[50%] right-1 md:-right-11" />
          </Carousel>
        </DialogContent>
      </Dialog>
      <Header />
      <div className="p-5 w-full ">
        <h2 className="text-3xl font-bold">News Feed</h2>
        <p className="text-primary">// Latest News and Events.</p>

        <div className="min-h-screen bg-gray-50 py-5">
          {/* Breadcrumb */}
          <nav className="container mx-auto px-2 mb-4 text-sm text-gray-600">
            <a href="/#news" className="hover:underline">
              Home
            </a>{" "}
            &gt;
            <a href="/news" className="hover:underline">
              {" "}
              News Feed
            </a>
          </nav>
          <div className="imgs flex gap-5 md:gap-3 flex-wrap justify-center">
            {gallery && gallery.length > 0 ? (
              gallery.map((gallery, i) => (
                <img
                  src={IMAGE_URL + gallery.image}
                  key={gallery.id}
                  alt=""
                  onClick={() => clickImage(i)}
                  className="w-[100%] md:w-[45%] md:h-[25rem] h-[25rem]  lg:w-[30%] lg:h-[25rem] object-cover rounded-xl object-top cursor-pointer"
                  loading="lazy"
                />
              ))
            ) : (
              <div>No Gallery Image</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllNews;
