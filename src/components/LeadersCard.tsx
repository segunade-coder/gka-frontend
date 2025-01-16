type Props = {
  name: String;
  position: string;
};
const LeadersCard = ({ name, position }: Props) => {
  return (
    <div className="flex gap-5 items-center">
      <div className="h-8 w-1 bg-primary"></div>
      <div className="bg-slate-200 rounded-[50px] py-4 px-10">
        <h3 className="text-lg font-bold">{name} </h3>
        <h3 className="text-xs">{position}</h3>
      </div>
    </div>
  );
};

export default LeadersCard;
