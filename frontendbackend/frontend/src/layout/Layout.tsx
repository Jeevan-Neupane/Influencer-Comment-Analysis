import { Outlet } from "react-router-dom";
import Header from "../component/header/Header";
import { Main } from "../styles/Container";

type Props = {};

const Layout = ({}: Props) => {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;
