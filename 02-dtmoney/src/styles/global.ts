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

  .react-modal-overlay{
    background: rgba(0, 0, 0, 0.5);//opacidade 0.5
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;

    display:flex;
    align-items:center;
    justify-content:center;

  }

  .react-modal-content{
    width:100%;
    max-width:576px;
    background:var(--backgorund);
    padding:3rem;
    position:relative;//para posicionar o botao de close depois
    border-radius:0.25rem;
  }

  .react-modal-close{
    position:absolute;
    right:1.5rem;
    top:1.5rem;
    border:0;//removendo pois o botao vem com borda e bkg por padrao
    background:transparent;

    transition: filter 0.2s;

    &:hover{
      filter:brightness(0.6)
    }
  }
`

