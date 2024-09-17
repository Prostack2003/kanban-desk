import styled from 'styled-components';


export const TooltipWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 8px;
    z-index: 100;
`;


export const TooltipButton = styled.button`
    display: block;
    width: 100%;
    padding: 10px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
        background-color: #f0f0f0;
    }
`;
