import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reduser";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FomsControls/FormsControls";

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[required]}
          placeholder={"Email"}
          component={Input}
          name={"email"}
        />
      </div>
      <div>
        <Field
          validate={[required]}
          placeholder={"Password"}
          component={Input}
          name={"password"}
          type={"password"}
        />
      </div>
      <div>
        <Field
          validate={[required]}
          type={"checkbox"}
          component={Input}
          name={"rememberMe"}
        />
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = props => {
  const onSubmit = formData => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Navigate replace to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
