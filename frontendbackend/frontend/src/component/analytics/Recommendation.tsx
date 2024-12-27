import React, { useEffect } from "react";
import { useGetVideoDataMutation } from "../../store/api/videoApi";
import { useParams } from "react-router-dom";
import BigScreenLoading from "../loading/LoadingScreen";

const Recommendation = () => {
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
    <div className="mt-8 mb-3 py-5 px-3 border border-gray-200 rounded-md">
      {data && (
        <div className="">
          <h1 className="text-3xl font-bold text-center">
            Recommendations for next videos:
          </h1>
          <div className="flex flex-col gap-3 mt-5">
            {data.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg py-8 px-3 inline-block text-gray-800 font-bold text-2xl lg:w-1/2"
              >
                {recommendation}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
