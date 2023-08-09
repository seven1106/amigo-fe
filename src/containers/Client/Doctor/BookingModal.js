import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import { languages } from "../../../utils";
import Select from "react-select";
import { postBookAppointmentApi } from "../../../services/userService";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      reason: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      doctorName: "",
      clinicAddress: "",
      clinicName: "",
      loading: false,
    };
  }
  async componentDidMount() {
    this.props.getGenders();
  }
  dataGender = (input) => {
    let data = [];
    let language = this.props.language;
    if (input && input.length > 0) {
      input.map((item) => {
        let name = language === languages.VI ? item.value_vi : item.value_en;
        data.push({
          value: item.key,
          label: name,
        });
      });
      return data;
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.dataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.dataGender(this.props.genders),
      });
    }
    if (this.props.data !== prevProps.data) {
      if (this.props.data) {
        let doctorId = this.props.data.doctorId;
        let timeType = this.props.data.timeType;
        let doctorName = this.props.doctorName;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
          doctorName: doctorName,
        });
      }
    }
    if (this.props.dataClinic !== prevProps.dataClinic) {
      if (this.props.dataClinic) {
        let clinicName = this.props.dataClinic.nameClinic;
        let clinicAddress = this.props.dataClinic.addressClinic;
        this.setState({
          clinicName: clinicName,
          clinicAddress: clinicAddress,
        });
      }
    }
  }
  handleOnChange = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  z;
  handleOnChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  handleConfirmBooking = async () => {
    this.setState({
      loading: true,
    });
    let date = this.props.data.date;
    let res = await postBookAppointmentApi({
      doctorId: this.state.doctorId,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      reason: this.state.reason,
      fullName: this.state.fullName,
      date: date,
      selectedGender: this.state.selectedGender.label,
      timeType: this.state.timeType,
      doctorName: this.state.doctorName,
      clinicAddress: this.state.clinicAddress,
      clinicName: this.state.clinicName,
    });
    if (res && res.errCode === 0) {
      toast.success(<FormattedMessage id="booking-modal.booking-success" />);
      this.setState({
        loading: false,
      });
      this.props.closeModal();
    } else {
      toast.error(<FormattedMessage id="booking-modal.booking-fail" />);
      this.setState({
        loading: false,
      });
    }
  };

  toggle = () => {
    this.props.closeModal();
  };
  render() {
    let { doctorId } = "";
    if (!_.isEmpty(this.props.data)) {
      doctorId = this.props.data.doctorId;
    }
    return (
      console.log(this.state),
      (
        <>
          <LoadingOverlay active={this.state.loading} spinner text="Loading...">
            <Modal
              isOpen={this.props.isOpen}
              toggle={() => {
                this.toggle();
              }}
              className={"modal-user-container"}
              size="lg"
            >
              <ModalHeader
                toggle={() => {
                  this.toggle();
                }}
              >
                <span className="model-title ">
                  {" "}
                  <FormattedMessage id="booking-modal.book-schedule" />
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="container">
                  <div className="doctor-info">
                    <ProfileDoctor
                      doctorId={doctorId}
                      isShowDescription={false}
                      dataTime={this.props.data}
                    />
                  </div>
                  <div className="row mt-5">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            this.handleOnChange(e, "email");
                          }}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                          <FormattedMessage id="booking-modal.email-confirm" />
                        </small>
                      </div>
                      <div className="form-group py-2">
                        <label>
                          <FormattedMessage id="booking-modal.reason" />
                        </label>
                        <input
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={(e) => {
                            this.handleOnChange(e, "reason");
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <FormattedMessage id="booking-modal.gender" />
                        </label>

                        <Select
                          className="form-control"
                          value={this.state.selectedGender}
                          options={this.state.genders}
                          onChange={this.handleOnChangeSelect}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label>
                          <FormattedMessage id="booking-modal.fullname" />
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            this.handleOnChange(e, "fullName");
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FormattedMessage id="booking-modal.phone" />
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            this.handleOnChange(e, "phoneNumber");
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          <FormattedMessage id="booking-modal.address" />
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            this.handleOnChange(e, "address");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="btn px-2"
                  color="primary"
                  onClick={() => {
                    this.handleConfirmBooking();
                  }}
                >
                  <label>
                    <FormattedMessage id="booking-modal.booking" />
                  </label>
                </Button>
                <Button
                  className="btn-cancel px-2"
                  color="secondary"
                  onClick={() => {
                    this.toggle();
                  }}
                >
                  <label>
                    <FormattedMessage id="booking-modal.cancel" />
                  </label>
                </Button>
              </ModalFooter>
            </Modal>
          </LoadingOverlay>
        </>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
