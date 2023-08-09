import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../../utils";
import "./ExtraInfoDoctor.scss";
import moment from "moment";
import { getExtraDoctorInfoByIdApi } from "../../../services/userService";
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from "react-intl";
class ExtraInfoDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
      extraInfo: {},
    };
  }
  async componentDidMount() {
    let res = await getExtraDoctorInfoByIdApi(this.props.doctorId);
    if (res && res.errCode === 0) {
      this.setState({
        extraInfo: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getExtraDoctorInfoByIdApi(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }
  showHideDetail = (status) => {
    this.setState({
      isShowDetail: status,
    });
  };

  render() {
    let { isShowDetail, extraInfo } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="extra-info-dr-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="extra-info.adress" />
            </div>
            <div className="name-clinic">
              {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
            </div>
            <div className="address-clinic">
              {extraInfo && extraInfo.addressClinic
                ? extraInfo.addressClinic
                : ""}
            </div>
          </div>
          <div className="content-down">
            {isShowDetail === false && (
              <div className="short-info">
                <span className="left">
                  <FormattedMessage id="extra-info.price" />
                </span>
                <span className="right">
                  {extraInfo &&
                  extraInfo.priceData &&
                  language === languages.VI ? (
                    <NumericFormat
                      value={extraInfo.priceData.value_vi}
                      className="currency"
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix=" VND"
                    />
                  ) : (
                    ""
                  )}
                  {extraInfo &&
                  extraInfo.priceData &&
                  language === languages.EN ? (
                    <NumericFormat
                      value={extraInfo.priceData.value_en}
                      className="currency"
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix=" USD"
                    />
                  ) : (
                    ""
                  )}
                </span>
                <span
                  className="show"
                  onClick={() => this.showHideDetail(true)}
                >
                  <FormattedMessage id="extra-info.show" />
                </span>
              </div>
            )}
            {isShowDetail === true && (
              <>
                <div className="detail-info">
                  <div className="price">
                    <span className="left">
                      <FormattedMessage id="extra-info.price" />
                    </span>
                    <span className="right">
                      {extraInfo &&
                      extraInfo.priceData &&
                      language === languages.VI ? (
                        <NumericFormat
                          value={extraInfo.priceData.value_vi}
                          className="currency"
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix=" VND"
                        />
                      ) : (
                        ""
                      )}
                      {extraInfo &&
                      extraInfo.priceData &&
                      language === languages.EN ? (
                        <NumericFormat
                          value={extraInfo.priceData.value_en}
                          className="currency"
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix=" USD"
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="note">
                    {extraInfo && extraInfo.note ? extraInfo.note : ""}
                  </div>
                  <div className="payment">
                    <span className="left">
                      <FormattedMessage id="extra-info.payment" />
                    </span>
                    <span className="right">
                      {extraInfo &&
                      extraInfo.paymentData &&
                      language === languages.VI
                        ? extraInfo.paymentData.value_vi
                        : ""}
                      {extraInfo &&
                      extraInfo.paymentData &&
                      language === languages.EN
                        ? extraInfo.paymentData.value_en
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="hide-price">
                  <span onClick={() => this.showHideDetail(false)}>
                    <FormattedMessage id="extra-info.hide" />
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInfoDoctor);
