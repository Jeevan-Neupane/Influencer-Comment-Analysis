import { useForm } from "react-hook-form";
import {
  Button,
  ErrorMessage,
  FormContainer,
  FormGroup,
  Input,
  Label,
  LoginHeading,
} from "./style";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import LoadingButton from "../loading/LoadingButton";
import { useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
} from "../../store/api/userApi";
import { setToken, setUser } from "../../store/store";
type FormProps = {
  username: string;
  password: string;
  youtubeLink: string;
};
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const [loginUser, status] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = status;

  const onSubmit = (data: any) => {
    loginUser(data);
  };
  useEffect(() => {
    if (data) {
      dispatch(setToken(data.data.accessToken));
      dispatch(setUser(data.data));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "you are logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error occurred",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#001e2b",
        color: "#fff",
      });
    }
  }, [data, error]);

  return (
    <FormContainer>
      <LoginHeading>Login </LoginHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
            })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type='password'
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>

        <Button type='submit'>{isLoading ? <LoadingButton /> : "Login"}</Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
