import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import "./completeModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import { languages } from "../../../utils";
import Select from "react-select";
import { postBookAppointmentApi } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import imgDefault from "../../../assets/zxczxc.jpg";
class completeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      doctorId: "",
      clientName: "",
      clientId: "",
      sum: "",
      plan: "",
      medical: "",
      lifeStyle: "",
      appointments: "",
      imageBase64: "",
    };
  }
  async componentDidMount() {
    let imageBlob = await fetch(imgDefault).then((res) => res.blob());
    let reader = new FileReader();

    reader.onload = () => {
      this.setState({
        imageBase64: reader.result,
      });
    };

    reader.onerror = (error) => {
      console.error("Error reading image:", error);
    };

    reader.readAsDataURL(imageBlob);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      if (this.props.data) {
        let doctorId = this.props.data.doctorId;
        let email = this.props.data.client.email;
        let clientName = this.props.data.client.firstName;
        let clientId = this.props.data.clientId;
        this.setState({
          doctorId: doctorId,
          email: email,
          clientName: clientName,
          clientId: clientId,
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

  handleComplete = () => {
    this.props.handleComplete(this.state);
  };
  handleOnChangeImg = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64Image(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  toggle = () => {
    this.props.closeModal();
  };
  render() {
    return (
      console.log(this.props),
      console.log(this.state),
      (
        <>
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
              <span className="model-title "> Complete Appointment</span>
            </ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row mt-5">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Summary of Examination:
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => {
                          this.handleOnChange(e, "sum");
                        }}
                      />
                    </div>
                    <div className="form-group py-2">
                      <label>Treatment Plan*:</label>
                      <input
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => {
                          this.handleOnChange(e, "plan");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Follow-up Appointments*:</label>

                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => {
                          this.handleOnChange(e, "appointments");
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Lifestyle Recommendations*:</label>

                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => {
                          this.handleOnChange(e, "lifeStyle");
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Medication Instructions*:</label>

                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => {
                          this.handleOnChange(e, "medical");
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>image*</label>

                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        onChange={(event) => {
                          this.handleOnChangeImg(event);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h6>*Can be empty</h6>
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn px-2"
                color="primary"
                onClick={() => {
                  this.handleComplete();
                }}
              >
                <label>Complete and send</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(completeModal);
