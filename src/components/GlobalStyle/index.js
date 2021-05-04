import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box; 
        padding: 0; 
        margin: 0; 
    }

    :root{
        --orange-background-color: #fbad50; 

        --font-size: 1rem; 

    }
`

export default GlobalStyle; 