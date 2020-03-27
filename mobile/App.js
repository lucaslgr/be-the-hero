import 'intl'; //Importando pacote para fazer conversão monetária
import 'intl/locale-data/jsonp/pt-BR'; //Importando idioma do brasil em um pacote de internacionalização para converter moeda

import React from 'react';

//Importando as rotas
import Routes from './src/routes';

export default function App() {
  return (
    <Routes/>
  );
}
