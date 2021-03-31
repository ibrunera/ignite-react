import { NextApiRequest, NextApiResponse} from 'next'
import { query as q} from 'faunadb'
import { getSession } from 'next-auth/client'
import { stripe } from '../../services/stripe'
import { fauna } from '../../services/fauna'

type User ={
  ref:{
    id:string;
  },
  data:{
    stripe_customer_id: string;
  }
}


export default async (request:NextApiRequest, response:NextApiResponse) => {
  if(request.method==='POST'){
    //creating a custumer on stripe
    //accessing user data from the browser cookies
    const session = await getSession({req: request})

    //geting user data from DB
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )

    console.log('-> /subscribe - user:'+user.data)

    let customerId = user.data.stripe_customer_id
    
    console.log('-> /subscribe - customerId:'+customerId)

    if(!customerId){
      console.log('creating custumer on stripe')
      const stripeCustumer = await stripe.customers.create({
        email: session.user.email,
        //metadata
      })

      //saving stripeCustumer.id no DB
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id : stripeCustumer.id
            }
          }
        )
      )

      customerId = stripeCustumer.id

    }

    const stripeCheckoutsession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {price: process.env.STRIPE_PRICE_KEY , quantity:1}
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCES_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return response.status(200).json({sessionId: stripeCheckoutsession.id })
  }else{
    response.setHeader('Allow','POST')
    response.status(405).end('Method not allowed')
  }
}