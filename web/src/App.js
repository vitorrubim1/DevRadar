import React, { useState, useEffect } from 'react';
import api from './services/api'; //IMPORTANDO O AXIOS

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
//COMPONENTE: É UM BLOCO/FUNÇÃO QUE RETORNA ALGUM CONTEÚDO HTML, CSS e JS. NÃO INTERFERINDO NA APLICAÇÃO
//PROPRIEDADES: INFORMAÇÕES QUE UM COMPONENTE pai PASSA PARA O COMPONENTE filho, ex: TITLE, CLASS, ID, PLACEHOLDER..
//ESTADO: INFORMAÇÕES MANTIDAS PELO COMPONENTE (lembrar: IMUTABILIDADE)

function App() {
  const [devs, setDevs] = useState ([]); //ARMAZENANDO OS DEVS, E INICIANDO VAZIO

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs(); //CHAMANDO A FUNÇÃO
  }, [])
  async function handleAddDev(data){

    const response = await api.post('./devs', data)

    setDevs([...devs, response.data]); //adição de um dev instantaneamente
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
        
      </aside>

      <main>
        <ul>
          {devs.map(dev =>(
            <DevItem key={dev._id} dev={dev} /> 
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
