import FloatingTag from "./FloatingTag";

const Testimonials = () => {
  return (
    <section className="py-20 pb-5 px-10 lg:px-20 relative" id="testimonies">
      <FloatingTag text="Testimonies" className="lg:-left-[2.8rem]" />
      <div className="py-6 w-full relative flex flex-col items-center">
        <div className="absolute w-[60%] h-1 bg-primary top-[40%]"></div>
        <h2 className="text-3xl font-bold text-primary bg-slate-100 py-1 pb-1 px-10 rounded-full z-[1]">
          Testimonials
        </h2>
        <p className="text-slate-600 text-sm">see what parents say about us.</p>
      </div>
    </section>
  );
};
export default Testimonials;
