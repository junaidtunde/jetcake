import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Field } from "formik";

import style from "./Login.module.scss";

import { Props } from "./container";

type State = {
  email: string;
};

export class Login extends Component<Props, State> {
  state = {
    email: ""
  };

  render() {
    const { errors, touched, isSubmitting } = this.props;

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
                  <h3 className="text-center">Sign In</h3>
                  <hr />
                  <Form className="mt-4">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
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
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
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

                    <small className="mt-4">
                      Don't have an account?
                      <Link to="/register">register</Link>
                    </small>

                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-button"
                        disabled={isSubmitting}
                      >
                        Login
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
          <div className={`col-0 col-md-6 ${style.right_bg}`}></div>
        </div>
      </div>
    );
  }
}

export default Login;
