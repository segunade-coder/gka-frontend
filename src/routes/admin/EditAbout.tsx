import { useAboutContent } from "../../hooks/query";
import { EditAboutCard } from "../../components/EditCard";
import EditTitle from "../../components/EditTitle";
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
import { toast } from "sonner";
import { useAddAbout } from "@/hooks/mutation";
import QueryLoader from "@/components/QueryLoader";
import QueryError from "@/components/QueryError";
import { FaSpinner } from "react-icons/fa6";

const EditAbout = () => {
  const { data, isLoading, isError, refetch } = useAboutContent();
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [image, setImage] = useState<FileList | null>();
  const [open, setOpen] = useState(false);
  const addAboutFnc = useAddAbout();
  const [loading, setLoading] = useState(false);
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
      toast.loading("loading...", { id: "loading-add-about" });
      setLoading(true);
      try {
        await addAboutFnc.mutateAsync(formData);
        setOpen(false);
        toast.dismiss("loading-add-about");
        toast.success("Success", {
          description: "About added successfully",
        });
        clearData();
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Warning", {
        description: "Please, fill in all necessary fields",
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
      <EditTitle text="Edit About page" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            className="bg-primary hover:bg-primary/80 text-sm flex gap-2 py-2 px-4 text-white items-center rounded-md ml-auto md:mr-10"
          >
            Add <BiPlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add About Card</DialogTitle>
            <DialogDescription>
              Add an about card to the website.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter About title"
              className="ring-2 ring-slate-400 py-6 my-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="sub" className="">
              Sub Text
            </Label>
            <Input
              id="sub"
              placeholder="Enter Sub Text"
              className="ring-2 ring-slate-400 py-6 my-2"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
            />
            <Input
              type="file"
              className="ring-1 ring-slate-300 my-4"
              id="image"
              onChange={(e) => setImage(e.target.files)}
              accept="image/*"
            />
            {image && image?.length > 0 ? (
              <div className="w-full h-full max-h-[30vh] overflow-clip">
                <img
                  src={URL.createObjectURL(image[0])}
                  alt=""
                  className="w-full object-contain object-top h-full max-h-[30vh]"
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
              <Button variant={"destructive"}>Discard</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex gap-5 flex-wrap my-5 justify-center md:justify-start">
        {!!data && data?.length > 0 ? (
          data?.map((about) => <EditAboutCard about={about} key={about.id} />)
        ) : (
          <div>Nothing here</div>
        )}
      </div>
    </div>
  );
};

export default EditAbout;
