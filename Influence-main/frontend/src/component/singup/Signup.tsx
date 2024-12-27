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
import { useRegisterUserMutation } from "../../store/api/userApi";
import { setUser } from "../../store/store";
type FormProps = {
  username: string;
  password: string;
  youtubeChannelUrl: string;
};
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const [registerUser, status] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = status;

  const onSubmit = (data: FormProps) => {
    registerUser(data);
  };
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));

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
        // @ts-ignore
        text: error?.data?.message?.message,
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
      <LoginHeading>Sign Up </LoginHeading>
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
        <FormGroup>
          <Label>Youtube Channel Id</Label>
          <Input
            {...register("youtubeChannelUrl", {
              required: "Youtube channel Id  is required",
              minLength: {
                value: 3,
                message: "Youtube channel id is must ",
              },
            })}
          />
          {errors.youtubeChannelUrl && (
            <ErrorMessage>{errors.youtubeChannelUrl.message}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Facebook Profile Link</Label>
          <Input type='text' />
        </FormGroup>
        <FormGroup>
          <Label>Instagram Profile Link</Label>
          <Input type='text' />
        </FormGroup>
        <FormGroup>
          <Label>Linkedin Profile Link</Label>
          <Input type='text' />
        </FormGroup>

        <Button type='submit'>
          {isLoading ? <LoadingButton /> : "Register"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default SignupForm;
