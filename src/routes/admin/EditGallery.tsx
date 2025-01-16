import { useGalleryContent } from "@/hooks/query";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EditGalleryCard } from "@/components/EditCard";
import { toast } from "sonner";
import { useAddToGallery } from "@/hooks/mutation";
import QueryLoader from "@/components/QueryLoader";
import QueryError from "@/components/QueryError";
import { FaSpinner } from "react-icons/fa";
const EditGallery = () => {
  const { data, isLoading, isError, refetch } = useGalleryContent();
  const [image, setImage] = useState<FileList | null>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const addToGalleryFnc = useAddToGallery();
  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  if (!data) {
    return <div>No data found</div>;
  }
  const handleAdd = async () => {
    if (image) {
      const formData = new FormData();
      Array.from(image).map((img) => {
        formData.append("image", img);
      });
      toast.loading("Loading...", { id: "loading-add-gallery" });
      setLoading(true);
      try {
        await addToGalleryFnc.mutateAsync(formData);
        setOpen(false);
        toast.dismiss("loading-add-gallery");
        toast.success("Success", {
          description: `Image${
            Image.length > 0 ? "s" : ""
          } added to gallery successfully`,
        });
        setImage(null);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Warning", {
        description: "Select one or more images",
      });
    }
  };
  return (
    <div className="px-5">
      <EditTitle text="Edit Gallery" />

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
            <DialogTitle>Add image to gallery</DialogTitle>
            <DialogDescription>
              Add a single or multiple image to gallery.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              type="file"
              className="ring-1 ring-slate-300 my-4"
              id="image"
              multiple
              onChange={(e) => setImage(e.target.files)}
              accept="image/*"
            />
            {image && image?.length > 0 ? (
              <div className="w-full h-auto flex gap-2 flex-wrap">
                {Array.from(image).map((img) => (
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="object-cover w-[100px] h-[100px] object-top rounded-full ring-2 ring-slate-400"
                  />
                ))}
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
      <div className="flex gap-2 flex-wrap my-2 justify-center md:justify-start">
        {!!data && data?.length > 0 ? (
          data?.map((gallery) => (
            <EditGalleryCard gallery={gallery} key={gallery.id} />
          ))
        ) : (
          <div>Nothing here</div>
        )}
      </div>
    </div>
  );
};

export default EditGallery;
