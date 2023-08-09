import React, { Component } from "react";
import { connect } from "react-redux";

import HomeHeader from "./HomeHeader/HomeHeader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Specialty from "./Section/Specialty";
import Clinic from "./Section/Clinic";
import OutstandDoctor from "./Section/OutstandDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./Section/HomeFooter";
import "./HomePage.scss";

class HomePage extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 6000,
    };
    return (
      <div className="home-page-container">
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <Clinic settings={settings} />
        <OutstandDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
