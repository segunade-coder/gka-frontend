import FloatingTag from "./FloatingTag";
import LeadersCard from "./LeadersCard";
import { Button } from "./ui/button";
const Leaders = () => {
  return (
    <section
      className="py-24 pb-10 px-5 lg:px-20 relative min-h-[100vh] bg-slate-100"
      id="leaders"
    >
      <FloatingTag text="Founders" className="lg:-left-7" />
      <div className="py-4 w-full text-center flex justify-center">
        <h2 className="text-3xl font-bold w-[30%]">
          The Founders of Global Kids Academy
        </h2>
      </div>
      <div className="leaders grid grid-cols-4 grid-rows-3 gap-9 justify-items-center py-5">
        <div className=" col-span-4">
          <LeadersCard name={"Mr PJ. Remember"} position="Proprietor" />
        </div>
        <div className="col-span-2">
          <LeadersCard
            name={"Mr Praise Afolayan"}
            position="Director of Studies"
          />
        </div>
        <div className="col-span-2">
          <LeadersCard
            name={"Mrs Esther Macaulay"}
            position="Ast. Director of Studies/HOD  Nursery Section"
          />
        </div>
        <div>
          <LeadersCard
            name={"Mrs Jumoke Pemeda"}
            position="HOD. Primary Section"
          />
        </div>
        <div>
          <LeadersCard
            name={"Mrs Funke Oyelade"}
            position="HOD. Pre-Nursery Section"
          />
        </div>
        <div>
          <LeadersCard
            name={"Mrs Jamila Afolayan"}
            position="HOD. Junior Secondary Section"
          />
        </div>
        <div>
          <LeadersCard
            name={"Mrs Caterine Ige"}
            position="HOD. Senior Secondary Section"
          />
        </div>
      </div>
      <div className="flex py-2">
        <Button
          asChild
          variant={"link"}
          className="text-primary underline mx-auto"
        >
          <a href=""> See all Leaders</a>
        </Button>
      </div>
    </section>
  );
};

export default Leaders;
