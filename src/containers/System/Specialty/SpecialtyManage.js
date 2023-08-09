import React, { Component } from "react";
import { connect } from "react-redux";
import "./SpecialtyManage.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { postCreateSpecialtyApi } from "../../../services/userService";

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

class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //markdown
      contentMarkdown: "",
      contentHTML: "",
      nameSpecialty: "",
      ImageBase64: "",
      imageSpecialty: "",
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
  handleSaveSpecialty = async () => {
    let { contentMarkdown, contentHTML, nameSpecialty, ImageBase64 } =
      this.state;
    if (!contentMarkdown || !contentHTML || !nameSpecialty || !ImageBase64) {
      toast.error("Please do not leave blank");
      return;
    }

    let res = await postCreateSpecialtyApi({
      image: this.state.imageSpecialty,
      descriptionHTML: this.state.contentHTML,
      descriptionMarkdown: this.state.contentMarkdown,
      nameSpecialty: this.state.nameSpecialty,
    });
    if (res && res.errCode === 0) {
      toast.success("Save specialty success");
      this.setState({
        contentMarkdown: "",
        contentHTML: " ",
        nameSpecialty: " ",
        ImageBase64: "",
        imageSpecialty: "",
      });
    } else {
      toast.error("Save specialty failed");
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
        imageSpecialty: base64,
      });
    }
  };
  render() {
    console.log("this.specialty ", this.state);
    return (
      <React.Fragment>
        <div className="specialtyManage-container px-2">
          <div className="title my-5">MANAGE SPECIALTY</div>
          <div className="specialtyManage-body">
            <div className="row my-5 px-5">
              <div className="col-6 my-2 form-group">
                <label className="label">Specialty name:</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    this.handleOnChange(e, "nameSpecialty");
                  }}
                />
              </div>
              <div class="col-6 form-group">
                <label for="validationCustom" class="form-label">
                  Image
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
            <div className="col-12 px-5 specialtyManage-editor">
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
          <button
            className="btn px-3"
            onClick={() => this.handleSaveSpecialty()}
          >
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
