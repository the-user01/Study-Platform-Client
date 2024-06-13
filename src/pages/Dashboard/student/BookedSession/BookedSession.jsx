import { useQuery } from "@tanstack/react-query";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const BookedSession = () => {

    const axiosSecure = useAxiosSecure();

    // fetching booked session data
    const { data: bookedSessions, isPending: isBookedSessionLoading } = useQuery({
        queryKey: ['bookedSessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/booked-session")
            return res.data;
        },
    })

    return (
        <div>
            <DashboardHelmet name='Booked Session'></DashboardHelmet>


            <div>
                <div>
                    <h2 className="text-xl md:text-3xl">Booked Session</h2>
                </div>

                <div>
                    <div className="mt-8">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Title</th>
                                        <th>View Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isBookedSessionLoading ?
                                        bookedSessions.map((session, idx) =>
                                            <tr key={session._id}>
                                                <th> {idx + 1}</th>
                                                <td>{session.sessionTitle}</td>

                                                <td>
                                                    <Link to={`/dashboard/booked-session-details/${session._id}`}>
                                                        <button
                                                            className="btn btn-ghost ">
                                                               <FaEye className="text-xl"></FaEye>
                                                        </button>
                                                    </Link>

                                                </td>

                                            </tr>
                                        ) :
                                        <tr >
                                            <td className="text-center p-4" colSpan="4">
                                                <span className="loading loading-dots loading-lg"></span>
                                            </td>
                                        </tr>
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedSession;