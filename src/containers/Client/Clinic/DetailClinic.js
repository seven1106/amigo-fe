import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader/HomeHeader";
import { languages } from "../../../utils";
import "./DetailClinic.scss";
import { getDetailClinicByIdApi } from "../../../services/userService";
import HomeFooter from "../../HomePage/Section/HomeFooter";
import LikeAndShare from "../Doctor/Social/LikeAndShare";
import Comment from "../Doctor/Social/Comment";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailClinic: {},
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      let res = await getDetailClinicByIdApi(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({
          DetailClinic: res.data,
        });
      }
    }
  }
  render() {
    let { DetailClinic } = this.state;
    let { language } = this.props;
    console.log("DetailClinic", DetailClinic);

    let img64 =
      DetailClinic && DetailClinic.image
        ? new Buffer(this.state.DetailClinic.image, "base64").toString("binary")
        : "";
    let name = `${DetailClinic.name}`;
    if (DetailClinic && DetailClinic.name) {
      name = `${DetailClinic.name}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-des-container">
          <div className="detail-des-body">
            <div
              className="intro-des"
              style={{
                backgroundImage: `url(${img64})`,
                width: "100%",
                marginRight: "15px",
                marginBottom: "15px",
              }}
            >
              <div className="content-right-des">
                <div className="name-des pb-3">{name}</div>
              <LikeAndShare />

                <div className="specialty-des">
                  {
                    DetailClinic &&
                    DetailClinic.description ?
                    DetailClinic.description : ""}
                </div>
              </div>
            </div>
            
            <div className="detail-des">
              {DetailClinic && DetailClinic && DetailClinic.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DetailClinic.contentHTML,
                  }}
                ></div>
              )}
            </div>
            <div className="cmt-des"><Comment/></div>
          </div>
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
