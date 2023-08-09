import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalDeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleModal();
  };
  handleDeleteUser = async () => {
    await this.props.deleteUser(this.props.userId);
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
          <span className="model-title ">Delete user</span>
        </ModalHeader>
        <ModalBody>Are you sure about that?</ModalBody>
        <ModalFooter>
          <Button
            className="btn px-2"
            color="primary"
            onClick={() => {
              this.handleDeleteUser();
            }}
          >
            Yes
          </Button>
          <Button
            className="btn-cancel px-2"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            No
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteUser);
