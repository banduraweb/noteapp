import React from 'react';
import { SignIn } from './SignIn';

export const SignInContainer = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <SignIn onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};
