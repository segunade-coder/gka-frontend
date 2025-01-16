import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { About, Gallery, Slider } from "../types";
import {
  useDeleteAbout,
  useDeleteSingleGallery,
  useDeleteSlider,
  useEditAbout,
  useEditGallery,
  useEditSlider,
} from "@/hooks/mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IMAGE_URL } from "@/services/api";
import { toast } from "sonner";
type Props = {
  slider: Slider;
};
const EditSliderCard = ({ slider }: Props) => {
  const deleteOneSlider = useDeleteSlider();
  const [title, setTitle] = useState(slider.sliderText);
  const [sub, setSub] = useState(slider.sliderSubText);
  const [image, setImage] = useState<FileList | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const editSliderFnc = useEditSlider();
  const deleteSlider = async (id: string) => {
    toast.loading("Loading...", {
      id: "loading-delete-slider",
    });
    setLoading(true);
    try {
      await deleteOneSlider.mutateAsync(id);
      toast.dismiss("loading-delete-slider");
      toast.success("Success", { description: "Slider deleted successfully" });
    } finally {
      setLoading(false);
    }
  };
  const handleEditSlider = async (id: string) => {
    if (title !== "" && sub !== "") {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("sub", sub);
      formData.append("image", image && image.length > 0 ? image[0] : "");
      toast.loading("Loading...", { id: "loading-edit-slider" });
      setLoading(true);
      try {
        await editSliderFnc.mutateAsync({ id, data: formData });
        setOpen(false);
        toast.dismiss("loading-edit-slider");
        toast.success("Success", { description: "Modified Successfully" });
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Warning", {
        description: "Please, fill in all necessary fields",
      });
    }
  };
  return (
    <div className="card shadow-md shadow-black/30 w-[90%] md:w-full md:max-w-[260px] rounded-lg relative">
      <img
        src={`${IMAGE_URL}${slider.image}`}
        alt=""
        className="object-cover w-full h-[120px] rounded-tl-lg rounded-tr-lg"
        referrerPolicy="no-referrer"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            className="bg-white absolute top-0 -right-1 p-2 rounded-br-xl rounded-tl-xl hover:bg-white"
          >
            <BsPencilFill className="w-8 h-8 text-primary cursor-pointer" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Slider ' {slider.sliderText.slice(0, 30)}{" "}
              {slider.sliderText.length > 30 ? "..." : ""} '
            </DialogTitle>
            <DialogDescription>Edit slider image and text.</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="title">Main Text</Label>
            <Input
              id="title"
              placeholder="Enter main text"
              className="ring-2 ring-slate-400 py-6 my-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="sub" className="">
              Sub Text
            </Label>
            <Input
              id="sub"
              placeholder="Enter sub text"
              className="ring-2 ring-slate-400 py-6 my-2"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
            />
            <Label htmlFor="image">Change slider image</Label>
            <Input
              type="file"
              className="py-6"
              id="image"
              onChange={(e) => setImage(e.target.files)}
              accept="image/*"
            />
            {!image && slider.image ? (
              <div className="w-full h-full max-h-[30vh] overflow-clip">
                <img
                  src={IMAGE_URL + slider.image}
                  alt=""
                  className="my-3 object-contain w-full h-full object-top"
                />
              </div>
            ) : image && image.length > 0 ? (
              <div className="w-full h-full max-h-[30vh] overflow-clip">
                <img
                  src={URL.createObjectURL(image[0])}
                  alt=""
                  className="my-3 object-contain w-full h-full object-top"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="secondary"
              onClick={() => handleEditSlider(slider.id)}
              disabled={loading}
            >
              Save
            </Button>
            <DialogClose asChild>
              <Button variant={"destructive"}>Discard</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className=" h-auto w-full flex p-5 items-end text-slate-700">
        <h2 className="pr-2 w-full text-sm min-h-[38px] ">
          {slider.sliderText.slice(0, 50)}
          {slider.sliderText.length > 50 ? "..." : ""}
        </h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex w-fit justify-end text-red-500 bg-transparent">
              <MdDelete className="text-lg cursor-pointer" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                record and remove the data from the database
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteSlider(slider.id)}
                className="bg-red-500"
                disabled={loading}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
export const EditAboutCard = ({ about }: { about: About }) => {
  const deleteOneAbout = useDeleteAbout();
  const [title, setTitle] = useState(about.title);
  const [sub, setSub] = useState(about.subTitle);
  const [image, setImage] = useState<FileList | null>();
  const [open, setOpen] = useState(false);
  const editAboutFnc = useEditAbout();
  const [loading, setLoading] = useState(false);
  const deleteAbout = async (id: string) => {
    toast.loading("Loading...", {
      id: "loading-delete-slider",
    });
    setLoading(true);
    try {
      await deleteOneAbout.mutateAsync(id);
      toast.dismiss("loading-delete-slider");
      toast.success("Success", { description: "Slider deleted successfully" });
    } finally {
      setLoading(false);
    }
  };
  const handleEditSlider = async (id: string) => {
    if (title !== "" && sub !== "") {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("sub", sub);
      formData.append("image", image && image.length > 0 ? image[0] : "");
      toast.loading("Loading...", { id: "loading-edit-about" });
      setLoading(true);
      try {
        await editAboutFnc.mutateAsync({ id, data: formData });
        setOpen(false);
        toast.dismiss("loading-edit-about");
      } finally {
        setLoading(false);
      }
      toast.success("Success", { description: "Modified Successfully" });
    } else {
      toast.warning("Warning", {
        description: "Please, fill in all necessary fields",
      });
    }
  };
  return (
    <div className="card shadow-md shadow-black/30 w-[90%] md:w-full md:max-w-[260px] rounded-lg relative">
      <img
        src={IMAGE_URL + about.image}
        alt=""
        className="object-cover w-full h-[150px] rounded-tl-lg rounded-tr-lg"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            className="bg-white absolute top-0 -right-1 p-2 rounded-br-xl rounded-tl-xl hover:bg-white"
          >
            <BsPencilFill className="w-8 h-8 text-primary cursor-pointer" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit About ' {about.title} ' </DialogTitle>
            <DialogDescription>Edit about image and text.</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="title">Main Text</Label>
            <Input
              id="title"
              placeholder="Enter main text"
              className="ring-2 ring-slate-400 py-6 my-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="sub" className="">
              Sub Text
            </Label>
            <Input
              id="sub"
              placeholder="Enter sub text"
              className="ring-2 ring-slate-400 py-6 my-2"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
            />
            <Label htmlFor="image">Change slider image</Label>
            <Input
              type="file"
              className="py-6"
              id="image"
              onChange={(e) => setImage(e.target.files)}
              accept="image/*"
            />
            {!image && about.image ? (
              <div className="w-full h-full max-h-[30vh] overflow-clip">
                <img
                  src={IMAGE_URL + about.image}
                  alt=""
                  className="my-3 object-contain w-full h-full object-top"
                />
              </div>
            ) : image && image.length > 0 ? (
              <div className="w-full h-full max-h-[30vh] overflow-clip">
                <img
                  src={URL.createObjectURL(image[0])}
                  alt=""
                  className="my-3 object-contain w-full h-full object-top"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="secondary"
              onClick={() => handleEditSlider(about.id)}
              disabled={loading}
            >
              Save
            </Button>
            <DialogClose asChild>
              <Button variant={"destructive"}>Discard</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className=" h-auto w-full min-h-[128px] flex p-4 items-e text-slate-700">
        <h2 className="text-sm font-semibold w-full ">
          {about.title}

          <p className="text-xs font-normal pt-3">{about.subTitle}</p>
        </h2>
        <div className="w-fit text-red-500 -mt-6 bg-transparent flex items-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex w-fit justify-end text-red-500 bg-transparent">
                <MdDelete className="text-lg cursor-pointer" />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this record and remove the data from the database
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteAbout(about.id)}
                  className="bg-red-500"
                  disabled={loading}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
export const EditGalleryCard = ({ gallery }: { gallery: Gallery }) => {
  const [image, setImage] = useState<FileList | null>();
  const editGalleryFnc = useEditGallery();
  const deleteSingleGalleryFnc = useDeleteSingleGallery();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const deleteAbout = async (id: string) => {
    toast.loading("Loading...", {
      id: "loading-delete-gallery",
    });
    setLoading(false);
    try {
      await deleteSingleGalleryFnc.mutateAsync(id);
      toast.dismiss("loading-delete-gallery");
      toast.success("Success", { description: "Image deleted successfully" });
    } finally {
      setLoading(false);
    }
  };
  const handleEditGallery = async (id: string) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image[0]);
      toast.loading("Loading...", { id: "loading-edit-gallery" });
      setLoading(true);
      try {
        await editGalleryFnc.mutateAsync({ id, data: formData });
        setOpen(false);
        toast.dismiss("loading-edit-gallery");
        toast.success("Success", {
          description: `Modified successfully`,
        });
        setImage(null);
      } finally {
        setLoading(false);
      }
    } else {
      toast.info("Info", {
        description: "No changes were made",
      });
    }
  };
  return (
    <div className="card shadow-md shadow-black/30 h-[150px]  w-[150px] md:h-[180px] my-5 md:w-[180px] rounded-full relative group">
      <img
        src={IMAGE_URL + gallery.image}
        alt=""
        className="object-cover object-top w-full h-full rounded-full"
      />
      <div
        className="absolute inset-0 top-0 group-hover:opacity-100 flex opacity-0  left-0  bg-black/20 backdrop-blur-sm justify-center items-center gap-3 rounded-full"
        style={{ transition: "all .1s ease-in-out" }}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex p-[0.7rem] rounded-full shadow-md cursor-pointer bg-slate-300 text-black hover:bg-slate-300"
              size="icon"
            >
              <BsPencilFill />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Gallery</DialogTitle>
              <DialogDescription>Edit gallery image.</DialogDescription>
            </DialogHeader>
            <div>
              <Input
                type="file"
                className="py-2"
                id="image"
                onChange={(e) => setImage(e.target.files)}
                accept="image/*"
              />
              {!image && gallery.image ? (
                <div className="w-full h-full max-h-[45vh] overflow-clip">
                  <img
                    src={IMAGE_URL + gallery.image}
                    alt=""
                    className="my-3 object-contain w-full h-full"
                  />
                </div>
              ) : image && image.length > 0 ? (
                <div className="w-full h-full max-h-[35vh] overflow-clip">
                  <img
                    src={URL.createObjectURL(image[0])}
                    alt=""
                    className="my-3 object-cover w-100 h-100 object-top"
                    onClick={() =>
                      (window.location.href = URL.createObjectURL(image[0]))
                    }
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="secondary"
                onClick={() => handleEditGallery(gallery.id)}
                disabled={loading}
              >
                Save
              </Button>
              <DialogClose asChild>
                <Button variant={"destructive"}>Discard</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="">
              <Button
                variant={"destructive"}
                size="icon"
                className="text-xs rounded-full p-[0.7rem] shadow-md"
                asChild
              >
                <MdDelete className="cursor-pointer" />
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                record and remove the data from the database
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteAbout(gallery.id)}
                className="bg-red-500"
                disabled={loading}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EditSliderCard;
