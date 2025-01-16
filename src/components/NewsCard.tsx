import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { IMAGE_URL } from "@/services/api";
import { toast } from "sonner";
import { useDeleteNews, useEditNews } from "@/hooks/mutation";
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
import { BsEye } from "react-icons/bs";
import { numberFormatter } from "../lib/utils";
import { BiLike } from "react-icons/bi";
type Props = {
  image: string;
  title: string;
  body: string;
  date: string;
  id: string;
  newsImage?: string;
  views?: number;
  likes?: number;
  edited?: boolean;
  publish?: boolean;
};
const NewsCard = ({
  image,
  title,
  body,
  date,
  id,
  views,
  likes,
  edited,
}: Props) => {
  const newDate = new Date(date);
  let formatter = new Intl.DateTimeFormat(undefined, { month: "short" });
  return (
    <div className="relative card w-[100%] lg:w-[320px] rounded-lg shadow-lg lg:shadow-md">
      <div className="absolute top-0 bg-primary w-fit min-w-[47px] h-fit right-10 rounded-bl-lg rounded-br-lg flex flex-col items-center text-xs text-white p-3">
        <span>{(newDate.getDay() + 1).toLocaleString().padStart(2, "0")}</span>
        <span>{formatter.format(newDate)}</span>
      </div>
      <img
        src={image}
        alt=""
        className="h-56 lg:h-44 w-full object-cover rounded-tl-lg rounded-tr-lg"
      />
      <div className="p-4 py-10 lg:py-5">
        <h3 className="text-lg font-semibold pb-3 ">{title}</h3>
        <p className="text-xs min-h-[64px]">
          {body.slice(0, 150)} {body.length > 150 ? "..." : ""}
        </p>
        <div className="flex pt-3 mt-4 items-center justify-between">
          <a
            href={`news/${id}`}
            className="py-3 px-4 rounded-md hover:underline w-fit gap-3 text-primary text-sm"
          >
            Read More
          </a>
          <div className="interactions flex gap-3">
            <div className="info flex gap-1 text-xs items-center text-slate-500">
              <BsEye className="" />
              <span>{numberFormatter.format(views || 0)}</span>
            </div>
            <div className="info flex gap-1 text-xs items-center text-slate-500">
              <BiLike className="" />
              <span>{numberFormatter.format(likes || 0)}</span>
            </div>
            <div className="info flex gap-1 text-xs items-center text-slate-500">
              <span>{edited ? "edited" : ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const EditNewsCard = ({
  image,
  title,
  body,
  date,
  id,
  newsImage,
  views,
  likes,
  publish,
}: Props) => {
  const newDate = new Date(date);
  let formatter = new Intl.DateTimeFormat(undefined, { month: "short" });
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [editImage, setEditImage] = useState<FileList | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const deleteNewsFnc = useDeleteNews();
  const editNewsFnc = useEditNews();
  const deleteNews = async (id: string) => {
    toast.loading("Loading...", {
      id: "loading-delete-slider",
    });
    setLoading(true);
    try {
      await deleteNewsFnc.mutateAsync(id);
      toast.dismiss("loading-delete-slider");
      toast.success("Success", { description: "Slider deleted successfully" });
    } catch (error) {
      setLoading(false);
    }
  };
  const editNews = async (publish: boolean) => {
    if (editBody !== "" && editBody !== "") {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("body", editBody);
      formData.append("publish", publish + "");
      formData.append("image", image && image.length > 0 ? image[0] : "");
      toast.loading("loading...", { id: "loading-edit-news" });
      setLoading(true);
      try {
        await editNewsFnc.mutateAsync({ id, data: formData });
        setOpen(false);
        toast.dismiss("loading-edit-news");
        toast.success("Success", {
          description: "News modified successfully",
        });
      } catch (error) {
        setLoading(false);
      }
    } else {
      toast.warning("Warning", {
        description: "Fill in all necessary fields",
      });
    }
  };
  return (
    <div className="relative card w-[100%] lg:w-[300px] rounded-lg shadow-lg lg:shadow-md">
      <div className="absolute top-0 bg-primary w-fit min-w-[40px] h-fit right-10 rounded-bl-lg rounded-br-lg flex flex-col items-center text-xs text-white p-3">
        <span>{(newDate.getDay() + 1).toLocaleString().padStart(2, "0")}</span>
        <span>{formatter.format(newDate)}</span>
      </div>
      <img
        src={image}
        alt=""
        className="h-56 lg:h-44 w-full object-cover rounded-tl-lg rounded-tr-lg"
      />
      <div className="p-4 py-10 lg:py-5">
        <h3 className="font-semibold pb-3 ">
          {title.slice(0, 50)}
          {title.length > 50 ? <span className="text-xl">...</span> : ""}
        </h3>
        <p className="text-xs min-h-[32px] first-letter:capitalize">
          {body.slice(0, 75)}
          {body.length > 75 ? "..." : ""}
        </p>
        <div className="flex pt-3 mt-2 justify-between">
          <div className="interactions flex gap-3">
            <div className="info flex gap-1 text-xs items-center text-slate-500">
              <BsEye className="" />
              <span>{numberFormatter.format(views || 0)}</span>
            </div>
            <div className="info flex gap-1 text-xs items-center text-slate-500">
              <BiLike className="" />
              <span>{numberFormatter.format(likes || 0)}</span>
            </div>
            <div className="info flex gap-1 text-xs items-center text-orange-500">
              <span>{!publish ? "draft" : ""}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="text-xs">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Edit News - {!publish ? "Draft" : ""}
                  </DialogTitle>
                  <DialogDescription>Edit a post/news.</DialogDescription>
                </DialogHeader>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter the title of the news"
                    className="ring-2 ring-slate-400 py-6 my-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Label htmlFor="body" className="">
                    Body
                  </Label>
                  <Textarea
                    id="body"
                    placeholder="Enter the body of the news"
                    className="ring-2 ring-slate-400 py-2 my-2"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={5}
                  />
                  <Label htmlFor="image">
                    {!!editImage ? "Change" : "Choose"} News Image
                  </Label>
                  <Input
                    type="file"
                    className="ring-1"
                    id="image"
                    onChange={(e) => setEditImage(e.target.files)}
                    accept="image/*"
                  />
                  {!editImage && newsImage ? (
                    <div className="w-full h-full max-h-[25vh] overflow-clip">
                      <img
                        src={IMAGE_URL + newsImage}
                        alt=""
                        className="my-3 object-contain w-full h-full object-top"
                      />
                    </div>
                  ) : editImage && editImage.length > 0 ? (
                    <div className="w-full h-full max-h-[25vh] overflow-clip">
                      <img
                        src={URL.createObjectURL(editImage[0])}
                        alt=""
                        className="my-3 object-contain w-full h-full object-top"
                      />
                    </div>
                  ) : (
                    <div className="text-xs p-1">No image detected</div>
                  )}
                </div>
                <DialogFooter>
                  {!publish ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={"link"}>Save</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Publish post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This post is saved as draft. Do you want to publish
                            it?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction asChild>
                            <Button
                              variant={"link"}
                              onClick={() => editNews(true)}
                              disabled={loading}
                            >
                              Yes
                            </Button>
                          </AlertDialogAction>
                          <AlertDialogCancel asChild>
                            <Button
                              onClick={() => editNews(false)}
                              variant={"outline"}
                              disabled={loading}
                            >
                              No
                            </Button>
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button
                      type="submit"
                      onClick={() => editNews(true)}
                      variant={"link"}
                      disabled={loading}
                    >
                      Save
                    </Button>
                  )}
                  <div>
                    <DialogClose asChild>
                      <Button variant={"destructive"}>Discard</Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant={"destructive"} className="text-xs">
                  Delete
                </Button>
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
                    onClick={() => deleteNews(id)}
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
    </div>
  );
};

export default NewsCard;
