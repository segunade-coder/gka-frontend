import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import FloatingTag from "./FloatingTag";
import { News as NewsTypes } from "../types";
import { getRandomImages, monthFormatter } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { BiLocationPlus } from "react-icons/bi";
import { Button } from "./ui/button";
type Props = {
  content: NewsTypes[] | [];
};
const UpcomingEvents = ({ content }: Props) => {
  if (content.length === 0) {
    return (
      <section
        className="py-24 px-10 lg:px-20 flex items-center justify-center"
        id="news"
      >
        No Upcoming Event Yet
      </section>
    );
  }
  return (
    <section className="py-20 px-10 lg:px-20 relative" id="events">
      <FloatingTag text="Events" className="lg:-left-[1.5rem]" />
      <div className="py-6 w-full">
        <h2 className="text-3xl font-bold text-primary">
          Upcoming School Events{" "}
        </h2>
        <p className="text-slate-600 text-sm">See what we are planning...</p>
      </div>
      <div className="imgs flex gap-5 py-7 justify-between">
        <div className="events flex flex-col gap-3">
          {[...Array(5)].map((rand) => (
            <div className="event flex">
              <div className="date w-50 bg-slate-700 py-3 px-5 text-center text-white text-sm">
                <div>{monthFormatter.format(new Date())}</div>
                <div>26</div>
              </div>
              <div className="px-2 flex flex-col">
                <span>
                  {"NAPPS Leadership Retreat".slice(0, 40)}{" "}
                  {"NAPPS Leadership Retreat".length > 40 ? "..." : ""}
                </span>
                <span className="text-slate-500 text-xs">
                  Arkilla layout, kalambaina
                </span>
              </div>
            </div>
          ))}
          {content && content.length > 0 ? (
            <div className="flex w-fit">
              <a
                href="news"
                className="flex items-center py-3 px-4 rounded-md text-sm w-fit gap-2 text-primary"
              >
                See More <MdKeyboardDoubleArrowRight />
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="most_recent_events w-[50%] max-h-80 relative">
          <img
            src={getRandomImages(2)}
            alt=""
            className="w-full object-cover object-left h-full rounded-md"
          />
          <div className="absolute inset-0 bg-black/40 text-white rounded-md flex gap-2 items-center justify-center flex-col">
            <div className="text-xl">
              10<sup>th</sup> National Educational Conference
            </div>
            <div className="flex gap-2">
              <BiLocationPlus className="fill-slate-300 text-xl" />
              <span className="text-sm text-slate-300">
                Arkilla Layout, kalambaina, Sokoto State
              </span>
            </div>
            <div className="flex gap-2">
              <Calendar className="text-slate-300 text-lg" size={15} />
              <span className="text-sm text-slate-300">
                Arkilla Layout, kalambaina, Sokoto State
              </span>
            </div>
            <Button className="bg-slate-700 ring-2 ring-slate-700 hover:bg-transparent text-white rounded-none p-6 mt-5">
              See Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
