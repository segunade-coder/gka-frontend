import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import img6 from "../assets/images/pexels-ann-h-45017-1762851.jpg";
import img7 from "../assets/images/pexels-n-voitkevich-5642086.jpg";
import img8 from "../assets/images/pexels-steve-1629818.jpg";
import NewsCard from "./NewsCard";
import FloatingTag from "./FloatingTag";
import { News as NewsTypes } from "../types";
type Props = {
  content: NewsTypes[] | [];
};
const News = ({ content }: Props) => {
  if (content.length === 0) {
    return (
      <section
        className="py-24 px-10 lg:px-20 flex items-center justify-center"
        id="news"
      >
        No News Yet
      </section>
    );
  }
  return (
    <section className="py-20 px-10 lg:px-20 relative" id="news">
      <FloatingTag text="News" className="lg:-left-[1.5rem]" />
      <div className="py-6 w-full">
        <h2 className="text-3xl font-bold">News Feed</h2>
        <p className="text-primary">// Latest News and Events.</p>
      </div>
      <div className="imgs flex gap-5 py-2 justify-center flex-wrap lg:flex-nowrap">
        {content.length > 0
          ? content.map((news, i) => (
              <NewsCard
                title={news.title}
                date={news.createdAt}
                body={news.body}
                id={news.id}
                image={
                  (i + 1) % 2 === 0 ? img7 : (1 + i) % 3 === 0 ? img8 : img6
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
      {content && content.length > 0 ? (
        <div className="pt-3 flex mx-auto w-fit">
          <a
            href="news"
            className="flex items-center py-3 px-4 rounded-md text-sm w-fit gap-2 text-primary"
          >
            See More <MdKeyboardDoubleArrowRight />
          </a>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default News;
