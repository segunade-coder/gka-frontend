import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import { useNewsContentById } from "../../hooks/query";
import QueryLoader from "@/components/QueryLoader";
import QueryError from "@/components/QueryError";
import { IMAGE_URL } from "@/services/api";
import { useEffect, useState } from "react";
import { useAddLikes, useAddViews } from "@/hooks/mutation";
import Footer from "@/components/Footer";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { numberFormatter } from "@/lib/utils";

const IndNews = () => {
  const { id } = useParams();
  const addViews = useAddViews();
  const addLikes = useAddLikes();
  const [like, setLike] = useState(() => {
    try {
      if (window.localStorage !== undefined) {
        const liked = window.localStorage.getItem("liked");

        if (!liked) {
          return false;
        }
        const newLiked = JSON.parse(liked) as string[];
        if (newLiked.includes(id as string)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  });

  if (!id) {
    window.history.back();
    return;
  }
  const { data, isLoading, isError, refetch } = useNewsContentById(
    id as string
  );
  document.title = data ? data.title.toUpperCase() : "Global Kids Academy";
  useEffect(() => {
    try {
      if (window.localStorage !== undefined) {
        if (data && !isLoading && !isError) {
          let viewed = window.localStorage.getItem("viewed");
          if (!viewed) {
            const template = [id];
            addViews.mutateAsync(id);
            window.localStorage.setItem("viewed", JSON.stringify(template));
          } else {
            const newViewed = JSON.parse(viewed) as string[];
            if (!newViewed.includes(id)) {
              newViewed.push(id);
              addViews.mutateAsync(id);
              window.localStorage.setItem("viewed", JSON.stringify(newViewed));
            }
          }
        }
      }
    } catch (error) {}
  }, [id, isLoading]);
  if (isLoading) {
    return <QueryLoader />;
  }
  if (isError) {
    return <QueryError refetch={refetch} />;
  }
  const handleLike = async (value: boolean) => {
    addLikes.mutate({ id, value: { like: value } });
    setLike(value);
    try {
      if (window.localStorage !== undefined) {
        const liked = window.localStorage.getItem("liked");

        if (!liked) {
          let newLiked = [id as string];
          window.localStorage.setItem("liked", JSON.stringify(newLiked));
        } else {
          let newLiked = JSON.parse(liked) as string[];
          if (!newLiked.includes(id as string)) {
            newLiked.push(id as string);
            window.localStorage.setItem("liked", JSON.stringify(newLiked));
          }
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <Header />
      <div className="p-5 w-full ">
        <h2 className="text-3xl font-bold">News Feed</h2>
        <p className="text-primary">// Latest News and Events.</p>
        <div className="content p-5 pl-0">
          {!data ? (
            <div>No Data Found</div>
          ) : (
            <div className="bg-gray-50 pt-2 ">
              {/* Breadcrumb */}
              <nav className="text-xs text-gray-600">
                <a href="/#news" className="hover:underline">
                  Home
                </a>{" "}
                &gt;
                <a href="/news" className="hover:underline">
                  {" "}
                  News Feed
                </a>{" "}
                &gt;
                <span className="capitalize"> {data.title.toLowerCase()}</span>
              </nav>

              <div className="mx-auto px-4 p-6">
                {/* Content */}
                <div className="text-gray-700 min-h-[350px] h-fit text-lg leading-7 space-y-4 px-10 md:px-22 py-5">
                  <div className="min-h-[250px]">
                    {data.image !== "" ? (
                      <img
                        src={IMAGE_URL + data.image} // Replace with your image path
                        alt="End of Session"
                        className="mr-8 mb-2 p-5 object-cover shadow-lg w-[450px] h-[450px] md:max-w-2xl float-left rounded-full"
                        style={{ shapeOutside: "circle(50%)" }}
                      />
                    ) : (
                      ""
                    )}
                    <div className="body">
                      <div className="text-4xl font-extrabold text-gray-800 mb-6 indent-14">
                        {data.title}
                      </div>
                      <div className="text-sm text-justify leading-7">
                        {data.body}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 text-xs flex justify-between">
                    <span className="flex gap-3 items-center">
                      {like ? (
                        <MdThumbUp
                          className="fill-primary text-lg cursor-pointer"
                          onClick={() => handleLike(!like)}
                        />
                      ) : (
                        <MdOutlineThumbUp
                          className="text-lg cursor-pointer"
                          onClick={() => handleLike(!like)}
                        />
                      )}
                      <span>{numberFormatter.format(data.likes)}</span>
                      <span className="text-lg flex gap-2 items-center">
                        <BsEye />
                        <span className="text-sm">
                          {numberFormatter.format(data.views)}
                        </span>
                      </span>
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold">Published by: Admin</span>
                      <span>{new Date(data.createdAt).toDateString()}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IndNews;
