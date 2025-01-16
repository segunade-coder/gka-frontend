import { useSliderContent } from "../../hooks/query.ts";
import EditTitle from "../../components/EditTitle.tsx";
import EditSliderCard from "../../components/EditCard.tsx";
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
import { BiPlus } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAddSlider } from "@/hooks/mutation.ts";
import { toast } from "sonner";
import QueryLoader from "@/components/QueryLoader.tsx";
import QueryError from "@/components/QueryError.tsx";
import { FaSpinner } from "react-icons/fa6";
const EditSlider = () => {
  const { data, isLoading, isError, refetch } = useSliderContent();
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [image, setImage] = useState<FileList | null>();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const addSliderFnc = useAddSlider();
  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  const handleAdd = async () => {
    if (title !== "" && sub !== "" && !!image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("sub", sub);
      formData.append("image", image[0]);
      toast.loading("loading...", { id: "loading-add-slider" });
      setLoading(true);
      try {
        await addSliderFnc.mutateAsync(formData);
        setOpen(false);
        toast.dismiss("loading-add-slider");
        toast.success("Success", {
          description: "Slider added successfully",
        });
        clearData();
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Warning", {
        description: "Fill in all necessary fields",
      });
    }
  };
  const clearData = () => {
    setTitle("");
    setSub("");
    setImage(null);
  };
  return (
    <div className="px-5">
      <EditTitle text="Edit Slider" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            className="bg-primary text-sm flex hover:bg-primary/80 gap-2 py-2 px-4 text-white items-center rounded-md ml-auto md:mr-10"
          >
            Add <BiPlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Slider Image</DialogTitle>
            <DialogDescription>
              Add slider image to the website.
            </DialogDescription>
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
            <Label htmlFor="image">
              {!!image ? "Change" : "Choose"} Slider Image
            </Label>
            <Input
              type="file"
              className="ring-1"
              id="image"
              onChange={(e) => setImage(e.target.files)}
              accept="image/*"
            />
            {image && image?.length > 0 ? (
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
              className=""
              onClick={() => handleAdd()}
              disabled={loading}
            >
              Add {loading ? <FaSpinner className="animate-spin" /> : ""}
            </Button>
            <DialogClose asChild>
              <Button variant={"destructive"} onClick={() => clearData()}>
                Discard
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex gap-5 flex-wrap my-5 justify-center md:justify-start">
        {!!data && data.length > 0 ? (
          data?.map((slider) => (
            <EditSliderCard slider={slider} key={slider.id} />
          ))
        ) : (
          <div>Nothing here</div>
        )}
      </div>
    </div>
  );
};

export default EditSlider;
