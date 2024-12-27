import {  NavItem } from "../header/style";
import { SideBarLinks, SideBarOuterDiv } from "./style";

const Sidebar = () => {
  const sideBarLinks = [
    {
      name: "Analytics",
      path: "graphs",
    },
    {
      name: "Comments",
      path: "comments",
    },
    {
      name: "Recommendations",
      path: "recommendations",
    },
  ];

  const linkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      borderColor: isActive ? "#00d4bd" : "",
      color: isActive ? "#00d4bd" : "",
    };
  };

  return (
    <SideBarOuterDiv>
      {sideBarLinks.map((link, index) => {
        return (
          <NavItem key={index}>
            <SideBarLinks
              to={link.path}
              style={linkStyle}
            >
              {link.name}
            </SideBarLinks>
          </NavItem>
        );
      })}
    </SideBarOuterDiv>
  );
};

export default Sidebar;
