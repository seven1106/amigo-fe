import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  handleLogin = () => {
    if (this.props.history) {
      this.props.history.push("/login");
    }
  };
  render() {
    let language = this.props.language;

    return (
      <React.Fragment>
        <div className="homeHeader-container">
          <div className="homeHeader-content">
            <div className="left-content py-2">
              <div className="login" onClick={() => this.handleLogin()}>
                <i className="fas fa-sign-in-alt"></i>
              </div>
              <div
                className="header-logo"
                onClick={() => this.returnHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.heatlh-clinic" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.package" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.health-care" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="search">
                <input type="text" placeholder="Tìm kiếm..." />
                <button className="btn-search" type="button">
                  <i className="fas fa-search "></i>
                </button>
              </div>
              <div className="language">
                <div
                  className={
                    language === languages.VI
                      ? "language-vn active"
                      : "language-vn"
                  }
                >
                  <span onClick={() => this.changeLanguage(languages.VI)}>
                    VN{" "}
                  </span>
                </div>
                <div
                  className={
                    language === languages.EN
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span onClick={() => this.changeLanguage(languages.EN)}>
                    EN{" "}
                  </span>
                </div>
              </div>
              <div className="support">
                <div className="support-item">
                  <i className="fas fa-question-circle mr-3">
                    <FormattedMessage id="homeHeader.support" />
                  </i>
                  <div className="support-title">0329399087</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="homeHeader-banner">
            <div className="content-top">
              <div className="banner-content1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="banner-content2">
                <FormattedMessage id="banner.title2" />
              </div>
            </div>
            <div className="content-bot">
              <div className="option">
                <div className="option-content">
                  <div className="option-item">
                    <div className="option-item-img1"></div>
                  </div>
                  <div className="option-title">
                    <FormattedMessage id="banner.option1" />
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="option-content">
                  <div className="option-item">
                    <div className="option-item-img2"></div>
                  </div>

                  <div className="option-title">
                    <FormattedMessage id="banner.option2" />
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="option-content">
                  <div className="option-item">
                    <div className="option-item-img3"></div>
                  </div>

                  <div className="option-title">
                    <FormattedMessage id="banner.option3" />
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="option-content">
                  <div className="option-item">
                    <div className="option-item-img4"></div>
                  </div>

                  <div className="option-title">
                    <FormattedMessage id="banner.option4" />
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="option-content">
                  <div className="option-item">
                    <div className="option-item-img5"></div>
                  </div>

                  <div className="option-title">
                    <FormattedMessage id="banner.option5" />
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="option-content">
                  <div className="option-item">
                    <div className="option-item-img6"></div>
                  </div>

                  <div className="option-title">
                    <FormattedMessage id="banner.option6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
