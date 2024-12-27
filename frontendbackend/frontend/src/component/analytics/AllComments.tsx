import { useParams } from "react-router-dom";
import { useGetVideoDataMutation } from "../../store/api/videoApi";
import { useEffect } from "react";
import BigScreenLoading from "../loading/LoadingScreen";

const AllComments = () => {
  const [videoData, status] = useGetVideoDataMutation();
  const { videoId } = useParams();
  const { data, isLoading, error } = status;

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
    <div className="mt-8 mx-3 text-3xl font-semibold">
      <h1 className="text-center">Sentiment Analysis of Comments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
        {data &&
          Object.entries(data.sentiments).map(([key, value]: any) => {
            return (
              <div className="border py-8 px-5 rounded-lg w-full">
                <div className="text-3xl font-bold text-green-600">{value}</div>
                <h2 className="text-gray-800">{key}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllComments;
