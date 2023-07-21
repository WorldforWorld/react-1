import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reduser";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { required } from "../../utils/validators/validators";
import {
  GetStringKeys,
  Input,
  createField,
} from "../common/FomsControls/FormsControls";
import style from "../common/FomsControls/FormsControls.module.css";

interface LoginFormOwnProps {
  captchaUrl: string | null;
}

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>(
        "Email",
        "email",
        [required],
        Input
      )}
      {createField<LoginFormValuesTypeKeys>(
        "Password",
        "password",
        [required],
        Input,
        {
          type: "password",
        }
      )}
      {createField(
        undefined,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "remember me"
      )}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>(
          "Symbol from image",
          "captcha",
          [required],
          Input,
          {}
        )}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

export type LoginFormValuesType = {
  email: string;
  rememberMe: boolean;
  password: string;
  captcha: string;
};
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

export const Login: React.FC = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };
  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};
