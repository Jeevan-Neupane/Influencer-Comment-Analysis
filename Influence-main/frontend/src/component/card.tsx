import {Link} from "react-router-dom";
import {FaArrowTrendUp} from "react-icons/fa6";
export default function Card({videoDetails}: any) {
  return (
    <div className="font-bold border border-gray-200 rounded-md p-5 flex flex-col justify-center gap-3">
      <h1>{videoDetails.title}</h1>
      <div className="flex justify-center">
        <img
          src={videoDetails.thumbnail}
          alt={videoDetails.title}
          className="h-40 w-auto"
        />
      </div>

      <div className="flex justify-between">
        <Link
          to={`video/${videoDetails.videoId}`}
          className="py-3 px-5 border border-gray-200 rounded-lg h-20 w-full flex items-center justify-center gap-2 hover:bg-gray-800 hover:text-gray-200"
        >
          <span>
            <FaArrowTrendUp />
          </span>
          Get Analytics
        </Link>
      </div>
    </div>
  );
}
