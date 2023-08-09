import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import DetailDoctor from "../containers/Client/Doctor/DetailDoctor";
import DetailSpecialty from "../containers/Client/Specialty/DetailSpecialty";
import DetailClinic from "../containers/Client/Clinic/DetailClinic";
import Doctor from "../routes/Doctor";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import HomePage from "./HomePage/HomePage.js";
// import Login from '../routes/Login';
import Login from "./Auth/Login";
import Header from "./Header/Header";
import System from "../routes/System";
import VerifyBooking from "./Client/VerifyBooking";

import { CustomToastCloseButton } from "../components/CustomToast";
// import ConfirmModal from "../components/ConfirmModal";

import CustomScrollbars from "../components/CustomScrollbars";
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* <ConfirmModal /> */}

            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", wight: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/doctor"}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route path={path.VERIFY_BOOKING} component={VerifyBooking} />
                </Switch>
              </CustomScrollbars>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
