import React from 'react';
import { Layout } from 'antd';
import style from './Container.module.scss';

const {
  Header, Footer, Content,
} = Layout;

export const Container = ({ children }) => (
  <Layout className={style.container}>
    <Header className={style.header}>
      <div className={style.logo} />
    </Header>
    <Content className={style.content}>{children}</Content>
    <Footer className={style.footer}>@notes</Footer>
  </Layout>
);
