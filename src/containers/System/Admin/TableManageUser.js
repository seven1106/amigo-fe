import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    };
  }
  componentDidMount() {
    this.props.getAllUser();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.listUsers !== this.state.allUsers) {
      this.setState({
        allUsers: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteUser(user);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserKey(user);
  };
  render() {
    let arrUser = this.state.allUsers;
    let LoadingUser = this.state.LoadingUser;

    return (
      <React.Fragment>
        <div className="user-container">
          <table id="table-customers">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {arrUser.map((item, index) => {
              return (
                <tr>
                  {" "}
                  <td>{LoadingUser === true ? "Loading..." : item.email}</td>
                  <td>
                    {LoadingUser === true ? "Loading..." : item.firstName}
                  </td>
                  <td>{LoadingUser === true ? "Loading..." : item.lastName}</td>
                  <td>{LoadingUser === true ? "Loading..." : item.address}</td>
                  <td className="action">
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditUser(item)}
                      s
                    >
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
    LoadingUser: state.admin.isLoadingUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
