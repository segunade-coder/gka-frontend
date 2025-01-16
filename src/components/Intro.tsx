import { ArrowRight, Clipboard, EarthLockIcon, EyeIcon } from "lucide-react";
import BulletPoints from "./BulletPoints";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import FloatingTag from "./FloatingTag";

const Intro = () => {
  return (
    <section
      id="intro"
      className="w-full py-24 pb-10 px-5 lg:px-20 min-h-[100vh] bg-slate-100 relative"
    >
      <FloatingTag text="Introduction" className="lg:-left-11" />

      <div className="welcome_message inline-flex items-center gap-5 text-primary">
        <h1 className="text-2xl font-bold">Welcome to </h1>
        <span className="w-20 h-[0.15rem] bg-primary"></span>
      </div>
      <h1 className="text-3xl font-bold mt-2">Global Kids Academy</h1>
      <span className="text-slate-700">
        <small className="font-bold">Motto : </small>
        <span className="motto">To be the best</span>
      </span>

      <div className="py-5 text-sm">
        Global Kids Academy (GKA), Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Amet a eaque commodi id. Quaerat, harum. Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Architecto voluptatem
        harum labore omnis repudiandae? Doloribus nemo eveniet fuga pariatur
        nesciunt.
      </div>

      <div className="mission_values flex gap-5 justify-center">
        <div className="flex items-center justify-center">
          <ArrowRight className="w-16 text-primary" />
        </div>
        <Card className="w-[350px] bg-gray-800 text-white group hover:bg-slate-900 transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="flex gap-3">
              Mission
              <EarthLockIcon className="text-primary group-hover:text-white" />
            </CardTitle>
            <CardDescription className="text-slate-300">
              Our mission statement
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm flex flex-col">
            <BulletPoints text="To Provide Qualitative Education of International Standard to Pupils/Students at Nursery, Primary and Secondary School Levels." />
            <BulletPoints text="To Bridge The Gap Between the 'Haves and Haves Not' in the Society By Providing Sound and Qualitative Education at Very Affordable Rates." />
            <BulletPoints text="To Be The Best in the art of Wholesome Knowledge Impartation and Sound Education Service Delivery." />
          </CardContent>
        </Card>
        <Card className="w-[350px] bg-gray-800 text-white group hover:bg-slate-900 transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="flex gap-3 ">
              Vision
              <EyeIcon className="text-primary group-hover:text-white" />
            </CardTitle>
            <CardDescription className="text-slate-300">
              Our Vision statement
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm flex flex-col">
            <BulletPoints text="To provide a solid educational foundation necessary for raising responsible, dynamic and progressive future leaders and professionals." />
            <BulletPoints text="To provide the best educational standards in line with international best practices irrespective of family's financial status." />
            <BulletPoints text="To transform into a pure Science Academy (COLLEGE)." />
          </CardContent>
        </Card>
        <Card className="w-[350px] bg-gray-800 text-white group hover:bg-slate-900 transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="flex gap-3">
              Core Values
              <Clipboard className="text-primary group-hover:text-white" />
            </CardTitle>
            <CardDescription className="text-slate-300">
              Our Core Values
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm flex flex-col">
            <BulletPoints text="Be Godly" />
            <BulletPoints text="Be Respectful" />
            <BulletPoints text="Be Responsible" />
            <BulletPoints text="Be Safe" />
          </CardContent>
        </Card>
      </div>
      <div className="flex">
        <Button
          className="my-4 ring-1 ring-primary py-6 text-primary mx-auto rounded-none transition-all hover:bg-primary hover:text-white"
          variant={"ghost"}
          asChild
        >
          <a href="#leaders">See Founders</a>
        </Button>
      </div>
    </section>
  );
};

export default Intro;
