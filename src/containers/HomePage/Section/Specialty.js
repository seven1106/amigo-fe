import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { getAllSpecialtyApi } from "../../../services/userService";
import { withRouter } from "react-router-dom/cjs/react-router-dom";

import Slider from "react-slick";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialty: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      this.setState({
        arrSpecialty: this.props.listSpecialty,
      });
    }
  }
  async componentDidMount() {
    let res = await getAllSpecialtyApi();
    if (res && res.errCode === 0) {
      this.setState({
        arrSpecialty: res.data || [],
      });
    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };

  render() {
    let arrSpecialty = this.state.arrSpecialty;
    let { language } = this.props;
    console.log("arrSpecialty", arrSpecialty);
    return (
      <div className="section-share specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              {" "}
              <FormattedMessage id="specialty" />
            </span>
            <button className="section-button">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrSpecialty &&
                arrSpecialty.length > 0 &&
                arrSpecialty.map((item, index) => {
                  let name = `${item.name}`;
                  return (
                    <div
                      className="section-item"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div className="specialty-border">
                        <div className="specialty-img">
                          <div
                            className="bg-image specialty"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        </div>

                        <div className="info-specialty">
                          <div className="specialty-title">{name}</div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
