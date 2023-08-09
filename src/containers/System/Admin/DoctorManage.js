import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorManage.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils";
import { getDetailInforDoctorApi } from "../../../services/userService";

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

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDrs: [],
      listSpe: [],
      listCli: [],
      //detail
      listPri: [],
      listPay: [],
      listPro: [],
      selectedPri: "",
      selectedPay: "",
      selectedPro: "",
      selectedSpe: "",
      selectedCli: "",
      addressClinic: "",
      nameClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }
  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllDetailDoctors();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.dataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDrs: dataSelect,
      });
    }
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      let { resPri, resPay, resPro, resSpe } = this.props.detailDoctor;
      let dataPri = this.dataInputSelect(resPri);
      let dataPay = this.dataInputSelect(resPay);
      let dataPro = this.dataInputSelect(resPro);
      let dataSpe = this.dataInputSelect(resSpe, "SPEC");

      this.setState({
        listPri: dataPri,
        listPay: dataPay,
        listPro: dataPro,
        listSpe: dataSpe,
      });
    }
  }
  dataInputSelect = (input, type) => {
    let data = [];
    if (input && input.length > 0) {
      if (type === "SPEC") {
        input.map((item) => {
          let name = item.name;
          let value = item.id;
          data.push({
            value: value,
            label: name,
          });
        });
      } else {
        input.map((item) => {
          let name =
            type === "USERS"
              ? `${item.firstName} ${item.lastName}`
              : item.value_vi;
          let value = type === "USERS" ? item.id : item.key;

          data.push({
            value: value,
            label: name,
          });
        });
      }

      return data;
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { selectedOption, selectedPay, selectedPro, selectedPri, selectedSpe } =
      this.state;
    if (
      !selectedOption ||
      !selectedPay ||
      !selectedPro ||
      !selectedPri ||
      !selectedSpe ||
      !selectedSpe
    ) {
      toast.error("Please do not leave blank");
      return;
    }

    this.props.saveDetail({
      doctorId: this.state.selectedOption.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      selectedPri: this.state.selectedPri.value,
      selectedPay: this.state.selectedPay.value,
      selectedPro: this.state.selectedPro.value,
      selectedSpe: this.state.selectedSpe.value,
      addressClinic: this.state.addressClinic,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
    });
  };
  handleOnChangeSelect = (selected, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selected;
    this.setState({
      ...stateCopy,
    });
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPri, listPay, listPro, listSpe, listCli } = this.state;
    let res = await getDetailInforDoctorApi(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.markdown) {
      let data = res.data.markdown;
      let priceId,
        paymentId,
        provinceId,
        nameClinic,
        specialtyId,
        clinicId,
        addressClinic,
        note,
        selectedPri,
        selectedPay,
        selectedPro,
        selectedCli,
        selectedSpe = "";
      if (res.data.detailDoctor) {
        priceId = res.data.detailDoctor.priceId;
        paymentId = res.data.detailDoctor.paymentId;
        provinceId = res.data.detailDoctor.provinceId;
        specialtyId = res.data.detailDoctor.specialtyId;
        clinicId = res.data.detailDoctor.clinicId;
        nameClinic = res.data.detailDoctor.nameClinic;
        addressClinic = res.data.detailDoctor.addressClinic;
        
        note = res.data.detailDoctor.note;
        selectedPri = listPri.find((item) => item.value === priceId);
        selectedPay = listPay.find((item) => item.value === paymentId);
        selectedPro = listPro.find((item) => item.value === provinceId);
        selectedSpe = listSpe.find((item) => item.value === specialtyId);
        // selectedCli = listCli.find((item) => item.value === clinicId);
        
      }

      this.setState({
        contentMarkdown: data.contentMarkdown,
        contentHTML: data.contentHTML,
        description: data.description,
        selectedPri: selectedPri,
        selectedPay: selectedPay,
        selectedPro: selectedPro,
        selectedSpe: selectedSpe,
        // selectedCli: selectedCli,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        selectedPri: "",
        selectedPay: "",
        selectedPro: "",
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    }
  };
  handleOnChangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    console.log("this.state", this.state);
    return (
      <React.Fragment>
        <div className="doctorManage-container px-5">
          <div className="title my-5">MANAGE DOCTORS</div>
          <div className="doctorManage-body">
            <div className="selectDoctor">
              <div className="selectDoctor-left form-group">
                <label className="label">Choose doctor:</label>
                <Select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.listDrs}
                  placeholder="Select Doctor"
                />
              </div>
              <div className="selectDoctor-left form-group">
                <label className="label">Choose specialty:</label>
                <Select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={this.state.selectedSpe}
                  onChange={this.handleOnChangeSelect}
                  options={this.state.listSpe}
                  name="selectedSpe"
                  placeholder="Select Specialty"
                />
              </div>
              <div className="selectDoctor-right form-group">
                <label className="label">Description:</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  value={this.state.description}
                  onChange={this.handleOnChangeDesc}
                />
              </div>
            </div>
            <div className="detail-dr-group row">
              <div className="col-4 form-group">
                <label className="label">Select Price</label>
                <Select
                  value={this.state.selectedPri}
                  onChange={this.handleOnChangeSelect}
                  name="selectedPri"
                  options={this.state.listPri}
                  placeholder="..."
                />
              </div>
              <div className="col-4 form-group">
                <label className="label">Select province</label>
                <Select
                  value={this.state.selectedPro}
                  onChange={this.handleOnChangeSelect}
                  name="selectedPro"
                  options={this.state.listPro}
                  placeholder="..."
                />
              </div>
              <div className="col-4 form-group">
                <label className="label">Clinic name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="..."
                  value={this.state.nameClinic}
                  onChange={(e) =>
                    this.setState({ nameClinic: e.target.value })
                  }
                />
              </div>

              <div className="col-4 form-group">
                <label className="label">Select payment method</label>
                <Select
                  value={this.state.selectedPay}
                  onChange={this.handleOnChangeSelect}
                  name="selectedPay"
                  options={this.state.listPay}
                  placeholder="..."
                />
              </div>
              <div className="col-4 form-group">
                <label className="label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="..."
                  value={this.state.addressClinic}
                  onChange={(e) =>
                    this.setState({ addressClinic: e.target.value })
                  }
                />
              </div>
              <div className="col-4 form-group">
                <label className="label">Note</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="..."
                  value={this.state.note}
                  onChange={(e) => this.setState({ note: e.target.value })}
                />
              </div>
            </div>

            <div className="doctorManage-editor">
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
        <div className="save-change">
          <button
            className="btn px-3"
            onClick={() => this.handleSaveContentMarkdown()}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
