import img from "../../assets/images/pexels-avery-arwood-713708816-18399632.jpg";
import logo from "../../assets/react.svg";
import { FaEdit, FaHistory } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import EditSlider from "./EditSlider";
import { Toaster as Sonner } from "sonner";
import { BsPencilFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useAccountStatus } from "@/hooks/query";
import QueryLoader from "@/components/QueryLoader";
import { UserIcon } from "lucide-react";
import { logout } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
const Main = () => {
  document.title = "Admin | Global Kids Academy";
  const { data, isLoading, isError } = useAccountStatus();
  const navigate = useNavigate();

  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    navigate("/login", {
      state: {
        authentication: false,
      },
    });
  }
  if (!data) {
    navigate("/login", {
      state: {
        authentication: false,
      },
    });
  }
  const logoutFnc = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pl-0 md:pl-[17rem] pt-[5rem]">
      <Sonner richColors />
      <div className="fixed top-0 justify-between pr-5 left-0 w-screen shadow-lg h-16 pl-5 md:pl-[18rem] bg-white font-semibold text-2xl flex items-center text-stone-700 z-10">
        Global Kids Academy
        <MdMenu className="md:hidden mr-5" />
      </div>
      <div className="fixed top-0 left-0 w-[18%] bg-primary h-screen z-20 hidden md:flex flex-col justify-between">
        <div className="top flex flex-col py-9 px-2 text-sm pb-0">
          <div className="flex mx-auto">
            <img src={logo} alt="" className="object-contain mb-5 scale-150" />
          </div>
          <h2 className="text-center text-lg text-white">Admin Page</h2>
          <nav className="flex flex-col py-5 px-2 gap-4 text-white">
            <a
              href="slider"
              className="bg-white/30 py-4 px-4 rounded-2xl flex gap-2 items-center"
            >
              <FaEdit />
              Edit Slider
            </a>
            <a
              href="/admin/about"
              className="bg-white/30 py-4 px-4 rounded-2xl flex gap-2 items-center"
            >
              <BsPencilFill />
              Edit About Page
            </a>
            <a
              href="/admin/history"
              className="bg-white/30 py-4 px-4 rounded-2xl flex gap-2 items-center"
            >
              <FaHistory />
              Edit History
            </a>
            <a
              href="/admin/gallery"
              className="bg-white/30 py-4 px-4 rounded-2xl flex gap-2 items-center"
            >
              <FaEdit />
              Edit Gallery
            </a>
            <a
              href="/admin/news"
              className="bg-white/30 py-4 px-4 rounded-2xl flex gap-2 items-center"
            >
              <FaNewspaper />
              News
            </a>
            <br />
            <hr className="w-40 mx-auto border-gray-300" />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"link"} className="text-white">
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => logoutFnc()}
                    className="bg-red-500"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>
        <div className="flex p-3 gap-3 items-center text-sm">
          {!data?.profile ? (
            <UserIcon className="rounded-full object-cover w-12 h-12 p-3 bg-white text-gray-500" />
          ) : (
            <img
              src={img}
              alt=""
              className="rounded-full object-cover w-12 h-12 ring-2 ring-white object-top"
            />
          )}
          <div className="flex flex-col text-white leading-4">
            <p className="font-bold">{data?.fullName}</p>
            <small className="text-xs py-1">Admin</small>
          </div>
        </div>
      </div>
      {window.location.pathname === "/admin" ? <EditSlider /> : ""}
      <Outlet />
    </div>
  );
};

export default Main;
