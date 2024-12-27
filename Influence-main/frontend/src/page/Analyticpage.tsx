import { Outlet, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../component/sidebar/Sidebar";
import { useEffect } from "react";
import Chat from "../component/chat";

type Props = {};

const Analyticpage = ({}: Props) => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  useEffect(() => {
    navigate(`/analytics/youtube/video/${videoId}/graphs`);
  }, []);
  return (
    <div>
      <div className='ml-[20%]'>
        <Outlet />
      </div>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Analyticpage;
