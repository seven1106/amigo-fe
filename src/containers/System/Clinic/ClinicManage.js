import React, { Component } from "react";
import { connect } from "react-redux";
import "./ClinicManage.scss";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import { postCreateClinicApi } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { toast } from "react-toastify";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //markdown
      contentMarkdown: "",
      contentHTML: "",
      nameClinic: "",
      address: "",
      ImageBase64: "",
      imageClinic: "",
      description: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveClinic = async () => {
    let {
      contentMarkdown,
      contentHTML,
      nameClinic,
      ImageBase64,
      description,
      address,
    } = this.state;
    if (
      !contentMarkdown ||
      !contentHTML ||
      !nameClinic ||
      !ImageBase64 ||
      !description ||
      !address
    ) {
      toast.error("Please do not leave blank");
      return;
    }

    let res = await postCreateClinicApi({
      image: this.state.imageClinic,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      nameClinic: this.state.nameClinic,
      address: this.state.address,
      description: this.state.description,
    });
    if (res && res.errCode === 0) {
      toast.success("Save clinic success");
      this.setState({
        contentMarkdown: "",
        contentHTML: " ",
        nameClinic: " ",
        ImageBase64: "",
        imageClinic: "",
        description: "",
        address: "",
      });
    } else {
      toast.error("Save clinic failed");
    }
  };
  handleOnChange = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeImg = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64Image(file);
      let objUrl = URL.createObjectURL(file);
      this.setState({
        ImageBase64: objUrl,
        imageClinic: base64,
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="clinicManage-container px-2">
          <div className="title my-5">MANAGE CLINIC</div>
          <div className="clinicManage-body px-5">
            
            <div className="row ">
              <div className="col-6 form-group">
                <label className="label">Clinic name:</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChange(e, "nameClinic");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label className="label">Address:</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChange(e, "address");
                  }}
                />
              </div>
            </div>
            <div className="row my-5 ">
              <div className="description col-6 form-group">
                <label className="label">Description:</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="8"
                  value={this.state.description}
                  onChange={(e) => {
                    this.handleOnChange(e, "description");
                  }}
                />
              </div>
              <div class="img col-6 form-group">
                <label for="validationCustom" class="form-label">
                  Image:
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
                    this.state.ImageBase64.length === 0
                      ? "..."
                      : this.state.ImageBase64
                  }
                  className="img-thumbnail float-end mt-2"
                  alt="_preview"
                  style={{ width: "160px", height: "130px" }}
                />

                <div class="invalid-feedback">Please provide a valid.</div>
              </div>
            </div>
            <div className="col-12  clinicManage-editor">
              <label for="validationCustom" class="form-label">
                Content:
              </label>
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
            </div>
          </div>
        </div>
        <div
          className="add-new "
          style={{ float: "right", margin: "0px 50px", padding: "30px" }}
        >
          <button className="btn px-3" onClick={() => this.handleSaveClinic()}>
            <span> Save changes</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    detailDoctor: state.admin.allDetailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fetchAllDoctorStart()),
    getAllDetailDoctors: () => dispatch(actions.fetchAllDetailDoctorStart()),
    saveDetail: (data) => dispatch(actions.saveDetailDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
