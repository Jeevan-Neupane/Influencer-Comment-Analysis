import { useSelector } from "react-redux";
import { useGetUserYoutubeVideosQuery } from "../store/api/userApi";
import Card from "../component/card";
import BigScreenLoading from "../component/loading/LoadingScreen";

const YoutubeVideoPage = () => {
  const token = useSelector((state: any) => state.user.token);
  const youtubeId = useSelector(
    (state: any) => state.user.user.youtubeChannelUrl
  );

  const { data, isLoading } = useGetUserYoutubeVideosQuery({
    token,
    userId: youtubeId,
  });
console.log(data);

  if (isLoading) {
    return (
      <div>
        <BigScreenLoading />
      </div>
    );
  }

  return (
    <div className="mt-3 text-2xl text-gray-800">
      <h1 className="text-3xl text-center font-bold">Your Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
        {data?.map((item: any) => {
          return <Card key={item.id} videoDetails={item} />;
        })}
      </div>
    </div>
  );
};

export default YoutubeVideoPage;
