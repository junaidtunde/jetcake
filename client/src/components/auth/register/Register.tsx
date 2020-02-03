import React, { Component, ChangeEvent } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toastr from "../../../assets/toast";

import style from "./Register.module.scss";

import { Props } from "./container";

type State = {
  picture: string;
  img_loading: boolean;
  no_upload: boolean;
};

const DatePickerField = ({ name, value, onChange }: any) => {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};

export class Register extends Component<Props, State> {
  state = {
    picture: "",
    img_loading: false,
    no_upload: true
  };

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
    const { values, errors, touched, isSubmitting, setFieldValue } = this.props;

    if (this.props.user) {
      return <Redirect to="/profile"></Redirect>;
    }
    return (
      <div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className={`${style.contain}`}>
              <div className={`${style.card}`}>
                <div className="card-body pb-10">
                  <h4 className="text-center">Register</h4>
                  <Form className="mt-4">
                    <div className="form-group">
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                      />
                      <small style={{ color: "red" }}>
                        {touched.email && errors.email ? (
                          <p>{errors.email}</p>
                        ) : null}
                      </small>
                    </div>

                    <div className="form-group">
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                      <small style={{ color: "red" }}>
                        {touched.password && errors.password ? (
                          <p>{errors.password}</p>
                        ) : null}
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                      />
                      <small style={{ color: "red" }}>
                        {touched.phone && errors.phone ? (
                          <p>{errors.phone}</p>
                        ) : null}
                      </small>
                    </div>

                    <div className="form-group">
                      <Field
                        name="address"
                        id="address"
                        component="textarea"
                        rows="6"
                        className="form-control"
                        placeholder="Address"
                      />
                      <small style={{ color: "red" }}>
                        {touched.address && errors.address ? (
                          <p>{errors.address}</p>
                        ) : null}
                      </small>
                    </div>

                    <div className="form-group">
                      <Field
                        type="text"
                        className="form-control"
                        id="security_answer_1"
                        name="security_answer_1"
                        placeholder="What's your favorite color"
                      />
                      <small style={{ color: "red" }}>
                        {touched.security_answer_1 &&
                        errors.security_answer_1 ? (
                          <p>{errors.security_answer_1}</p>
                        ) : null}
                      </small>
                    </div>

                    <div className="form-group">
                      <Field
                        type="text"
                        className="form-control"
                        id="security_answer_2"
                        name="security_answer_2"
                        placeholder="What's your favorite food"
                      />
                      <small style={{ color: "red" }}>
                        {touched.security_answer_2 &&
                        errors.security_answer_2 ? (
                          <p>{errors.security_answer_2}</p>
                        ) : null}
                      </small>
                    </div>

                    <div className="form-group">
                      <Field
                        type="text"
                        className="form-control"
                        id="security_answer_3"
                        name="security_answer_3"
                        placeholder="What's your favorite animal"
                      />
                      <small style={{ color: "red" }}>
                        {touched.security_answer_3 &&
                        errors.security_answer_3 ? (
                          <p>{errors.security_answer_3}</p>
                        ) : null}
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="dob" style={{ marginRight: "10px" }}>
                        Date of birth:{" "}
                      </label>
                      <DatePickerField
                        name="dob"
                        value={values.dob}
                        onChange={setFieldValue}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="picture">Upload Profile Picture</label>
                      <div></div>
                      <input
                        type="file"
                        name="picture"
                        id="picture"
                        accept="image/*"
                        onChange={this.fileChangeHandler}
                      />
                      {this.state.picture ? (
                        <div>
                          <img
                            src={this.state.picture}
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
                        {this.state.no_upload && errors.photo ? (
                          <p>Profile picture is reequired</p>
                        ) : null}
                      </small>
                    </div>

                    <small className="mt-4">
                      Already have an account?
                      <Link to="/login">login</Link>
                    </small>

                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-button"
                        disabled={isSubmitting}
                      >
                        Register
                        {this.props.loading ? (
                          <div
                            className="ml-4 spinner-border spinner-border-sm"
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

          <div className={`col-0 col-md-6 ${style.right_bg}`}></div>
        </div>
      </div>
    );
  }
}

export default Register;
