import { useQuery } from "@tanstack/react-query";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdCloudUpload } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllStudySession = () => {
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

    // fetching pending rejected data
    const { data: rejectedStudySessions, isPending: isRejectedSessionLoading, refetch } = useQuery({
        queryKey: ['rejectedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/create-session/rejected")
            return res.data;
        },
    })


    const handleNewRequest = (session) => {
        axiosSecure.patch(`/create-session/pending/${session._id}`)
            .then(() => {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "New Request Sent Successfully",
                });

            })
    }



    return (
        <div>
            <DashboardHelmet name='Study Sessions'></DashboardHelmet>

            {/* Approved Session */}
            <div>
                <div>
                    <h2 className="text-xl lg:text-3xl text-green-700">Approved Sessions</h2>
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
                                        <th>Upload Material</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isApprovedSessionLoading ?
                                        approvedStudySessions.map((session, idx) =>
                                            <tr key={session._id}>
                                                <th> {idx + 1}</th>
                                                <td>{session.sessionTitle}</td>

                                                <td>
                                                    <Link to={`/dashboard/upload-materials/:${session._id}`}>
                                                        <button
                                                            className="btn btn-ghost ">
                                                            <MdCloudUpload className="text-2xl "></MdCloudUpload>
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

            {/* Rejected Session */}
            <div className="mt-14">
                <div>
                    <h2 className="text-xl lg:text-3xl text-red-700">Rejected Sessions</h2>
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
                                        <th>Rejection Reason</th>
                                        <th>Feedback</th>
                                        <th>New Request</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isRejectedSessionLoading ?
                                        rejectedStudySessions.map((session, idx) =>
                                            <tr key={session._id}>
                                                <th> {idx + 1}</th>
                                                <td>{session.sessionTitle}</td>
                                                <td>{session.rejectionReason}</td>
                                                <td>{session.feedback}</td>

                                                <td>
                                                    <button
                                                        onClick={() => handleNewRequest(session)}
                                                        className="btn btn-ghost ">
                                                        <VscGitPullRequestGoToChanges className="text-2xl" />
                                                    </button>
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

export default AllStudySession;