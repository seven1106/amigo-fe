import React, { Component } from "react";
import { connect } from "react-redux";
import "./Clinic.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { getAllClinicApi } from "../../../services/userService";
import { withRouter } from "react-router-dom/cjs/react-router-dom";

import Slider from "react-slick";

class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinic: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listClinic !== this.props.listClinic) {
      this.setState({
        arrClinic: this.props.listClinic,
      });
    }
  }
  async componentDidMount() {
    let res = await getAllClinicApi();
    if (res && res.errCode === 0) {
      this.setState({
        arrClinic: res.data || [],
      });
    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };

  render() {
    let arrClinic = this.state.arrClinic;
    let { language } = this.props;
    console.log("arrClinic", arrClinic);
    return (
      <div className="section-share clinic">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="clinic" />
            </span>
            <button className="section-button">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrClinic &&
                arrClinic.length > 0 &&
                arrClinic.map((item, index) => {
                  let name = `${item.name}`;
                  return (
                    <div
                      className="section-item"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div className="clinic-border">
                        <div className="clinic-img">
                          <div
                            className="bg-image clinic"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        </div>

                        <div className="info-clinic">
                          <div className="clinic-title">{name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
