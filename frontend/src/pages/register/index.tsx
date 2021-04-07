import { Button, Card, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../../generated/graphql";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [form] = Form.useForm();
  const [register] = useRegisterMutation();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
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
    const response = await register({
      variables: {
        email,
        password
      }
    });
    console.log(response);

    history.push("/");
  };

  return (
    <div className="align-center-flex container">
      <Card className="animate__animated animate__fadeIn"
        title={
          <Title level={2} className="align-center-flex">
            Register
          </Title>
        }
        style={{
          minWidth: 550,
          boxShadow: "0px 0px 20px 5px #78797b"
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register_form"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please enter your email" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confrim"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
