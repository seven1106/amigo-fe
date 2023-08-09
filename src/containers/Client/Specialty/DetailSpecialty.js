import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader/HomeHeader";
import { languages } from "../../../utils";
import "./DetailSpecialty.scss";
import {
  getDetailSpecialtyByIdApi,
  getExtraDoctorInfoByIdApi,
} from "../../../services/userService";
import HomeFooter from "../../HomePage/Section/HomeFooter";
import { FormattedMessage } from "react-intl";
import DoctorSchedule from "../../Client/Doctor/DoctorSchedule";
import ExtraInfoDoctor from "../../Client/Doctor/ExtraInfoDoctor";
import ProfileDoctor from "../../Client/Doctor/ProfileDoctor";
import LikeAndShare from "../Doctor/Social/LikeAndShare";
import Comment from "../Doctor/Social/Comment";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailSpecialty: {},
      isShowDetail: false,
      arrDoctors: [],
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      let res = await getDetailSpecialtyByIdApi(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({
          DetailSpecialty: res.data,
        });
      }
    }
    let resDoctors = await getExtraDoctorInfoByIdApi("ALL");
    let arrDr = [];
    if (resDoctors && resDoctors.errCode === 0) {
      for (let i = 0; i < resDoctors.data.length; i++) {
        if (resDoctors.data[i].specialtyId == this.props.match.params.id) {
          arrDr.push(resDoctors.data[i].doctorId);
        }
      }
      this.setState({
        arrDoctors: arrDr,
      });
    }
  }
  showHideDetail = (status) => {
    this.setState({
      isShowDetail: status,
    });
  };
  render() {
    let { DetailSpecialty, isShowDetail, arrDoctors } = this.state;
    let { language } = this.props;
    console.log("DetailSpecialty", arrDoctors);
    let name = ``;
    if (DetailSpecialty && DetailSpecialty.name) {
      name = `${DetailSpecialty.name}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-spec-container">
          <div className="detail-spec-body">
            <div className="intro-spec">
              <div className="description-spec">
                <div className="name-des">{name}</div>
                <div className="des-spec">
                  {DetailSpecialty &&
                    DetailSpecialty &&
                    DetailSpecialty.descriptionHTML && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DetailSpecialty.descriptionHTML,
                        }}
                      ></div>
                    )}
                </div>
              </div>
            </div>

            {isShowDetail === true && (
              <>
                <div className="intro-spec"></div>
                <div className="hide">
                  <span onClick={() => this.showHideDetail(false)}>
                    <FormattedMessage id="extra-info.hide" />
                  </span>
                </div>
              </>
            )}
            {isShowDetail === false && (
              <div className="show">
                <span onClick={() => this.showHideDetail(true)}>
                  <FormattedMessage id="extra-info.show" />
                </span>
              </div>
            )}
            <div className="detail-spec">
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  return (
                    <div className="doctor-content" key={index}>
                      <div className="content-left">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescription={true}
                        />
                      </div>
                      <div className="content-right">
                        <DoctorSchedule doctorId={item} />
                        <ExtraInfoDoctor doctorId={item} />
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="cmt-spec">
              <Comment />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
