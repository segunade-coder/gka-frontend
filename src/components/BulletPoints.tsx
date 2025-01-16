import { Circle } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";
type Props = {
  text: string;
  className?: ClassNameValue;
};
const BulletPoints = ({ text, className }: Props) => {
  return (
    <div className="inline-flex gap-3 py-1">
      <Circle className="fill-white stroke-white min-w-[10px] max-w-[10px] group-hover:fill-white" />
      <span className={`text-xs ${className}`}>{text}</span>
    </div>
  );
};

export default BulletPoints;
