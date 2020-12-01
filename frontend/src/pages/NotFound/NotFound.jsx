import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import routing from '../../routing/routing';

export const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={(
      <Link to={routing().root}>
        <Button type="primary">Back Home</Button>
      </Link>
      )}
  />
);
