import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import HelmetHook from '../../hooks/HelmetHook';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const params = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: loadSessionDetail = [] } = useQuery({
        queryKey: ["loadSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/create-session/approved/${params.id}`)
            return res.data;
        }
    })

    const regFee = parseInt(loadSessionDetail.regFee)

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

    return (
        <div>
            <HelmetHook name="Payment"></HelmetHook>

            <div>
                <div className='text-center mt-20'>
                    <h2 className="text-xl md:text-2xl"><b>Total Payable:</b> {regFee} BDT</h2>
                </div>

                <div className='w-[550px] mx-auto mt-20'>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm regFee={regFee}></CheckOutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;