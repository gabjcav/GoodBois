import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box; 
        padding: 0; 
        margin: 0; 
        font-family: sans-serif; 
    }

    html{
        font-size: 62.5%; 
    }


    :root {
        --orange-background-color: #fb8250; 
        --orange-light: #fdb79b; 
        --gray: #333333;
    }
`;

export default GlobalStyle;
