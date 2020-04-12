import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  /**
   * Lista os resitorios da API
   */
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    /**
     * Adiciona informaçoes de tecnologia na API
     */
    const response = await api.post('repositories', {
      title: 'Tecnologias',
      url: 'https://github.com/fselvino',
      techs: ["React", "Node.js"]
    })

    //Atualiza o esta do repositorio
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    //metodo filter retorna um novo array com os repositorios diferente de id
    //quando repositories for recriado ele não terá o id informado
    setRepositories(repositories.filter(repositorio => repositorio.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorio => (<li key={repositorio.id}>
          {repositorio.title}
          <button onClick={() => handleRemoveRepository(repositorio.id)}>
            Remover
          </button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
