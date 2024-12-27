import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import ProtectedRoutes from "./layout/ProtectedRoutes.tsx";
import Homepage from "./page/Homepage.tsx";
import Layout from "./layout/Layout.tsx";
import SignupPage from "./page/Signuppage.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";
import {lightThemeColors} from "./styles/theme.ts";
import LoginPage from "./page/Loginpage.tsx";
import Cookies from "js-cookie";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setToken, setUser} from "./store/store.ts";
import {useGetUserQuery} from "./store/api/userApi.ts";
import BigScreenLoading from "./component/loading/LoadingScreen.tsx";
import Analyticpage from "./page/Analyticpage.tsx";
import YoutubeVideoPage from "./page/YoutubeVideoPage.tsx";
import GraphAnalytics from "./component/analytics/GraphAnalytics.tsx";
import Recommendation from "./component/analytics/Recommendation.tsx";
import Comments from "./component/analytics/Comments.tsx";
import PricePage from "./page/PricePage.tsx";
function App() {
  const token = Cookies.get("accessToken");
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.user.token);
  const { data, isLoading } = useGetUserQuery(accessToken);

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
  }, [data]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoutes authenticated={true}>
              <Homepage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/analytics/youtube",
          element: (
            <ProtectedRoutes authenticated={true}>
              <YoutubeVideoPage />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/signup",
          element: (
            <ProtectedRoutes authenticated={false}>
              <SignupPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/price",
          element: (
           
              <PricePage />
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedRoutes authenticated={false}>
              <LoginPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/analytics/youtube/video/:videoId",
          element: (
            <ProtectedRoutes authenticated={true}>
              <Analyticpage />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: "graphs",
              element: <GraphAnalytics />,
            },
            {
              path: "comments",
              element: <Comments />,
            },
            {
              path: "recommendations",
              element: <Recommendation />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={lightThemeColors}>
      {isLoading ? <BigScreenLoading /> : <RouterProvider router={router} />}

      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
