import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./VerifyBooking.scss";
import HomeHeader from "../HomePage/HomeHeader/HomeHeader";
import {postVerifyBookingApi} from "../../services/userService";


class VerifyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let params = new URLSearchParams(this.props.location.search);
      let token = params.get("token");
      let doctorId = params.get("doctorId");
      let res = await postVerifyBookingApi({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          isVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          isVerify: true,
          errCode: res.errCode || -1,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
    }
  }
  render() {
    let { isVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader/>
            <div className="verify-booking-container">
          {isVerify && errCode === 0 && (
            <div className="verify-booking-success py-5">
                        <div className="title" style={{color: "green"}} >
                <FormattedMessage id="verifyBookingSuccess" />
              </div>
            </div>
          )}
          {isVerify && errCode !== 0 && (
            <div className="verify-booking-fail py-5">
                        <div className="title" style={{color: "green"}}>
                <FormattedMessage id="verifyBookingFail" />
              </div>
            </div>
          )}
        </div>

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
