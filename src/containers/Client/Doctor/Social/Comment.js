import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import "./Comment.scss";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  initFacebookSDK = () => {
    // wait for facebook sdk to initialize before starting the react app
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  async componentDidMount() {
    this.initFacebookSDK();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
    }
  }
  render() {
    let { width, dataHref, dataNumposts } = this.props;
    return (
      <>
        <div
          class="fb-comments"
          data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
          // data-href="window.location.origin + window.location.pathname"
          data-width={width ? width : "100%"}
          data-numposts={dataNumposts ? dataNumposts : 5}
        ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
