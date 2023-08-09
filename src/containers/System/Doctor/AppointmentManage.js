import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./AppointmentManage.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAppointmentByDateApi } from "../../../services/userService";
import moment from "moment";
import { toast } from "react-toastify";
import { completeAppointmentApi } from "../../../services/userService";
import CompleteModal from "./completeModal";
import LoadingOverLay from "react-loading-overlay";

class AppointmentManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment().format("DD/MM/YYYY"),
      dataAppoint: [],
      loading: false,
      isOpenModal: false,
      dataComplete: {},
    };
  }
  async componentDidMount() {
    this.getAppointmentByDate();
  }
  getAppointmentByDate = async () => {
    let user = this.props.user.id;
    let currentDate = this.state.currentDate;
    let res = await getAppointmentByDateApi(user, currentDate);
    if (res && res.errCode === 0) {
      this.setState({
        dataAppoint: res.data,
      });
    }
  };
  handleOnChangeDate = (date) => {
    this.setState(
      {
        currentDate: moment(date[0]).format("DD/MM/YYYY"),
      },
      () => {
        this.getAppointmentByDate();
      }
    );
  };
  handleCompleteAppointment = (item) => {
    this.setState({
      isOpenModal: true,
      dataComplete: item,
    });
  };
  handleComplete = async (data) => {
    this.setState({
      loading: true,
    });
    let res = await completeAppointmentApi(data, "SEND");
    if (res && res.errCode === 0) {
      toast.success("Completed appointment");
      this.setState({
        loading: false,
        isOpenModal: false,
      });
      this.getAppointmentByDate();
    } else {
      toast.error("Complete appointment fail");
      this.setState({
        loading: false,
        isOpenModal: false,
      });
    }
  };
  handleCompleted = async (item) => {
    let res = await completeAppointmentApi({
      doctorId: this.props.user.id,
      clientId: item.clientId,
    });
    if (res && res.errCode === 0) {
      toast.success("Completed appointment");

      this.getAppointmentByDate();
    } else {
      toast.error("Complete appointment fail");
    }
  };
  closeModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  render() {
    let data = this.state.dataAppoint;
    console.log(this.state);
    return (
      <>
        <LoadingOverLay active={this.state.loading} spinner text="Loading...">
          <div className="user-container">
            <div className="title text-center py-3">Manage Appointment</div>
            <div className="col-4 form-group px-5 pt-4">
              <label className="label">Select date</label>
              <DatePicker
                onChange={this.handleOnChangeDate}
                value={this.state.currentDate}
                className="form-control"
              />
            </div>
            <div className="user-list">
              <table id="customers">
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Address</th>
                  <th></th>
                </tr>
                {data &&
                  data.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.client.email}</td>
                        <td>{item.client.firstName}</td>
                        <td>{item.timeType}</td>
                        <td>{item.client.address}</td>
                        <td className="action">
                          <button
                            className="btn"
                            onClick={() => this.handleCompleteAppointment(item)}
                          >
                            Send email
                          </button>
                          <button
                            className="btn"
                            onClick={() => this.handleCompleted(item)}
                          >
                            Confirm
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
          <CompleteModal
            isOpen={this.state.isOpenModal}
            data={this.state.dataComplete}
            closeModal={this.closeModal}
            handleComplete={this.handleComplete}
          />
        </LoadingOverLay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentManage);
