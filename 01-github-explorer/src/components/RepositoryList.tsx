import { RepositoryItem } from "./RepositoryItem"
import { useEffect, useState } from "react"
import '../styles/repositories.scss'

interface Repository {
  name:string;
  description:string;
  html_url:string;
}

export function RepositoryList(){

  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(()=>{
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data=>setRepositories(data))
  },[])

  return (
    <section className='repositories-list'>
      <h1>Lista de Repositorios</h1>

      <ul>
        {repositories.map(repository=><RepositoryItem key={repository.name} repository={repository}/>)}
      </ul>

    </section>
  )
}