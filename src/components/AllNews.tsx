import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useNewsContent } from "@/hooks/query";
import QueryError from "./QueryError";
import QueryLoader from "./QueryLoader";
import NewsCard from "./NewsCard";
import img6 from "../assets/images/pexels-ann-h-45017-1762851.jpg";
import img7 from "../assets/images/pexels-n-voitkevich-5642086.jpg";
import img8 from "../assets/images/pexels-steve-1629818.jpg";
import { IMAGE_URL } from "@/services/api";
const AllNews = () => {
  const { data: news, isLoading, isError, refetch } = useNewsContent();

  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  return (
    <div>
      <Header />
      <div className="p-5 w-full ">
        <h2 className="text-3xl font-bold">News Feed</h2>
        <p className="text-primary">// Latest News and Events.</p>

        <div className="min-h-screen bg-gray-50 py-5">
          {/* Breadcrumb */}
          <nav className="container mx-auto px-2 mb-4 text-sm text-gray-600">
            <a href="/#news" className="hover:underline">
              Home
            </a>{" "}
            &gt;
            <a href="/news" className="hover:underline">
              {" "}
              News Feed
            </a>
          </nav>
          <div className="imgs flex gap-5 justify-center flex-wrap lg:flex-nowrap">
            {news && news.length > 0
              ? news.map((news, i) => (
                  <NewsCard
                    title={news.title}
                    date={news.createdAt}
                    body={news.body}
                    id={news.id}
                    image={
                      news.image !== ""
                        ? IMAGE_URL + news.image
                        : (i + 1) % 2 === 0
                        ? img7
                        : (1 + i) % 3 === 0
                        ? img8
                        : img6
                    }
                    key={news.id}
                    newsImage={news.image}
                    likes={news.likes}
                    views={news.views}
                    edited={news.edited}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllNews;
