import { connect, ConnectedProps } from "react-redux";
import { withRouter, RouteComponentProps, RouteProps } from "react-router-dom";
import { withFormik, FormikState, FormikHandlers, FormikHelpers } from "formik";
import * as yup from "yup";
import { signIn } from "../../../store/actions/user/authAction";
import { AppState } from "../../../store/types";
import { getAuth } from "../../../store/selectors";

import Login from "./Login";

interface RouteParams {
  id: string;
}

type OwnProps = RouteComponentProps<RouteParams> & RouteProps;

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    auth: getAuth(state)
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps) => {
  return {
    login: (credentials: any) =>
      dispatch(signIn(credentials))
        .then(() => {
          // ownProps.history.push("/profile");
          window.location.href = "/profile";
        })
        .catch((err: any) => {
          console.log(err);
        })
  };
};

export type LoginFormData = {
  email: string;
  password: string;
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector> &
  OwnProps &
  FormikState<LoginFormData> &
  FormikHelpers<LoginFormData> &
  FormikHandlers;

export default connector(
  withRouter(
    withFormik<Props, LoginFormData>({
      mapPropsToValues(props: Props) {
        return {
          email: "",
          password: ""
        };
      },
      validationSchema: yup.object().shape({
        email: yup.string().required("Email address is required"),
        password: yup.string().required("Password is required")
      }),
      async handleSubmit(values, { props, setSubmitting }) {
        try {
          await props.login(values);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
      //@ts-ignore
    })(Login)
  )
);
