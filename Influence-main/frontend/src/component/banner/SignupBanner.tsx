import { LoginDiv, LoginImage } from "./style";
import signup from "../../../public/signup.jpg";

const SignupBanner = () => {
  return (
    <LoginDiv>
      <LoginImage src={signup} />
    </LoginDiv>
  );
};

export default SignupBanner;
