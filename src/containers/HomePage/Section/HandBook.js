import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";

import Slider from "react-slick";

class HandBook extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="section-share handBook">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Cẩm nang</span>
            <button className="section-button">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item">
                <div className="bg-image handBook" />
                <div className="item-title">Cẩm nang 1</div>
              </div>
              <div className="section-item">
                <div className="bg-image handBook" />
                <div className="item-title">Cẩm nang 2</div>
              </div>
              <div className="section-item">
                <div className="bg-image handBook" />
                <div className="item-title">Cẩm nang 3</div>
              </div>
              <div className="section-item">
                <div className="bg-image handBook" />
                <div className="item-title">Cẩm nang 4</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
