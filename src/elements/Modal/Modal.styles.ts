import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    align-items: center;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;
export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    padding: 20px;
    color: white;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    background-color: #282c34;
`;


export const InputModal = styled.input`
    margin-block: 10px;
    padding: 8px;
    border-radius: 5px;
    color: white;
    border: 1px solid white;
    width: 80%;
    background-color: #282c34;
`
