import { connect, ConnectedProps } from "react-redux";
import { withRouter, RouteComponentProps, RouteProps } from "react-router-dom";
import { withFormik, FormikState, FormikHandlers, FormikHelpers } from "formik";
import * as yup from "yup";
import { AppState } from "../../../store/types";
import { getAuth } from "../../../store/selectors";
import { register } from "../../../store/actions/user/authAction";

import Register from "./Register";

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
    registerUser: (credentials: any) =>
      dispatch(register(credentials))
        .then(() => {
          ownProps.history.push("/login");
        })
        .catch((err: any) => {
          console.log(err);
        })
  };
};

export type RegisterFormData = {
  email: string;
  password: string;
  phone: string;
  address: string;
  dob: Date;
  photo: string;
  security_answer_1: string;
  security_answer_2: string;
  security_answer_3: string;
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector> &
  OwnProps &
  FormikState<RegisterFormData> &
  FormikHelpers<RegisterFormData> &
  FormikHandlers;

export default connector(
  withRouter(
    withFormik<Props, RegisterFormData>({
      mapPropsToValues(props: Props) {
        return {
          email: "",
          password: "",
          phone: "",
          address: "",
          dob: new Date(),
          photo: "",
          security_answer_1: "",
          security_answer_2: "",
          security_answer_3: ""
        };
      },
      validationSchema: yup.object().shape({
        email: yup.string().required("Email address is required"),
        password: yup.string().required("Password is required"),
        phone: yup.string().required("Phone number is required"),
        address: yup.string().required("Address is required"),
        photo: yup.string().required("Picture is required"),
        security_answer_1: yup.string().required("This field is required"),
        security_answer_2: yup.string().required("This field is required"),
        security_answer_3: yup.string().required("This field is required")
      }),
      async handleSubmit(values, { props, setSubmitting }) {
        try {
          await props.registerUser(values);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
      //@ts-ignore
    })(Register)
  )
);
