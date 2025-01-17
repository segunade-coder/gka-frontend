import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import History from "../components/History";
import News from "../components/News";
import Footer from "../components/Footer";
import { useGetInitialData } from "../hooks/query";
import PageLoader from "../components/PageLoader";
import QueryError from "@/components/QueryError";
import Intro from "@/components/Intro";
import Leaders from "@/components/Leaders";
import UpcomingEvents from "@/components/UpcomingEvents";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  const { data, isLoading, isError, refetch } = useGetInitialData();

  if (isLoading) {
    return <PageLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  if (!data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center text-2xl">
        Couldn't load page. contact admin
      </div>
    );
  }
  const { hero, about, history, gallery, news, slider } = data;
  return (
    <div className="bg-slate-100">
      <Header />
      <Hero content={hero} slider={slider} />
      <Intro />
      <About content={about} />
      <History content={history} />
      <Leaders />
      <Gallery content={gallery} />
      <UpcomingEvents content={news} />
      <News content={news} />
      <Testimonials />
      <Footer content={news} />
    </div>
  );
};

export default Home;
