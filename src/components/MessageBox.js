import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  width: 100%;
  text-align: center;
  font-weight: 600;
  color: #333;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.type === 'success' && `
    background-color: #d1fae5;
    color: #065f46;
  `}

  ${props => props.type === 'error' && `
    background-color: #fee2e2;
    color: #991b1b;
  `}
`;

const MessageBox = ({ message, type }) => {
  return (
    <MessageContainer type={type}>
      {message}
    </MessageContainer>
  );
};

export default MessageBox;
