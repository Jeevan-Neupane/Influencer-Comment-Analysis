import { useEffect } from "react";
import { useGetVideoDataMutation } from "../../store/api/videoApi";
import SentimentsBarChart from "../charts/BarChart";
import SentimentPieChart from "../charts/PieChart";
import BigScreenLoading from "../loading/LoadingScreen";
import { useParams } from "react-router-dom";
import WordCloud from "../charts/WordCloud";
import AllComments from "./AllComments";

const GraphAnalytics = () => {
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
    <div className="mt-8">
      {data && (
        <h1 className="text-3xl text-gray-800 text-center">
          Analytics of Video {data.title}
        </h1>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mt-10">
        <div className="border border-gray-200 rounded-md">
          <AllComments />
        </div>
        <div className="border border-gray-200 rounded-md">
          <h1 className="text-3xl text-center mt-8">
            Popular Keywords in Your Video
          </h1>
          <div>{data && <WordCloud topics={data.topics} />}</div>
        </div>
        <div className="flex flex-col justify-center items-center border border-gray-200 rounded-md">
          {data && <SentimentPieChart sentiments={data.sentiments} />}
        </div>
        <div className="flex flex-col justify-center items-center border border-gray-200 rounded-md">
          {data && <SentimentsBarChart sentiments={data.sentiments} />}
        </div>
      </div>
    </div>
  );
};

export default GraphAnalytics;
