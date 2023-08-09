import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { KeyCodeUtils } from "../../utils";

import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";
// import { divide } from "lodash";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }
  handleLogin = async () => {
    this.setState({ errMessage: "" });
    console.log(
      "username",
      this.state.username,
      "password",
      this.state.password
    );
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        if (data.user.roleId === "R1")
          this.props.navigate("/system/user-redux");
        if (data.user.roleId === "R2")
          this.props.navigate("/doctor/schedule-manage");
      }
    } catch (error) {
      console.log(error);
      this.setState({ errMessage: error.response.data.message });
    }
  };
  handlerKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      event.preventDefault();
      this.handleLogin();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handlerKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handlerKeyDown);
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 from-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your use name"
                value={this.state.username}
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
              />
            </div>
            <div className="col-12 from-group login-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
                <span
                  onClick={() =>
                    this.setState({ showPassword: !this.state.showPassword })
                  }
                >
                  <i
                    class={
                      this.state.showPassword
                        ? "fas fa-eye-slash"
                        : "fas fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 ">
              {this.state.errMessage ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errMessage}
                </div>
              ) : null}
            </div>
            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">Admin and Doctor only.</div>
            {/* <div className="col-12 login-with">
              <span>Or login with</span>
            </div>
            <div className="col-12 login-social">
              <a href="#" className="login-social-fb">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="login-social-gg">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="login-social-tt">
                <i className="fab fa-twitter"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
