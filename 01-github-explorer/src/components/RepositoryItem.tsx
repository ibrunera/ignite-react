interface RepositoryItemProps {
  repository : {
    name:string;
    description:string;
    html_url:string;
  }
}

export function RepositoryItem({repository}:RepositoryItemProps){
  return (
    <li>
      <strong>{repository?.name ?? 'Default'}</strong>
      <p>{repository?.description ?? 'No description'}</p>
      <a href={repository?.html_url ?? 'Missing link'}>
        Acessar Repositorio
      </a>
    </li>
  )
}