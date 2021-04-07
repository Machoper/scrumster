import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../client";
import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [form] = Form.useForm();
  const [login] = useLoginMutation({
    onError: err => message.error(err.message)
  });

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const response = await login({
      variables: {
        email,
        password
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user
          }
        });
      }
    });
    console.log(response);

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
      history.push("/");
    }
  };

  return (
    <div className="align-center-flex container">
      <Card className="animate__animated animate__fadeIn"
        title={
          <Title level={2} className="align-center-flex">
            Login
          </Title>
        }
        style={{
          minWidth: 300,
          boxShadow: "0px 0px 20px 5px #78797b"
        }}
      >
        <Form form={form} name="login_form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please enter your email" }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <div>
              Or <Link to="/register">register now!</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
