import FloatingTag from "./FloatingTag";
import LeadersCard from "./LeadersCard";
const Leaders = () => {
  return (
    <section
      className="py-24 pb-10 px-5 lg:px-20 relative min-h-[100vh]"
      id="leaders"
    >
      <FloatingTag text="Founders" className="lg:-left-7" />
      <div className="py-4 w-full text-center flex justify-center">
        <h2 className="text-3xl font-bold w-[30%]">
          The Founders of Global Kids Academy
        </h2>
      </div>
      <div className="leaders grid grid-cols-6 grid-rows-3 gap-5 justify-items-center py-5">
        <div className=" col-span-6">
          <LeadersCard name={"Mr PJ. Remember"} position="Proprietor" />
        </div>
        <div className="col-span-3">
          <LeadersCard
            name={"Mr Praise Afolayan"}
            position="Director of Studies"
          />
        </div>
        <div className="col-span-3">
          <LeadersCard
            name={"Mrs Esther Macaulay"}
            position="Ast. Director of Studies"
          />
        </div>
        <div>one</div>
        <div>two</div>
        <div>three</div>
        <div>four</div>
        <div className="col-span-2">five</div>
      </div>
    </section>
  );
};

export default Leaders;
