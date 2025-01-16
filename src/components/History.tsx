import img5 from "../assets/images/pexels-emily-ranquist-493228-1205651.jpg";
import { History as HistoryTypes } from "../types";
import FloatingTag from "./FloatingTag";
type Props = {
  content: HistoryTypes | null;
};
const History = ({ content }: Props) => {
  if (!content) {
    return <div>Something went wrong</div>;
  }
  return (
    <section
      id="history"
      className="py-8 lg:py-24 pb-10 lg:pb-3 px-10 lg:px-20 relative bg-gray-700 min-h-[100vh]"
    >
      <FloatingTag text="History" className="lg:-left-[1.8rem] lg:top-32" />
      <div className="flex py-2 flex-col lg:flex-row text-white">
        <div className="lg:w-[65%] relative py-5 lg:py-0">
          <h3 className="text-4xl font-black py-5">
            A Brief History About Global Kids Academy
          </h3>
          <p className="text-justify my-6 text-sm">{content.text}</p>
        </div>

        <div className="flex gap-3 rounded-lg justify-end w-full lg:pl-36 relative overflow-clip max-h-[450px]">
          <div className="hidden lg:block floating-card absolute left-14 top-[30%]  z-10">
            <div className="card w-40 h-40 shadow-lg shadow-slate-800/40 bg-white rounded-lg flex-col p-5 flex justify-center items-center">
              <div className="z-1 -translate-y-10">
                <div className="card w-12 h-3 bg-white rounded-sm translate-y-2"></div>
              </div>
              <span>
                <big className="text-6xl text-primary font-bold">
                  {content.yearsInService.toString().padStart(2, "0")}
                </big>
                <small className="translate-y-7 font-black text-3xl text-black">
                  +
                </small>
              </span>
              <p className="text-xs text-black">Years in Service</p>
              <div className="my-2 z-1">
                <div className="card w-14 h-1 bg-black rounded-lg"></div>
              </div>
            </div>
          </div>
          <img
            src={img5}
            alt=""
            className="object-cover w-full rounded-2xl object-center lg:border-2 border-white"
          />
          <div className="absolute inset-0 bg-black opacity-25 translate-x-[145px] rounded-lg translate-y-12"></div>
        </div>
      </div>
    </section>
  );
};

export default History;
