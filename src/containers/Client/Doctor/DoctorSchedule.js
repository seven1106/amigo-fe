import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../../utils";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByIdApi } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenBookingModal: false,
      dataBookingModal: {},
      doctorName: "",
    };
  }
  async componentDidMount() {
    
    let allDay = this.SetArrDays(this.props.language);
    let res = await getScheduleDoctorByIdApi(
      this.props.doctorId,
      allDay[0].value
    );

    this.setState({
      allAvailableTime: res.data || [],
      doctorName: this.props.doctorName,
    });
  
    let { language } = this.props;
    this.SetArrDays(language);
    let allDays = this.SetArrDays(language);
    this.setState({
      allDays: allDays,
    });
  }
  SetArrDays = (language) => {
    let arrDays = [];
    for (let i = 0; i < 7; i++) {
      let day = {};
      if (i === 0) {
        let ddMM = moment()
          .locale(language === languages.VI ? "vi" : "en")
          .format("DD/MM");
        let today =
          languages === languages.VI ? `Hôm nay - ${ddMM}` : `Today - ${ddMM}`;
        day.label = today;
        let date = moment().add(i, "days").startOf("day");
        let formattedDate = date.format("DD/MM/YYYY");
        day.value = formattedDate;

        arrDays.push(day);
        continue;
      } else {
        day.label = moment()
          .add(i, "days")
          .locale(language === languages.VI ? "vi" : "en")
          .format("ddd - DD/MM");
        let date = moment().add(i, "days").startOf("day");
        let formattedDate = date.format("DD/MM/YYYY");
        day.value = formattedDate;
        arrDays.push(day);
      }
    }
    return arrDays;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.SetArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let allDays = this.SetArrDays(this.props.language);
      let res = await getScheduleDoctorByIdApi(
        this.props.doctorId,
        allDays[0].value
      );

      this.setState({
        allAvailableTime: res.data || [],
        doctorName: this.props.doctorName,
      });
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorId && this.props.doctorId !== -1) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      let res = await getScheduleDoctorByIdApi(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data || [],
        });
      }
    }
  };
  handleClickSchedule = (item) => {
    this.setState({
      isOpenBookingModal: true,
      dataBookingModal: item,
    });
  };
  closeModal = () => {
    this.setState({
      isOpenBookingModal: false,
    });
  };

  render() {
    let { allDays, allAvailableTime, isOpenBookingModal, dataBookingModal } =
      this.state;
    console.log("allAvailableTime", this.props);
    return (
      <>
        <div className="detail-doctor-container">
          <div className="detail-doctor-body">
            <div className="all-schedule">
              <select
                className="select-day"
                onChange={(event) => this.handleOnChangeSelect(event)}
              >
                {allDays &&
                  allDays.length > 0 &&
                  allDays.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="all-available-time">
              <div className="time-title">
                <i class="fa fa-calendar">
                  <span>
                    <FormattedMessage id="detail-dr.schedule" />
                  </span>
                </i>
              </div>

              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map(
                  (item, index) => {
                    let time = item.timeType;
                    return (
                      <button
                        key={index}
                        className="btn-time"
                        onClick={() =>this.handleClickSchedule(item)}
                      >
                        {time}
                      </button>
                    );
                  },
                  <div className="book-free">
                    <FormattedMessage id="detail-dr.choose" />
                    <i className="hand-icon fa fa-hand-point-up"></i>
                    <FormattedMessage id="detail-dr.book-now" />
                  </div>
                )
              ) : (
                <div className="no-time">
                  <FormattedMessage id="detail-dr.no-schedule" />
                </div>
              )}
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <div className="book-free">
                  <FormattedMessage id="detail-dr.choose" />
                  <i className="hand-icon fa fa-hand-point-up"></i>
                  <FormattedMessage id="detail-dr.book-now" />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <BookingModal
          isOpen={isOpenBookingModal}
          data={dataBookingModal}
          doctorName={this.state.doctorName}
          closeModal={this.closeModal}
          dataClinic={this.props.dataClinic}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
