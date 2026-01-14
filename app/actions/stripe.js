'use server'

import { headers } from 'next/headers'

import { stripe } from '../../lib/stripe'

export async function fetchClientSecret(amount) {
  
  try {
      const origin = (await headers()).get('origin')

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price_data: {
            currency: 'eur',
            product_data: {
                name: 'Ostoskorin maksu',
            },
            unit_amount: amount,
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret;
} catch (error) {
  console.error('Error creating Checkout session:', error);
  throw error;
}
}
