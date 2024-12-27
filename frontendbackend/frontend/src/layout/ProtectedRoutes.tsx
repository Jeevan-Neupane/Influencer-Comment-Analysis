import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../component/loading/LoadingScreen";

type Props = {
  children: React.ReactNode;
  authenticated: boolean;
};

const ProtectedRoutes = ({ children, authenticated = true }: Props) => {
  const authStatus = useSelector((state: any) => state.user.status);

  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && authStatus !== authenticated) {
      navigate("/login");
    } else if (!authenticated && authStatus !== authenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authenticated, navigate]);

  return loader ? <LoadingScreen /> : <>{children}</>;
};

export default ProtectedRoutes;
