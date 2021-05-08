import {createGlobalStyle} from 'styled-components'
import '../../../'
const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box; 
        padding: 0; 
        margin: 0; 
        font-family: sans-serif; 
    }

    :root {
        --orange-background-color: #fbad50; 

        --button-text-size: 1rem; 
    }
`

export default GlobalStyle; 