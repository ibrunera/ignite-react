import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransaction } from '../../hooks/useTransactions'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

interface NewTransactionModalProps{
  isOpen:boolean;
  onRequestClose:()=>void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){

  const { createTransaction } = useTransaction()

  
  //inputs
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('deposit')
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(e:FormEvent){
    e.preventDefault()

    await createTransaction({
      title,
      amount,
      type,
      category
    })

    onRequestClose()
    setTitle('')
    setAmount(0)
    setType('deposit')
    setCategory('')

  }

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar"/>
      </button>

      <Container>
        <h2>Cadastrar Transacao</h2>
        <input 
          placeholder="Titulo"
          type="text"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />

        <input 
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={e=>setAmount(Number(e.target.value))}
        />
        
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={()=>setType('deposit')}
            isActive={type==='deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={()=>setType('withdraw')}
            isActive={type==='withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida"/>
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          type="text"
          value={category}
          onChange={e=>setCategory(e.target.value)}
        />

        <button 
          type="submit"
          onClick={handleCreateNewTransaction}
        >
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}