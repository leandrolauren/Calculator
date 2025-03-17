'use client';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, InputProps>(({ value, onChange, error }, ref) => {
  return (
    <StyledWrapper>
      <div className="form-control">
        <input 
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className={error ? 'error' : ''}
          required 
        />
        <label>
          {['S', 't', 'o', 'c', 'k'].map((letter, index) => (
            <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>
              {letter}
            </span>
          ))}
        </label>
      </div>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: 190px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: #fff;
    transition: border-color 0.3s ease;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #fff;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: lightblue;
    transform: translateY(-30px);
  }

  .error {
    border-bottom-color: #ff4444 !important;
  }

  .error + label span {
    color: #ff4444 !important;
  }
`;

SearchInput.displayName = 'SearchInput';
export default React.memo(SearchInput);