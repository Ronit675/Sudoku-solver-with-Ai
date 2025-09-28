import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #6b7280;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #e0e7ff;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  min-width: 100px;

  &:hover {
    background-color: #c7d2fe;
    transform: translateY(-1px);
  }
`;

const ApiKeyInput = ({ onSave, initialValue }) => {
  const [apiKey, setApiKey] = useState(initialValue);

  const handleSave = () => {
    onSave(apiKey.trim());
  };

  return (
    <InputContainer>
      <Label htmlFor="api-key">Gemini API Key (stored locally)</Label>
      <InputGroup>
        <Input
          id="api-key"
          type="password"
          placeholder="Paste your Google AI Studio API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          autoComplete="off"
        />
        <SaveButton onClick={handleSave}>
          Save
        </SaveButton>
      </InputGroup>
    </InputContainer>
  );
};

export default ApiKeyInput;
