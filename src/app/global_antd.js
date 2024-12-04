import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: #7AB730;
    border: 1px solid #7AB730;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #6DAF2B;
    }
    &:disabled {
    background-color: #d9d9d9;
    border-color: #d9d9d9;
    color: #a0a0a0; /* Màu chữ xám nhạt */
    cursor: not-allowed;
  }
`;
