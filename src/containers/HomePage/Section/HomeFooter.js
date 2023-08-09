import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import fb from "../../../assets/slick-img/facebook-footer.svg";
class HomeFooter extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="homeFooter">
        <div className="footer">
          <p>
            &copy; 2023 Nguyen Thanh That.{" "}
            <a
              target="_blank"
              href="https://www.facebook.com/sevennguyen.1106/"
              rel="noreferrer"
            >
              <img src={fb} alt="fb" />
            </a>
          </p>
          <div className="px-3"> Dự án cá nhân.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
