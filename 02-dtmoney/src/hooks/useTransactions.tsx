import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction{
  id:number;
  title:string;
  amount:number;
  type:string;
  category:string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>
//type TransactionInput = Pick<Transaction, 'title'| 'amount' | 'type' | 'category'>


interface TransactionsProviderProps{
  children: ReactNode;//Aceitar qlqr tipo de conteudo valido por React
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput)=>Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({children}:TransactionsProviderProps){
  const [transactions, setTrasactions] = useState<Transaction[]>([])

  useEffect(()=>{
    api.get('transactions')
      .then(response=>setTrasactions(response.data.transactions))
  },[])

  async function createTransaction(transactionInput:TransactionInput){
    const response = await api.post('transaction', {...transactionInput, createdAt:new Date()})
    const { transaction } = response.data

    setTrasactions([...transactions,transaction])
  }

  return(
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

//criando o proprio hook
//economizando nos imports (useContext, TransactionsContext)
export function useTransaction(){
  const context = useContext(TransactionsContext)
  return context
}