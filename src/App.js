import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input === '') {
      alert("Informe um CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Erro ao buscar CEP');
      setInput('');
    }
  }

  return (
    <div className="container">

      <h1 className="title">Buscador CEP</h1>
      <div className="container-input">
        <input
          type="text"
          placeholder="Digite o seu CEP"
          value={input}
          onChange={(e) => {
            let written = e.target.value;
            setInput(written.replace(/\D/g, ''));
            if (written.length === 8 && !written.includes('-')) {
              let inputValue = written.replace(/\D/g, '').match(/(\d{5})(\d{3})/);

              inputValue = `${inputValue[1]}-${inputValue[2]}`;
              setInput(inputValue);
            } else if (written.length >= 8 && written.includes('-')) {
              setInput(written.replace('-',''));
            }
          }}
        />

        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>DDD: {cep.ddd}</span>
          {cep.complemento && <span>Complemento: {cep.complemento}</span>}
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
