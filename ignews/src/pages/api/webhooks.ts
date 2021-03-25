import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'
import { saveSubscription } from './_lib/manageSubscription'

async function buffer(readble: Readable){
  const chunks = []

  for await(const chunk of readble){
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

//desabling bodyParse to consume as a Stream (stripe sends data via stream)
export const config = {
  api: {
    bodyParser: false
  }
}

//wich events we want to listen
const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted'
])

export default async (request: NextApiRequest, response: NextApiResponse) =>{
  if(request.method==='POST'){
    const buf = await buffer(request)
    const secret = request.headers['stripe-signature']

    //checking if its the same key the way stripe recommends
    let event: Stripe.Event

    try{
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    }catch(error){
      return response.status(400).send('Webhook error:'+ error.message)
    }

    const { type } = event

    if(relevantEvents.has(type)){
      try {
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription
            
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            )

            break;
          case 'checkout.session.completed':

            const checkoutSession = event.data.object as Stripe.Checkout.Session

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            )
            
            break;


          default:
            throw new Error('🌚 Unhandled envent')
        }
      } catch (error) {
        return response.json({error: '🌚 Webhook handle failed.'})
      }
    }
 
    response.json({received : true})
    
  }else{
    response.setHeader('Allow','POST')
    response.status(405).end('Method not allowed')
  }
}
