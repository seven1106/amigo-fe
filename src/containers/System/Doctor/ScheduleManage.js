import React, { Component } from "react";
import { connect } from "react-redux";
import "./ScheduleManage.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { bulkCreateScheduleApi } from "../../../services/userService";

class ScheduleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      listSchedules: [],
      selectedDoctor: null,
      currentDate: new Date(),
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllSchedules();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.dataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
        this.setState({
          rangeTime: data,
        });
      }
    }
  }
  dataInputSelect = (input) => {
    let data = [];
    if (input && input.length > 0) {
      input.map((item) => {
        let name = `${item.firstName} ${item.lastName}`;
        data.push({
          value: item.id,
          label: name,
        });
      });
      return data;
    }
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleChangeDate = async (date) => {
    this.setState({ currentDate: date[0] });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { selectedDoctor, currentDate, rangeTime } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Please select date");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Please select doctor");
      return;
    }
    let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let data = {
            doctorId: selectedDoctor.value,
            date: formattedDate,
            timeType: item.value_en,
          };
          result.push(data);
          return result;
        });
      } else {
        toast.error("Please select time");
        return;
      }
    }
    if (result && result.length > 0) {
      await bulkCreateScheduleApi(result);
      toast.success("Save schedule successfully");
    } else {
      toast.error("Save schedule failed");
    }
  };

  render() {
    let { rangeTime } = this.state;

    return (
      <React.Fragment>
        <div className="schedule-container">
          <div className="title">Manage Doctor's Examination Plan</div>

          <div className="schedule-body">
            <div className="container">
              <div className="row">
                <div className="col-6 form-group" style={{ zIndex: "10" }}>
                  <label>Doctor</label>
                  <Select
                    value={this.state.selectedDoctor}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctors}
                    placeholder="Select Doctor"
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Date</label>
                  <DatePicker
                    className="form-control"
                    onChange={this.handleChangeDate}
                    value={this.state.currentDate}
                    minDate={new Date()}
                  />
                </div>
                <div className="col-12 pick-hour-container">
                  <label>Time</label>
                  <div className="date">
                    {rangeTime && rangeTime.length > 0
                      ? rangeTime.map((item, index) => {
                          return (
                            <button
                              className={
                                item.isSelected === true
                                  ? "button active btn-outline-primary"
                                  : "button btn-outline-primary "
                              }
                              key={index}
                              onClick={() => this.handleClickBtnTime(item)}
                            >
                              {item.value_en}
                            </button>
                          );
                        })
                      : "Empty"}
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleSaveSchedule()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fetchAllDoctorStart()),
    getAllSchedules: () => dispatch(actions.fetchScheduleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
