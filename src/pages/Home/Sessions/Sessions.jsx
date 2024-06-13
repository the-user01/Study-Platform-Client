import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Sessions = () => {

    const axiosSecure = useAxiosSecure();

    // fetching pending approved data
    const { data: approvedStudySessions, isPending: isApprovedSessionLoading } = useQuery({
        queryKey: ['approvedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/create-session/approved")
            return res.data;
        },
    })


    return (
        <div className="mt-8 bg-slate-200 p-8">
            <div className="ml-12">
                <h2 className="text-3xl">Sessions</h2>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-8 space-y-6 md:space-y-0 justify-center items-center mx-auto">
                {
                    !isApprovedSessionLoading ?
                        approvedStudySessions.map(session =>
                            <div key={session._id} className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {session.sessionTitle}
                                        <div className="badge bg-green-700 p-3 text-white">Ongoing</div>
                                    </h2>
                                    <p className="mt-2">{session.description}</p>

                                    <div className="divider"></div>

                                    <div className="card-actions">
                                        <Link
                                            to={`/session-detail/${session._id}`}
                                            className="btn btn-outline bg-green-700 text-white w-full"
                                        >
                                            <button>Read More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) :
                        <span className="loading loading-dots loading-lg"></span>
                }
            </div>
        </div>
    );
};

export default Sessions;