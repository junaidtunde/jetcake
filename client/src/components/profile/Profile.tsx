import React, { Component, ChangeEvent } from "react";
import { Redirect } from "react-router-dom";
import * as moment from "moment";
import { Form, Field } from "formik";
import axios from "axios";
import toastr from "../../assets/toast";
import Nav from "./../nav";
import Footer from "./../footer";

import style from "./Profile.module.scss";

import { Props } from "./container";

type State = {
  auth: string | null;
  picture: string;
  img_loading: boolean;
  no_upload: boolean;
};

export class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      auth: localStorage.getItem("payld_token"),
      picture: "",
      img_loading: false,
      no_upload: true
    };

    const { user } = this.props;
    !user && this.props.getProfile();

    this.fileChangeHandler = this.fileChangeHandler.bind(this);
  }

  fileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      img_loading: true,
      no_upload: false
    });
    axios
      //@ts-ignore
      .post("https://api.imgur.com/3/image", event.target.files[0], {
        headers: {
          Authorization: "Client-ID 37ff737c01775cd"
        }
      })
      .then(res => {
        // console.log(res)
        this.setState({
          picture: res.data.data.link
        });
        this.props.values.photo = res.data.data.link;
        toastr.showSuccessToast("The image has been upload successfully");
        this.setState({
          img_loading: false,
          no_upload: false
        });
      })
      .catch(err => {
        console.log(err);
        toastr.showDangerToast("An error occured while uploading the image");
        this.setState({
          img_loading: false,
          no_upload: true
        });
      });
  };

  render() {
    const { values, user, errors, touched, isSubmitting } = this.props;

    if (!this.state.auth) {
      return <Redirect to="/login"></Redirect>;
    }

    if (!user) {
      return (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      );
    }
    // @ts-ignore
    user.dob = moment(user.dob).format("MMMM D, YYYY");

    return (
      <div>
        <Nav />

        <main className={`${style.profile}`}>
          <div className="container">
            <div className={`${style.profile_card}`}>
              <div className={`${style.profile_img}`}>
                <img src={user.photo} alt="user profile" />
              </div>

              <div className={`${style.profile_details}`}>
                <div className={`${style.edit_btn_flex}`}>
                  <button
                    className={`btn btn-secondary ${style.edit_btn}`}
                    data-toggle="modal"
                    data-target="#editModal"
                  >
                    Edit Profile
                  </button>
                </div>

                <p className={`${style.profile_intro}`}>
                  Today’s businesses know the value of user data. You don’t have
                  to track your users where ever they go, just understanding
                  their behavior on your website will help you easily create a
                  personalized recommendation.
                </p>

                <hr />

                <h5 className={`${style.profile_header}`}>Basic Information</h5>

                <p>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  <span>{user.dob}</span>
                </p>

                <hr />

                <h5 className={`${style.profile_header}`}>
                  Contact Information
                </h5>

                <p>
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>{user.email}</span>
                </p>

                <p>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>{user.phone}</span>
                </p>

                <p>
                  <i className="fa fa-home" aria-hidden="true"></i>
                  <span>{user.address}</span>
                </p>

                <hr />

                <h5 className={`${style.profile_header}`}>
                  Security Information
                  <i
                    className="fa fa-lock"
                    style={{ marginLeft: "10px", color: "#00B2E0" }}
                    aria-hidden="true"
                  ></i>
                </h5>

                <p>
                  <span>What is your favorite color: </span>
                  <span>{user.security_answer_1}</span>
                </p>

                <p>
                  <span>What is your favorite food: </span>
                  <span>{user.security_answer_2}</span>
                </p>

                <p>
                  <span>What is your favorite animal: </span>
                  <span>{user.security_answer_3}</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        <div
          className="modal fade"
          id="editModal"
          role="dialog"
          aria-labelledby="editModalTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Edit Profile
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <Form className="mt-4">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <Field
                      type="number"
                      className="form-control"
                      id="phone"
                      name="phone"
                      // placeholder={user.phone}
                      value={values.phone || ""}
                    />
                    <small style={{ color: "red" }}>
                      {touched.phone && errors.phone ? (
                        <p>{errors.phone}</p>
                      ) : null}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <Field
                      component="textarea"
                      rows={3}
                      className="form-control"
                      id="address"
                      name="address"
                      // placeholder={user.address}
                      value={values.address || ""}
                    />
                    <small style={{ color: "red" }}>
                      {touched.address && errors.address ? (
                        <p>{errors.address}</p>
                      ) : null}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="picture">Upload New Profile Picture</label>
                    <div></div>
                    <input
                      type="file"
                      name="picture"
                      id="picture"
                      accept="image/*"
                      onChange={this.fileChangeHandler}
                    />
                    {user.photo ? (
                      <div>
                        <img
                          src={
                            this.state.picture ? this.state.picture : user.photo
                          }
                          alt=""
                          className={style.uploaded_img}
                        />
                      </div>
                    ) : (
                      <div>
                        {this.state.img_loading ? (
                          <div>
                            <div className={style.loading_box}>
                              <div
                                className={`spinner-border spinner-border-md`}
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                    <small style={{ color: "red" }}>
                      {errors.photo ? (
                        <p>Profile picture is reequired</p>
                      ) : null}
                    </small>
                  </div>

                  <div className="text-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-button"
                      disabled={isSubmitting}
                    >
                      Edit Profile
                      {this.props.loading ? (
                        <div
                          className="ml-3 spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : null}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Profile;
