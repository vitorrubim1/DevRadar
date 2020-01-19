import React from 'react';
import { StatusBar, YellowBox } from 'react-native'; //componente
 
import Routes from './src/routes'; //Importando as rotas

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]) //Ocultando o warning do webSocket

export default function App() {
  return (
    <> 
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}


