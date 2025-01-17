import { News } from "@/types";
import logo from "../assets/react.svg";
import { BsFacebook, BsInstagram, BsTiktok, BsTwitterX } from "react-icons/bs";
import { Fragment } from "react/jsx-runtime";
import {
  BiSolidEnvelope,
  BiSolidLocationPlus,
  BiSolidPhoneCall,
} from "react-icons/bi";
import { Button } from "./ui/button";
type Props = {
  content?: News[] | [];
};
const Footer = ({ content }: Props) => {
  return (
    <footer className="w-full flex flex-col gap-2">
      <div className="others h-[100%] bg-gray-600  w-full md:px-10 px-2 text-white">
        <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row py-8 lg:justify-start lg:items-center">
          <div className="socials px-5 lg:w-[20%] w-fit">
            <img src={logo} alt="" className="" />
            <p className="py-3 text-sm">To be the best.</p>
            <div className="flex gap-3 w-full items-center py-3">
              <a
                href="#"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <BsFacebook />
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <BsTwitterX />
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <BsInstagram />
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <BsTiktok />
              </a>
            </div>
          </div>
          <div
            className="flex-1 lg:px-32 justify-around px-2 flex pb-2 w-full gap-5"
            id="contact"
          >
            <div className="pages flex flex-col gap-3 text-slate-200 text-xs">
              <h3 className="font-bold text-lg">Contact Us</h3>
              <h3 className="flex gap-2 text-sm">
                <BiSolidLocationPlus className="text-xl" />
                <span className="w-48">
                  Address
                  <address className="mt-2 text-xs">
                    Arkilla layout, behing emir's palace, kalambaina, sokoto
                  </address>
                </span>
              </h3>
              <h3 className="flex gap-2 text-sm mt-2">
                <BiSolidEnvelope className="text-xl fill-white" />
                <span className="w-48">
                  Email
                  <div className="mt-2 text-xs">
                    <a href="mailto:support@globalkidsacademy.com">
                      support@globalkidsacademy.com
                    </a>
                  </div>
                </span>
              </h3>
              <h3 className="flex gap-2 text-sm mt-2">
                <BiSolidPhoneCall className="text-xl text-white" />
                <span className="w-48">
                  Phone
                  <div className="mt-2 text-xs">
                    <a href="tel:09078785538">09078785538</a>
                  </div>
                </span>
              </h3>
            </div>
            <div className="pages flex flex-col gap-3 text-slate-200 text-xs justify-end">
              <Button
                className="w-full bg-primary p-7 rounded-lg text-white "
                variant={"link"}
              >
                Talk to a Representative
              </Button>
            </div>
            {content && content.length > 0 ? (
              <div className="pages flex flex-col gap-3 text-slate-200 text-xs">
                <h3 className="font-bold text-lg">News</h3>
                {content.map((news) => (
                  <Fragment key={news.id}>
                    <a
                      href={`/news/${news.id}`}
                      className="capitalize hover:underline"
                    >
                      {news.title.toLowerCase()}
                    </a>
                  </Fragment>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <hr className="border-slate-500 lg:w-[80%] my-0 mx-auto" />
        <p className="text-slate-300 py-3 text-xs flex justify-center gap-5 lg:px-20">
          <span>Copyright &copy; {new Date().getFullYear()}</span>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
