import EditTitle from "@/components/EditTitle";
import QueryError from "@/components/QueryError";
import QueryLoader from "@/components/QueryLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditHistory } from "@/hooks/mutation";
import { useHistoryContent } from "@/hooks/query";
import { History } from "@/types";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

const EditHistory = () => {
  const { data, isLoading, isError, refetch } = useHistoryContent();

  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  if (!data) {
    return <div>No data found</div>;
  }
  return (
    <div className="px-5">
      <EditTitle text="Edit About page" />

      <HistoryCard data={data} />
    </div>
  );
};
type Props = {
  data: History;
};
const HistoryCard = ({ data }: Props) => {
  const [history, setHistory] = useState(data.text.trim());
  const [years, setYears] = useState(data.yearsInService || 1);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(true);

  const editHistoryFnc = useEditHistory();
  const editHistory = async () => {
    if (history !== "" && years !== 0) {
      toast.loading("loading...", { id: "loading-edit-history" });
      setLoading(true);
      try {
        await editHistoryFnc.mutateAsync({ history, years, id: data.id });
        toast.dismiss("loading-edit-history");
        toast.success("Success", {
          description: "History Modified successfully",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Warning", {
        description: "Please, fill in all necessary fields",
      });
    }
  };
  useEffect(() => {
    try {
      (textAreaRef.current as HTMLTextAreaElement).style.height = "inherit";

      // Get the computed styles for the element
      const computed = window.getComputedStyle(
        textAreaRef.current as HTMLTextAreaElement
      );

      // Calculate the height
      const height =
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        (textAreaRef.current as HTMLTextAreaElement).scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);

      (textAreaRef.current as HTMLTextAreaElement).style.height = `${height}px`;
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleKeyDown(e: any) {
    // Reset field height
    e.target.style.height = "inherit";

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    e.target.style.height = `${height}px`;
  }
  return (
    <Card className="w-full md:w-[500px] my-5 shadow-lg border-slate-300">
      <CardHeader>
        <CardTitle>Edit History</CardTitle>
        <CardDescription>Click text to edit</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text py-5">History Text</Label>
              <Textarea
                id="text"
                placeholder="Edit history text."
                value={history}
                onChange={(e) => setHistory(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                onPaste={(e) => handleKeyDown(e)}
                onBlur={(e) => handleKeyDown(e)}
                ref={textAreaRef}
                autoFocus
                className="text-gray-500 border-slate-300"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="years" className="py-2">
                Years of Service
              </Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                className="border-slate-300"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={() => editHistory()} disabled={loading}>
          Save {loading ? <FaSpinner className="animate-spin" /> : ""}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default EditHistory;
