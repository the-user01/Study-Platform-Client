import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Tutors = () => {

    const axiosPublic = useAxiosPublic();

    // fetching tutor information
    const { data: tutors, isPending: isTutorsLoading } = useQuery({
        queryKey: ['tutor'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosPublic.get("/users/tutor")
            return res.data;
        },
    })


    return (
        <div className="mt-8 bg-slate-200 p-8">
            <div className="ml-12">
                <h2 className="text-3xl">Tutors</h2>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-8 space-y-6 md:space-y-0 items-center mx-auto">
                {
                    !isTutorsLoading ?
                        tutors.map(tutor =>
                            <div key={tutor._id} className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        <b>Name: </b> {tutor.name}
                                    </h2>
                                    <p className="mt-2"><b>Email: </b> {tutor.email}</p>

                                </div>
                            </div>
                        ) :
                        <span className="loading loading-dots loading-lg"></span>
                }
            </div>
        </div>
    );
};

export default Tutors;