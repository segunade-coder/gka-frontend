import { Button } from "./ui/button";
import { BiRefresh } from "react-icons/bi";
import svg from "../assets/images/381599_error_icon.svg";

const QueryError = ({ refetch }: { refetch: Function }) => {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center flex-col">
      <img src={svg} className="w-[100px] h-[100px] object-contain" />
      <p className="py-4 text-gray-500 text-lg">
        An Error occurred while fetching data
      </p>
      <Button
        size={"sm"}
        className="bg-primary text-white hover:bg-primary/80"
        onClick={() => refetch()}
      >
        Reload <BiRefresh />
      </Button>
    </div>
  );
};

export default QueryError;
