import SignupBanner from "../component/banner/SignupBanner";
import SignupForm from "../component/singup/Signup";
import { SignUpDiv } from "../styles/Container";

function SignupPage() {
  return (
    <SignUpDiv>
      <SignupBanner />
      <div>
        <SignupForm />
      </div>
    </SignUpDiv>
  );
}

export default SignupPage;
