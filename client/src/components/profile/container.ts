import { connect, ConnectedProps } from "react-redux";
import { withRouter, RouteComponentProps, RouteProps } from "react-router-dom";
import { withFormik, FormikState, FormikHandlers, FormikHelpers } from "formik";
import * as yup from "yup";
import {
  getUser,
  updateUserProfile
} from "./../../store/actions/user/userAction";
import { AppState } from "../../store/types";

import Profile from "./Profile";

interface RouteParams {
  id: string;
}

type OwnProps = RouteComponentProps<RouteParams> & RouteProps;

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.user.loading,
    // @ts-ignore
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps) => {
  return {
    getProfile: () => {
      dispatch(getUser());
    },
    updateProfile: (credentials: any) => {
      dispatch(updateUserProfile(credentials))
        .then(() => {
          // ownProps.history.push("/profile");
          window.location.href = "/profile";
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
};

export type EditFormData = {
  photo: string;
  phone: string;
  address: string;
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector> &
  OwnProps &
  FormikState<EditFormData> &
  FormikHelpers<EditFormData> &
  FormikHandlers;

export default connector(
  withRouter(
    withFormik<Props, EditFormData>({
      enableReinitialize: true,
      mapPropsToValues(props: Props) {
        return {
          photo: props.user?.photo,
          phone: props.user?.phone,
          address: props.user?.address
        };
      },
      validationSchema: yup.object().shape({
        photo: yup.string().required("Photo is required"),
        phone: yup.string().required("Phone number is required"),
        address: yup.string().required("Address is required")
      }),
      async handleSubmit(values, { props, setSubmitting }) {
        try {
          // console.log(values);
          await props.updateProfile(values);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
      //@ts-ignore
    })(Profile)
  )
);
