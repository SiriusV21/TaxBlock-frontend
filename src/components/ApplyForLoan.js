import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, DatePicker } from "antd";
import "antd/dist/antd.css";
import styles from "../css/ApplyForLoan.module.css";
import { apiURL } from "../config";

const ApplyForLoan = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { RangePicker } = DatePicker;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 6 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
      (getFieldValue) => ({
        validator(_, value) {
          const today = new Date();
          if (!value || (value[0] > today && value[1] - value[0] >= 31536000000)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Start Date should be ahead of today and time period should be atleast 1 year"));
        },
      }),
    ],
  };
  const amountConfig = {
    rules: [
      {
        required: true,
        message: "Please input an amount",
      },
      {
        pattern: /[1-9][0-9][0-9][0-9][0-9][0-9]+/,
        message: "Loan Amount should be greater than 100000",
      },
    ],
  };

  const onFinish = (values) => {
    values = { ...values, startDate: values.timePeriod[0].format("YYYY-MM-DD"), endDate: values.timePeriod[1].format("YYYY-MM-DD") };
    delete values["timePeriod"];
    const authToken = window.localStorage.getItem("token");
    if (authToken) {
      fetch(`${apiURL}/loanApplication`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(values),
      })
        .then((res) => res.json().then((body) => ({ status: res.status, body })))
        .then((res) => {
          if (res.status === 202) {
            form.resetFields();
            history.push(`/dashboard`);
          }
        });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleClick = () => {
    history.push(`/dashboard`);
  };

  return (
    <div>
      <h1 className={styles.h1}>Loan Application Form</h1>
      <Form className={styles.application_form} form={form} {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="applicantName" label="Applicant Name" rules={[{ required: true, message: "Please input applicant name" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please input Address" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[
            { required: true, message: "Please input contact number" },
            {
              pattern: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
              message: "Please input a valid contact number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="loanAmount" label="Loan Amount" {...amountConfig}>
          <Input />
        </Form.Item>
        <Form.Item name="timePeriod" label="Duration" {...rangeConfig}>
          <RangePicker />
        </Form.Item>
        <Form.Item
          name="emi"
          label="EMI"
          rules={[
            { required: true, message: "Please input an amount" },
            { pattern: /[0-9]+/, message: "Entered amount should be a number!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("loanAmount") / 10 <= value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Entered amount should be greater than one tenth of the Loan Amount"));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className={styles.back_btn} onClick={handleClick}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplyForLoan;
