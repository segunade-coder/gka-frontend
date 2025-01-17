type Props = {
  name: String;
  position: string;
};
const LeadersCard = ({ name, position }: Props) => {
  return (
    <div className="flex gap-5 items-center group">
      {/* <div className="h-8 w-1 bg-primary"></div> */}
      <div className="bg-slate-100 rounded-[50px] py-4 px-10 border-l-2 border-slate-700 shadow-lg">
        <h3 className="font-bold">{name} </h3>
        <h3 className="text-xs pt-1">{position}</h3>
      </div>
    </div>
  );
};

export default LeadersCard;
