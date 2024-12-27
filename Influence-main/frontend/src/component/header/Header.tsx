import {
  DesktopNav,
  Link,
  Logo,
  LogoText,
  LogoutButton,
  Nav,
  NavItem,
  NavItems,
  NavWrapper,
} from "./style";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import { useLogoutMutation } from "../../store/api/userApi";
import { removeUser, setToken } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { act } from "react";

function Header() {
  const [logoutUser, status] = useLogoutMutation();
  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user.user);

  const navData = [
    {
      title: "Home",
      url: "/",
      active: true,
    },

    {
      title: "Sign Up",
      url: "/signup",
      active: !user,
    },
    {
      title: "Login",
      url: "/login",
      active: !user,
    },
    {
      title:"Pricing",
      url:"/price",
      active:true

    }
  ];

  const linkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      borderBottom: isActive ? "1px solid white" : "",
      borderColor: isActive ? "#00d4bd" : "",
      color: isActive ? "#00d4bd" : "",
    };
  };

  return (
    <Nav>
      <NavWrapper>
        <Logo>
          <LogoText to='/'>
            <FaArrowTrendUp style={{ color: "#71f6b7",marginRight:"" }} />
            Influencer <span>Insight</span>
          </LogoText>
        </Logo>

        <DesktopNav>
          <NavItems>
            {navData.map((item) => {
              return (
                item.active && (
                  <NavItem key={item.title}>
                    <Link
                      to={item.url}
                      style={linkStyle}
                    >
                      {item.title}
                    </Link>
                  </NavItem>
                )
              );
            })}

            {user && (
              <LogoutButton
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "Do you want to logout?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Logged Out!",
                    background: "#001e2b",
                    color: "#fff",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      logoutUser({ token: token });
                      dispatch(setToken(null));
                      dispatch(removeUser());
                      navigate("/login");
                      Swal.fire({
                        title: "Log Out!",
                        text: "You are logged out",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        background: "#001e2b",
                        color: "#fff",
                      });
                    }
                  });
                }}
              >
                Logout
              </LogoutButton>
            )}
          </NavItems>
        </DesktopNav>
      </NavWrapper>
    </Nav>
  );
}

export default Header;
