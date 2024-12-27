import  { useEffect } from "react";
import { useGetVideoDataMutation } from "../../store/api/videoApi";
import { useParams } from "react-router-dom";
import BigScreenLoading from "../loading/LoadingScreen";

const PopularComment = () => {
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
    <div className="mt-8 mb-3 py-5 px-3 bg-opacity-80 border border-gray-200 rounded-md">
      <h1 className="text-gray-800 text-3xl font-bold text-center">
        Popular Comments in Your Video
      </h1>
      <div className="mt-5 text-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data &&
          Object.entries(data.clusters).map(([key, value]: any) => {
            return (
              <div className="px-3 py-8 border border-gray-200 rounded-lg ">
                <div className="text-3xl font-bold text-green-600">
                  {value}+
                </div>
                <div>{key}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PopularComment;
