import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box; 
        padding: 0; 
        margin: 0; 
        font-family: sans-serif; 

    }


    :root {
        --orange-background-color: #fb8250; 
        --orange-light: #fdb79b; 
        --gray: #6f6f6f;
    }
`;

export default GlobalStyle;
