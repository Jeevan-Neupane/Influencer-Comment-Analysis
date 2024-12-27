import { useEffect } from "react";
import { useGetVideoDataMutation } from "../../store/api/videoApi";
import { useParams } from "react-router-dom";
import SentimentPieChart from "../charts/PieChart";
import BigScreenLoading from "../loading/LoadingScreen";
import SentimentsBarChart from "../charts/BarChart";
import WordCloud from "../charts/WordCloud";
import Recommendations from "../charts/Recommendation";
import {HoverEffect} from "../ui/card-hover-effect";

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
const Analytics = () => {
  const [videoData, status] = useGetVideoDataMutation();
  const {videoId} = useParams();
  const {data, isLoading, error} = status;

  console.log(data, isLoading, error);
  useEffect(() => {
    videoData(videoId);
  }, [videoId]);

  if (isLoading)
    return (
      <div>
        <BigScreenLoading />
      </div>
    );
  return (
    <>
      <div className="">
        <div className="mt-8 text-3xl font-semibold">
          <h1>All Comments</h1>
          <div className="flex gap-8 flex-wrap my-3">
            {data &&
              Object.entries(data.sentiments).map(([key, value]: any) => {
                return (
                  <div className="border py-8 px-5 rounded-lg w-[200px]">
                    <div className="text-3xl font-bold text-green-600">
                      {value}
                    </div>
                    <h2 className="text-gray-200">{key}</h2>
                  </div>
                );
              })}
          </div>
        </div>
        <hr />

        <div className="mt-8 mb-3">
          <h1 className="text-3xl">Popular Celebreties Comments</h1>
          {data && <HoverEffect items={data.celebrity_comments} />}
        </div>
        <hr />

        <div className="mt-8 mb-3">
          <h1 className="text-3xl font-bold">Some Popular Comments</h1>
          <div className="my-3 text-2xl text-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data &&
              Object.entries(data.clusters).map(([key, value]: any) => {
                return (
                  <div className="px-3 py-8 border rounded-lg ">
                    <div className="text-3xl font-bold text-green-600">
                      {value}+
                    </div>
                    <div>{key}</div>
                  </div>
                );
              })}
          </div>
        </div>
        <hr />

        <div className="mt-8 mb-3">
          {data && <Recommendations recommendations={data.recommendations} />}
        </div>
        <hr />
        <div className="mt-8">
          <h1 className="text-3xl">Analytics</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            <div className="flex justify">
              {data && <SentimentPieChart sentiments={data.sentiments} />}
            </div>
            <div style={{marginTop: "5rem"}} className="flex justify-center">
              {data && <SentimentsBarChart sentiments={data.sentiments} />}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {data && <WordCloud topics={data.topics} />}
        </div>
      </div>
    </>
  );
};

export default Analytics;
