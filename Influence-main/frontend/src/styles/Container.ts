import styled from "styled-components";

export const WrapperContainer = styled.div`
max-width:1440px;
width:100%;
padding:0rem 2rem;
margin:0 auto;
`

export const Main = styled(WrapperContainer)`padding-top:60px;
`


export const HomePageMain = styled.div`
display: flex;

margin-top:5rem;
margin-bottom:5rem;
justify-content:space-between;




`

export const SignUpDiv = styled(WrapperContainer)`
display: flex;
align-items:center;
justify-content:space-around;
width:100%;
margin:5rem 0;
border:1px solid ${props => props.theme.border};
`
export const LoginDiv = styled(WrapperContainer)`
position:relative;
display: flex;
align-items:center;
justify-content:space-around;
width:100%;
margin:3rem 0;
border:1px solid ${props => props.theme.border};
padding:2rem;
`