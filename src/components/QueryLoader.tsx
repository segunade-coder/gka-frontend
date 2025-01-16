import { ImSpinner } from "react-icons/im";

const QueryLoader = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <ImSpinner className="animate-spin text-4xl text-primary" />
    </div>
  );
};

export default QueryLoader;
