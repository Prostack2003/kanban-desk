import styled from 'styled-components';

export const BoardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f4f5f7; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
    width: 25%; 
    padding: 20px;
    min-height: 400px; 
`;

export const ColumnTitle = styled.h2`
    text-align: center;
    font-size: 1.5em;
    color: #333; 
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd; 
    padding-bottom: 10px;
`;

export const TaskCard = styled.div`
    cursor: pointer;
    background-color: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    border-left: 4px solid #0079bf; 
    transition: transform 0.1s ease-in-out;
    
    &:hover {
        transform: scale(1.02); 
    }
`;

export const Textarea = styled.textarea`
    padding: 8px;
    border-radius: 5px;
    color: white;
    border: 1px solid white;
    width: 80%;
    background-color: #282c34;
    resize: none;
    margin-bottom: 10px;
`

export const Select = styled.select`
    width: 80%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid white;
    background-color: #282c34;
    color: white;
    margin-bottom: 10px;
`

