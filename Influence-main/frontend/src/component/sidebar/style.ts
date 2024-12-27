import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SideBarOuterDiv = styled.div`
    display:flex;
  
    width:20%;
    height:100vh;
    background-color:${props => props.theme.component};
    padding:10px;
    position:fixed;
    top:0;
    left:0;
    z-index:100;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    border-right:1px solid ${props => props.theme.border};
`


export const SideBarLinks = styled(NavLink)`
font-size:1.5rem;
text-decoration:none;
color:gray;
display:block;
margin-top:2rem;
margin-left:1rem;
`


