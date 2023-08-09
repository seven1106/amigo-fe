import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader/HomeHeader";
import { languages } from "../../../utils";
import "./DetailDoctor.scss";
import { getDetailInforDoctorApi } from "../../../services/userService";
import HomeFooter from "../../HomePage/Section/HomeFooter";
import DoctorSchedule from "./DoctorSchedule";
import ExtraInfoDoctor from "./ExtraInfoDoctor";
import LikeAndShare from "./Social/LikeAndShare";
import Comment from "./Social/Comment";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      let res = await getDetailInforDoctorApi(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    console.log("detailDoctor", detailDoctor);

    let img64 =
      detailDoctor && detailDoctor.image ? this.state.detailDoctor.image : "";
    let vi = "";
    let en = "";
    if (detailDoctor && detailDoctor.positionData) {
      vi = `${detailDoctor.positionData.value_vi} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      en = `${detailDoctor.positionData.value_en} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    let currentURL =process.env.REACT_APP_IS_LOCALHOST === "true" ? window.location.href : window.location.origin + window.location.pathname;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-doctor-container">
          <div className="detail-doctor-body">
            <div className="intro-dr ac">
              <div
                className="content-left-dr"
                style={{
                  backgroundImage: `url(${img64})`,
                  width: "100px",
                  height: "100px",
                  marginRight: "15px",
                  marginBottom: "15px",
                }}
              ></div>
              <div className="content-right-dr">
                <div className="name-dr">
                  {language === languages.VI ? vi : en}
                </div>
                <div className="specialty-dr">
                  {detailDoctor &&
                    detailDoctor.markdown &&
                    detailDoctor.markdown.description && (
                      <span>{detailDoctor.markdown.description}</span>
                    )}
                </div>
                <div className="like-share-dr pt-2">
                  <LikeAndShare
                    dataHref={currentURL}
                  />
                </div>
              </div>
            </div>
            <div className="schedule-dr">
              <div className="content-left">
                <DoctorSchedule
                  doctorId={
                    detailDoctor.id && detailDoctor.id ? detailDoctor.id : -1
                  }
                  doctorName={
                    detailDoctor.firstName && detailDoctor.lastName
                      ? `${detailDoctor.firstName} ${detailDoctor.lastName}`
                      : ""
                  }
                  dataClinic={detailDoctor.detailDoctor}
                />
              </div>
              <div className="content-right">
                <ExtraInfoDoctor
                  doctorId={
                    detailDoctor.id && detailDoctor.id ? detailDoctor.id : -1
                  }
                />
              </div>
            </div>
            <div className="detail-dr">
              {detailDoctor &&
                detailDoctor.markdown &&
                detailDoctor.markdown.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.markdown.contentHTML,
                    }}
                  ></div>
                )}
            </div>
            <div className="cmt-dr">
              <Comment
                dataHref={currentURL}
                width="100%"
              />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
