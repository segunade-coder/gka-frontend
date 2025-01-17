import { useEffect, useState } from "react";
import logo from "../assets/react.svg";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoTwitter,
} from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { MdKeyboardArrowDown } from "react-icons/md";
const Header = () => {
  const [bgColor, setBgColor] = useState("bg-primary");
  const [activeNav, setActiveNav] = useState<string>("");
  const { hash } = useLocation();
  const findActiveNav = () => {
    setActiveNav(window.location.hash);
  };

  useEffect(() => {
    findActiveNav();
  });
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight - 30) {
      setBgColor("lg:bg-primary/90 bg-primary");
    } else {
      setBgColor("bg-primary");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    switch (hash) {
      case "#news":
        document.getElementById("news")?.scrollIntoView();
        setActiveNav("#news");
        break;
      case "#about":
        document.getElementById("about")?.scrollIntoView();
        setActiveNav("#about");
        break;
      case "#gallery":
        document.getElementById("gallery")?.scrollIntoView();
        setActiveNav("#gallery");
        break;

      case "#history":
        document.getElementById("history")?.scrollIntoView();
        setActiveNav("#news");
        break;

      default:
        document.getElementById("header")?.scrollIntoView();
        setActiveNav("");
        break;
    }
  }, [hash]);

  return (
    <header
      className={`w-full flex justify-around min-h-[72px] text-stone-500 text-sm ${bgColor} sticky top-0 z-50 backdrop-blur-md`}
      id="header"
    >
      <div className="lg:w-[35%] py-5 lg:pl-32 pl-10">
        <img src={logo} alt="" className="scale-125" />
      </div>
      <nav className="hidden lg:flex flex-1 bg-red-00 pl-5 items-center pr-20 text-white">
        <a
          href="/#"
          className={`links ${activeNav === "" ? "active" : ""} mr-5`}
          onClick={() => setActiveNav("")}
        >
          Home
        </a>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant={"link"} className="text-white hover:no-underline">
              Learning Programs <MdKeyboardArrowDown />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-40 p-0">
            <div className="flex flex-col text-sm">
              <a href="#calendar" className="hover:bg-slate-300 p-3">
                Calendar
              </a>
              <a href="#calendar" className="hover:bg-slate-300 p-3">
                Programs
              </a>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant={"link"} className="text-white hover:no-underline">
              About us <MdKeyboardArrowDown />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-40 p-0">
            <div className="flex flex-col text-sm">
              <a href="#intro" className="hover:bg-slate-300 p-3">
                Introduction
              </a>
              <a href="#about" className="hover:bg-slate-300 p-3">
                About school
              </a>
              <a href="#history" className="hover:bg-slate-300 p-3">
                History
              </a>
            </div>
          </HoverCardContent>
        </HoverCard>
        {/* <a
          href="/#news"
          className={`links ${activeNav === "#news" ? "active" : ""}`}
          onClick={() => setActiveNav("#news")}
        >
          News
        </a> */}
        <a
          href="/#admission"
          className={`links ${activeNav === "#news" ? "active" : ""}`}
          onClick={() => setActiveNav("#news")}
        >
          Admission
        </a>

        <div className="flex items-center ml-auto gap-3">
          {/* <div className="relative w-10 h-10 rounded-full ring-1 bg-white ring-white flex justify-center items-center scale-90"> */}
          <a href="#">
            <BiLogoFacebookCircle className="text-xl text-white" />
          </a>
          <a href="#">
            <BiLogoInstagram className="text-xl text-white" />
          </a>
          <a href="#">
            <BiLogoTwitter className="text-xl text-white" />
          </a>
          <a href="#" className="text-xl text-white">
            <BiLogoTiktok />
          </a>
        </div>
      </nav>
      <div className="flex-1 flex justify-end items-center px-5 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="text-4xl text-white" />
          </SheetTrigger>
          <SheetContent className="bg-white">
            <div className="grid gap-4 py-4">
              <div className="py-5">
                <nav className="flex flex-col lg:hidden gap-8 flex-1 bg-red-00 pl-5 text-primary">
                  <a
                    href="/#"
                    className={`links ${activeNav === "" ? "active" : ""}`}
                    onClick={() => setActiveNav("")}
                  >
                    Home
                  </a>
                  <a
                    href="/#programs"
                    className={`links ${
                      activeNav === "#programs" ? "active" : ""
                    }`}
                    onClick={() => setActiveNav("#programs")}
                  >
                    Learning Programs
                  </a>
                  <a
                    href="/#about"
                    className={`links ${
                      activeNav === "#about" ? "active" : ""
                    }`}
                    onClick={() => setActiveNav("#about")}
                  >
                    About us
                  </a>
                  {/* <a
                    href="/#news"
                    className={`links ${activeNav === "#news" ? "active" : ""}`}
                    onClick={() => setActiveNav("#news")}
                  >
                    News
                  </a> */}
                  <a
                    href="/#admission"
                    className={`links ${activeNav === "#news" ? "active" : ""}`}
                    onClick={() => setActiveNav("#news")}
                  >
                    Admission
                  </a>
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
