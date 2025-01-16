import EditTitle from "@/components/EditTitle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import img1 from "../../assets/images/pexels-ann-h-45017-1762851.jpg";
import img2 from "../../assets/images/pexels-n-voitkevich-5642086.jpg";
import img3 from "../../assets/images/pexels-steve-1629818.jpg";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import QueryError from "@/components/QueryError";
import QueryLoader from "@/components/QueryLoader";
import { useNewsContent } from "@/hooks/query";
import { EditNewsCard } from "@/components/NewsCard";
import { toast } from "sonner";
import { useAddNews } from "@/hooks/mutation";
import { FaSpinner } from "react-icons/fa6";
const EditNews = () => {
  const { data, isLoading, isError, refetch } = useNewsContent();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<FileList | null>();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const addNewsFnc = useAddNews();
  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  const addNews = async (publish: boolean) => {
    if (title !== "" && body !== "") {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("publish", publish + "");
      formData.append("image", image && image.length > 0 ? image[0] : "");
      toast.loading("loading...", { id: "loading-add-news" });
      setLoading(true);
      try {
        await addNewsFnc.mutateAsync(formData);
        setOpen(false);
        toast.dismiss("loading-add-news");
        toast.success("Success", {
          description: "News published successfully",
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
    setBody("");
    setImage(null);
  };
  return (
    <div className="px-5">
      <EditTitle text="Edit News" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className="text-sm hover:bg-primary hover:text-white text-primary flex gap-2 py-2 px-4 items-center rounded-md ml-auto md:mr-10"
          >
            <BiPlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post a News</DialogTitle>
            <DialogDescription>Make a post about events</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter the title of the news"
              className="ring-2 ring-slate-400 py-6 my-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label htmlFor="body" className="">
              Body
            </Label>
            <Textarea
              id="body"
              placeholder="Enter the body of the news"
              className="ring-2 ring-slate-400 py-2 my-2"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
            />
            <Label htmlFor="image">
              {!!image ? "Change" : "Choose"} News Image
            </Label>
            <Input
              type="file"
              className="ring-1"
              id="image"
              onChange={(e) => setImage(e.target.files)}
              accept="image/*"
            />
            {image && image?.length > 0 ? (
              <div className="w-[150px] h-[150px] overflow-clip rounded-full border-2 border-slate-200">
                <img
                  src={URL.createObjectURL(image[0])}
                  alt=""
                  className="my-3 object-cover w-full h-full object-top rounded-full"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => addNews(true)}
              disabled={loading}
            >
              Publish {loading ? <FaSpinner className="animate-spin" /> : ""}
            </Button>
            <Button variant={"outline"} onClick={() => addNews(false)}>
              Save as Draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex gap-5 flex-wrap my-4">
        {!!data && data.length > 0 ? (
          data?.map((news, i) => (
            <EditNewsCard
              title={news.title}
              date={news.createdAt}
              body={news.body}
              id={news.id}
              image={(i + 1) % 2 === 0 ? img2 : (1 + i) % 3 === 0 ? img3 : img1}
              key={news.id}
              newsImage={news.image}
              publish={news.publish}
            />
          ))
        ) : (
          <div>Nothing here</div>
        )}
      </div>
    </div>
  );
};

export default EditNews;
