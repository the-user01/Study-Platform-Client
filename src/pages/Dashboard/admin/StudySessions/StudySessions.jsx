import { useQuery } from "@tanstack/react-query";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FcApprove } from "react-icons/fc";

const StudySessions = () => {
    const axiosSecure = useAxiosSecure();

    const { data: studySessions, isPending: isSessionLoading } = useQuery({
        queryKey: ['studySessions'],
        queryFn: async () => {
            const res = await axiosSecure.get("/create-session")
            return res.data;
        }
    })

    return (
        <div>
            <DashboardHelmet name='All Study Sessions'></DashboardHelmet>

            <div>
                <h2 className="text-xl lg:text-3xl">All Study Sessions</h2>
            </div>

            <div className="mt-8">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isSessionLoading ?
                                studySessions.map((session, idx) => <tr key={session._id}>
                                    <th> {idx + 1}</th>
                                    <td>{session.sessionTitle}</td>

                                    <td>
                                        <button
                                            className="btn btn-ghost ">
                                            <FcApprove className="text-xl "></FcApprove>
                                            Approve</button>
                                    </td>
                                </tr>) :
                                <tr>
                                    <td>
                                        <span className="loading loading-dots loading-lg"></span>
                                    </td>
                                </tr>
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudySessions;