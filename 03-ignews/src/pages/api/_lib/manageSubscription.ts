import { fauna } from "../../../services/fauna";
import { query as q } from 'faunadb'
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false){
  //get user Ref at faunadb with user_by_stripe_customer_id
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(q.Index('user_by_stripe_customer_id'),customerId)
      ))
  )

  //getting subscription details from stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id:subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  //save subscription on faunadb
  if(createAction){
    //creating new sub
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        {data: subscriptionData}
      )
    )
  }else{
    //updating existing sub
    await fauna.query(
      q.Replace(
        q.Select(
          "ref", 
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscription.id)
            )  
          ),
          {data : subscriptionData})

      //we could change only status -> q.Update -> data: {status: subscription.data.status}
    )

  }
}