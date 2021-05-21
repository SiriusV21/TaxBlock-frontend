import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { apiURL } from "../config";
import styles from "../css/Register.module.css";

const Register = ({ setAuthToken }) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values) => {
    fetch(`${apiURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        setAuthToken(res.token);
        window.localStorage.setItem("token", res.token);
        history.push(`/dashboard`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.form_div}>
      <Form className={styles.form} form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name",
              whitespace: true,
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          Or <a href="/login">Login</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
