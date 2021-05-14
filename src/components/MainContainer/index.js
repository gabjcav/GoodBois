import styled from 'styled-components';

const MainContainer = styled.main`
    width: 100%;
    max-height: 100%; 
    display: flex; 
    flex-direction: column; 
    padding: 5%; 
    
    button{
        box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 3px 0px;
    }
    h1{
        background-color: var(--orange-background-color);
        text-align: center; 
        font-size: 2.5rem; 
        width: 100%; 
        padding: 10px; 
        border-radius: 4px; 
        margin-bottom: 10%; 
        box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 3px 0px;
        font-family: 'Patua One', sans-serif;
        letter-spacing: 2px;
        color: white; 
    }
`

export default MainContainer; 