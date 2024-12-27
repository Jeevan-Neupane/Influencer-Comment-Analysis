import LoginBanner from "../component/banner/LoginBanner";
import LoginForm from "../component/login/Login";
import { LoginDiv } from "../styles/Container";

function LoginPage() {
  return (
    <LoginDiv>
      <LoginBanner />
      <LoginForm />
    </LoginDiv>
  );
}

export default LoginPage;
