import { useQuery } from "@tanstack/react-query";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";

const StudySessions = () => {
    const [title, setTitle] = useState("");
    const [newSession, setNewSession] = useState();
    const axiosSecure = useAxiosSecure();

    // fetching pending session data
    const { data: studySessions, isPending: isSessionLoading, refetch } = useQuery({
        queryKey: ['studySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/create-session/pending")
            return res.data;
        },
    })

    // fetching pending approved data
    const { data: approvedStudySessions, isPending: isApprovedSessionLoading } = useQuery({
        queryKey: ['approvedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/create-session/approved")
            return res.data;
        },
    })

    const handleRejectModal = (session) => {
        document.getElementById('rejection').showModal();
        setTitle(session.sessionTitle);
        setNewSession(session);
    }

    // reject button
    const handleReject = (e, session) => {
        e.preventDefault();

        const form = e.target;
        const rejectionReason = form.regection_reason.value;
        const feedback = form.feedback.value;
        document.getElementById('rejection').close();
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
                axiosSecure.patch(`/create-session/reject/${session._id}`, {rejectionReason, feedback})
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: `${session.sessionTitle} has been rejected.`,
                                icon: "success",
                            });

                            form.reset();
                            
                        }
                    })

            }
        });
    }

    // handling modal
    const handleOpenModal = (session) => {
        document.getElementById('my_modal_3').showModal();
        setTitle(session.sessionTitle);
        setNewSession(session);
    }


    const handleApprove = (e, session) => {
        e.preventDefault();

        const form = e.target;
        const regFee = form.registration_fee.value;

        axiosSecure.patch(`/create-session/approve/${session._id}`, { regFee })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Approved!",
                        text: `${session.sessionTitle} has been approved.`,
                        icon: "success",
                    });
                    form.reset();
                    document.getElementById('my_modal_3').close();
                }
            })
    }

    refetch();



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
                                                onClick={() =>
                                                    handleOpenModal(session)
                                                }
                                                className="btn btn-ghost ">
                                                <FcApprove className="text-xl "></FcApprove>
                                                Approve</button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleRejectModal(session)}
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

                {/* This is for approval */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <h3 className="font-bold text-lg">{title}</h3>

                        <form onSubmit={(e) => handleApprove(e, newSession)}>
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">Session fee (If the session is free then put 0)</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" name="registration_fee" placeholder="Session Fee" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>
                            <input type="submit" value="Update" className="mt-4 btn btn-block bg-primary text-white" />
                        </form>

                    </div>
                </dialog>


                {/*This modal is for rejection */}
                <dialog id="rejection" className="modal">
                    <div className="modal-box">

                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">{title}</h3>

                        <form onSubmit={(e)=>handleReject(e,newSession)}>
                            <div className="form-control md:w-full">
                                <label className="input-group mt-4">
                                    <input type="text" name="regection_reason" placeholder="Rejection Reason" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>
                            <div className="form-control md:w-full">
                                <label className="input-group mt-4">
                                    <input type="text" name="feedback" placeholder="Feedback" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>
                            <input type="submit" value="Submit" className="mt-4 btn btn-block bg-primary text-white" />
                        </form>
                    </div>
                </dialog>
            </div>

            {/* Showing Approved Sessions */}
            <div className="mt-10">
                <div>
                    <h2 className="text-xl lg:text-3xl text-green-700">Approved Sessions</h2>
                </div>

                <div className="mt-8">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isApprovedSessionLoading ?
                                    approvedStudySessions.map((session, idx) =>
                                        <tr key={session._id}>
                                            <th> {idx + 1}</th>
                                            <td>{session.sessionTitle}</td>

                                            <td>
                                                <button
                                                    className="btn btn-ghost ">
                                                    <FaRegEdit className="text-lg "></FaRegEdit>
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-ghost ">
                                                    <FaTrash className="text-lg text-red-600 "></FaTrash>
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


    );
};

export default StudySessions;