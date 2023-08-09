import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      roleId: "",
    };
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleModal();
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "roleId",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
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
          <span className="model-title ">Create new user</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      this.setState({ firstName: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      this.setState({ lastName: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      this.setState({ phoneNumber: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      this.setState({ address: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Role</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                      this.setState({ roleId: e.target.value });
                      console.log("role", this.state.role);
                    }}
                  >
                    <option>Choose role...</option>
                    <option>Admin</option>
                    <option>Doctor</option>
                    <option>Patient</option>
                  </select>
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
              this.handleAddUser();
            }}
          >
            Add new
          </Button>{" "}
          {/* <Button
            className="btn-cancel px-2"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
