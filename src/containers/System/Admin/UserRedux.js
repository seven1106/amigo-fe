import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import TableManageUser from "./TableManageUser";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils/";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      avatarUrl: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      userEdit: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "",
        position: "",
        role: "",
        action: CRUD_ACTIONS.CREATE,
        avatarUrl: "",
      });
    }
  }
  handleOnChangeImg = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64Image(file);
      let objUrl = URL.createObjectURL(file);
      this.setState({
        avatarUrl: objUrl,
        avatar: base64,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveUser = async () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      await this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        position: this.state.position,
        roleId: this.state.role,
        avatar: this.state.avatar,
      });
    } else if (action === CRUD_ACTIONS.EDIT) {
      await this.props.editUser({
        id: this.state.userEdit,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        position: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };
  handleEditUser = (user) => {
    let imgBase64 = "";
    if (user.image) {
      imgBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      userEdit: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      role: user.roleId,
      gender: user.gender,
      position: user.position,
      avatar: imgBase64,
      avatarUrl: imgBase64,
      action: CRUD_ACTIONS.EDIT,
    });
  };
  render() {
    console.log("user-redux", this.state);
    let genders = this.state.genderArr;
    let loadingGender = this.state.loadingGender;
    let roles = this.state.roleArr;
    let loadingRole = this.state.loadingRole;
    let positions = this.state.positionArr;
    let loadingPosition = this.state.loadingPosition;
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      position,
      role,
    } = this.state;
    return (
      <div className="userRedux-container">
        <div className="title">Manage products</div>
        <div className="userRedux-body">
          <div className="container">
            <div className="row">
              <form class="row g-3 needs-validation" novalidate>
                <div class="col-md-6">
                  <label for="validationCustom" class="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom"
                    value={firstName}
                    onChange={(event) => {
                      this.onChangeInput(event, "firstName");
                    }}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom" class="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom"
                    value={lastName}
                    onChange={(event) => {
                      this.onChangeInput(event, "lastName");
                    }}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustomUsername" class="form-label">
                    Phone number
                  </label>
                  <div class="input-group has-validation">
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      value={phoneNumber}
                      onChange={(event) => {
                        this.onChangeInput(event, "phoneNumber");
                      }}
                      required
                    />
                    <div class="invalid-feedback">Please provide a valid.</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom"
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                    required
                  />
                  <div class="invalid-feedback">Please provide a address.</div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="validationCustom"
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                    }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    required
                  />
                  <div class="invalid-feedback">Please provide a email.</div>
                </div>

                <div class="col-md-3">
                  <label for="validationCustom" class="form-label">
                    Position
                  </label>
                  <select
                    class="form-select"
                    id="validationCustom"
                    value={position}
                    onChange={(event) => {
                      this.onChangeInput(event, "position");
                    }}
                    required
                  >
                    <option selected disabled value="">
                      {loadingPosition === true
                        ? "Loading..."
                        : "Choose position..."}
                    </option>
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {item.value_en}
                          </option>
                        );
                      })}
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid position.
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="validationCustom" class="form-label">
                    Role
                  </label>
                  <select
                    class="form-select"
                    id="validationCustom"
                    value={role}
                    onChange={(event) => {
                      this.onChangeInput(event, "role");
                    }}
                    required
                  >
                    <option selected disabled value="">
                      {loadingRole === true ? "Loading..." : "Choose Role..."}
                    </option>
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {item.value_en}
                          </option>
                        );
                      })}
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid role.
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="inputPassword6"
                    class="form-control"
                    aria-labelledby="passwordHelpInline"
                    placeholder="Must be 8-20 characters long"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event, "password");
                    }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                    required
                  />
                  <div class="invalid-feedback">Please provide a Password.</div>
                </div>
                <div class="col-md-3">
                  <label for="validationCustom" class="form-label">
                    Gender
                  </label>
                  <select
                    class="form-select"
                    id="validationCustom"
                    value={gender}
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                    required
                  >
                    <option selected disabled value="">
                      {loadingGender === true
                        ? "Loading..."
                        : "Choose Gender..."}
                    </option>
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {item.value_en}
                          </option>
                        );
                      })}
                  </select>
                  <div class="invalid-feedback">Please select a valid.</div>
                </div>
                <div class="col-md-3">
                  <label for="validationCustom" class="form-label">
                    Avatar
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    onChange={(event) => {
                      this.handleOnChangeImg(event);
                    }}
                  />
                  <img
                    src={
                      this.state.avatarUrl.length === 0
                        ? "..."
                        : this.state.avatarUrl
                    }
                    className="img-thumbnail float-end mt-2"
                    alt="_preview"
                    style={{ width: "160px", height: "130px" }}
                  />

                  <div class="invalid-feedback">Please provide a valid.</div>
                </div>
                <div class="col-12">
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning btn-lg p-2"
                        : "btn btn-primary btn-lg p-2"
                    }
                    type="button"
                    onClick={() => this.handleSaveUser()}
                    style={{ float: "right" }}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT
                      ? "Save"
                      : "Create new"}
                  </button>
                </div>
              </form>
              <div class="col-12">
                <TableManageUser
                  // data={this.state.data}
                  handleEditUserKey={this.handleEditUser}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    loadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    loadingPosition: state.admin.isLoadingPosition,
    roleRedux: state.admin.roles,
    loadingRole: state.admin.isLoadingRole,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUser: (data) => dispatch(actions.editUser(data)),
    processLogout: () => dispatch(actions.processLogout()),
    updateListUser: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
