import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import truyenthong from "../../../assets/truyenthong-about.png";
import Slider from "react-slick";

class About extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="section-share about">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              Truyền thông nói về HealthCare
            </span>
          </div>
          <div className="section-body">
            <div className="about-left">
              <iframe
                width="100%"
                height="321px"
                src="https://www.youtube.com/embed/jh5U5BnpGN8"
                title="The Future of Healthcare"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="about-right">
              <a
                target="_blank"
                href="https://www.mirarehab.com/blog/what-will-the-future-of-healthcare-look-like/"
                rel="noreferrer"
              >
                <img src={truyenthong} alt="truyenthong" />
              </a>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
