import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckOutForm = ({ regFee }) => {
    const {user} = useAuth();

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { fee: "1500"})
        .then(res=>{
            setClientSecret(res.data.clientSecret)
        })
    }, [axiosSecure, regFee])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        }
        else {
            setError('')
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret ,{
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError){
            // setError(confirmError)
        }
        else{
            // setError("");

            if(paymentIntent.status === 'succeeded'){
                console.log("Transaction");
            }

        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <button className='btn btn-sm btn-primary my-6' type="submit" disabled={!stripe}>
                Pay
            </button>
            <p className='text-red-600'>{error}</p>
        </form >
    );
};

export default CheckOutForm;