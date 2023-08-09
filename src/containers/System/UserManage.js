import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUserApi,
  createNewUserApi,
  editUserApi,
  deleteUserApi,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalDeleteUser from "./ModalDeleteUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      listUsers: [],
      isOpenModal: false,
      isOpenModalDelete: false,
    };
  }
  async componentDidMount() {
    await this.getAllUsers();
  }
  getAllUsers = async () => {
    let response = await getAllUserApi("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          listUsers: response.userData,
        },
        () => {
          console.log(this.state.listUsers);
        }
      );
    }

    console.log(response);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserApi(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        this.setState({
          isOpenModal: false,
        });
        this.getAllUsers();
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = () => {};
  handleDeleteUser = (userId) => {
    this.setState({
      userId: userId,
      isOpenModalDelete: true,
    });
  };
  deleteUser = async (userId) => {
    try {
      let response = await deleteUserApi(userId);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        this.setState({
          isOpenModalDelete: false,
          userId: "",
        });
        this.getAllUsers();
      }
    } catch (e) {
      console.log(e);
    }
    console.log("delete user", userId);
  };

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  toggleModalDelete = () => {
    this.setState({
      isOpenModalDelete: !this.state.isOpenModalDelete,
    });
  };
  render() {
    let listUsers = this.state.listUsers;
    return (
        <div className="user-container">
          <ModalUser
            isOpen={this.state.isOpenModal}
            toggleModal={this.toggleModal}
            createNewUser={this.createNewUser}
          />
          <ModalDeleteUser
            isOpen={this.state.isOpenModalDelete}
            userId={this.state.userId}
            toggleModal={this.toggleModalDelete}
            deleteUser={this.deleteUser}
          />
          <div className="title text-center">Manage users</div>
          <div className="search-box px-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search user by email, first name, last name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary px-3"
                  type="button"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="add-new">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fas fa-plus ">
                <span> Add new user</span>
              </i>
            </button>
          </div>
          <div className="user-list">
            <table id="customers">
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {listUsers &&
                listUsers.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td className="action">
                        <button className="btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => this.handleDeleteUser(item.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
