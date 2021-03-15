import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
  --blue: #5429CC;
  --blue-light:#6933FF;
  --green:#33CC95;
  --red:#E62E4D;
  --shape:#FFFFFF;
  --text-title:#363F5F;
  --text:#969CB2;
  --backgorund:#F0F2F5;
  }
  
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  hmtl{
    //font-size padrao 16px

    @media (max-width:1080px){
      font-size:93.75%; //15px
    }

    @media (max-width){
      font-size:87.5%; //14px
    }
  }

  body{
    background:var(--background);
    -webkit-font-smoothing: antialised;
  }

  body, input, textarea, button{
    font-family: 'Poppins', sans-serif;
    font-weight:400;
  }

  h1,h2,h3,h4,h5,h6, strong{
    font-weight: 600;
  }

  button{
    cursor: pointer;
  }

  [disabled]{
    opacity: 0.6;
    cursor: not-allowed
  }
`

