import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const BookedSessionDetails = () => {

    const params = useParams();
    const axiosSecure = useAxiosSecure();

    // fetching booked session data
    const { data: bookedDetailsSessions=[], isPending: isBookedSessionLoading } = useQuery({
        queryKey: ['bookedDetailsSessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get(`/booked-session/${params.id}`)
            return res.data;
        },
    })

    console.log(bookedDetailsSessions);


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content">
                    <div>

                        {/* title */}
                        <h1 className="text-5xl font-bold">{bookedDetailsSessions.sessionTitle}</h1>
                        <p className="py-6">{bookedDetailsSessions.description}</p>

                        <div className="divider"></div>

                        {/* Registration info */}
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <h2>
                                <b>Registration Start date: </b> {bookedDetailsSessions.regStartDate}
                            </h2>

                            <h2>
                                <b>Registration End date: </b> {bookedDetailsSessions.regEndDate}
                            </h2>
                        </div>

                        <div className="divider"></div>

                        {/* Class time Info */}
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <h2>
                                <b>Class Start date: </b> {bookedDetailsSessions.classStartDate}
                            </h2>

                            <h2>
                                <b>Class End date: </b> {bookedDetailsSessions.classEndDate}
                            </h2>
                        </div>

                        <div className="divider"></div>

                        {/* tutor & session info */}
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <h2>
                                <b>Session Duration: </b> {bookedDetailsSessions.sessionDuration} hrs
                            </h2>

                            <h2>
                                <b>Tutor Name: </b> {bookedDetailsSessions.tutorName}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedSessionDetails;