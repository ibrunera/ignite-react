import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import {App} from './App';

createServer({
  models:{
    transaction: Model,

  },

  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id:1,
          title:'Freela',
          type:'deposit',
          category:'Dev',
          amount:6000,
          createdAt: new Date('2021-03-16 19:00:00')
        },
        {
          id:2,
          title:'Aluguel',
          type:'withdraw',
          category:'Casa',
          amount:1100,
          createdAt: new Date('2021-03-16 19:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api'

    this.get('/transactions',()=>{
      return this.schema.all('transaction')
    })

    this.post('/transaction',(schema, request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
