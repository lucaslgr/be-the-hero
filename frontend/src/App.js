import React from 'react';

import './global.css';

import Routes from './routes';

//Quando o html está dentro do JS, chamamos ele de JSX(Javascript XML)

function App() {
  //O estado sempre retorna o valor da variável e uma function para alterar o valor dessa variável
  return (
    <Routes/>
  );
}

export default App;
