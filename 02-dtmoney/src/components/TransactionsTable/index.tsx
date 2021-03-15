import { Container } from './styles'

export function TransactionsTable(){
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titutlo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desen.Web</td>
            <td className="deposit">12.000</td>
            <td>Dev</td>
            <td>20/02/2021</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">2.000</td>
            <td>Dev</td>
            <td>20/02/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}