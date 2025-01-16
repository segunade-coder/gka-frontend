import { ImSpinner } from "react-icons/im";

const PageLoader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ImSpinner className="animate-spin text-4xl text-primary" />
    </div>
  );
};

export default PageLoader;
