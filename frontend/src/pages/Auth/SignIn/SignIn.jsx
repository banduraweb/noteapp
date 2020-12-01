import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Form, Input, Button, Breadcrumb,
} from 'antd';

import { UserOutlined } from '@ant-design/icons';
import routing from '../../../routing/routing';
import styles from './SignIn.module.scss';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const SignIn = ({ onFinishFailed, onFinish }) => (
  <div className={styles.signInWrapper}>
    <div className={styles.formWrapper}>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="email"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Not Valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        Have no account?
        <Form.Item {...tailLayout}>
          <NavLink to={routing().register}>
            <Breadcrumb.Item>
              <UserOutlined />
              <span>Sign Up</span>
            </Breadcrumb.Item>
          </NavLink>
        </Form.Item>
      </Form>
    </div>
    <div className={styles.promo} />

  </div>
);
