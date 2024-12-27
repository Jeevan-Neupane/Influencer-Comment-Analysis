import login from "../../../public/login.jpg";
import { LoginDiv, LoginImage } from "./style";
const LoginBanner = () => {
  return (
    <LoginDiv>
      <LoginImage src={login} />
    </LoginDiv>
  );
};

export default LoginBanner;
