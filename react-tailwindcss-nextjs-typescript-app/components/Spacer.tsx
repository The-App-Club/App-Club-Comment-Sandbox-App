import React from 'react';
import {css, cx} from '@emotion/css';

const Spacer = ({height = `1rem`}) => {
  return (
    <div
      className={cx(css`
        height: ${height};
      `)}
    />
  );
};

export default Spacer;
