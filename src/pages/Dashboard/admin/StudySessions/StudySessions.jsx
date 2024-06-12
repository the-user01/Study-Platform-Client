import { useQuery } from "@tanstack/react-query";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import Swal from "sweetalert2";

const StudySessions = () => {
    const axiosSecure = useAxiosSecure();

    const { data: studySessions, isPending: isSessionLoading, refetch } = useQuery({
        queryKey: ['studySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/create-session/pending")
            return res.data;
        },
    })

    refetch();


    const handleReject = (session) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/create-session/reject/${session._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: `${session.sessionTitle} has been rejected.`,
                                icon: "success",
                            });
                        }
                    })

            }
        });

    }

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
                                <th>Approve</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isSessionLoading ?
                                studySessions.map((session, idx) =>
                                    <tr key={session._id}>
                                        <th> {idx + 1}</th>
                                        <td>{session.sessionTitle}</td>

                                        <td>
                                            <button
                                                className="btn btn-ghost ">
                                                <FcApprove className="text-xl "></FcApprove>
                                                Approve</button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleReject(session)}
                                                className="btn btn-ghost ">
                                                <FcDisapprove className="text-xl "></FcDisapprove>
                                                Reject</button>
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
    );
};

export default StudySessions;