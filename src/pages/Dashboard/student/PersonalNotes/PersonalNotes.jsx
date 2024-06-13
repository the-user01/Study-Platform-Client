import Swal from "sweetalert2";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";

const PersonalNotes = () => {

    const axiosSecure = useAxiosSecure();

    const { data: viewNotes = [], isPending: isviewNotesLoading, refetch } = useQuery({
        queryKey: ['rejectedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/notes")
            return res.data;
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        document.getElementById('update-material').close();

        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Note Updated Successfully",
        });
    }

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: `Note has been deleted.`,
                    icon: "success"
                });

            }
        });
    }


    return (
        <div>
            <DashboardHelmet name='Personal Notes'></DashboardHelmet>


            <div>
                <h2 className="text-xl lg:text-3xl">All Created Notes</h2>
            </div>

            <div className="mt-8">
                {!isviewNotesLoading ?
                    viewNotes.map(note =>
                        <div key={note._id} className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">

                                <h2 className="card-title">{note.title} </h2>

                                <div className="space-y-2">
                                    <p>{note.description}</p>

                                </div>

                                <div className="divider"></div>

                                <div className="card-actions flex justify-between ">

                                    <button
                                        onClick={() => document.getElementById('update-material').showModal()}
                                        className="btn btn-sm btn-outline bg-yellow-300"><FaEdit></FaEdit> Update</button>

                                    <button
                                        onClick={handleDelete}
                                        className="btn btn-sm btn-outline bg-red-400"><FaTrash></FaTrash> Delete</button>
                                </div>
                            </div>
                        </div>
                    ) :
                    <span className="loading loading-dots loading-lg"></span>
                }
            </div>

            <dialog id="update-material" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Update!</h3>
                    <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                        {/* Form Row */}
                        <div className="md:flex items-center space-y-4 md:space-y-0">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">Title</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" name="title" placeholder="Title" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>


                        </div>

                        {/* Form Row */}
                        <div className="md:flex space-y-4 md:space-y-0">
                            <div className=" md:w-full ">
                                <label className="label">
                                    <span className="label-text text-base">Description</span>
                                </label>
                                <label className="input-group ">
                                        <textarea
                                        name="description"
                                        className="input input-bordered w-full border-2 border-blue-300"></textarea>
                                </label>
                            </div>

                        </div>

                        <input type="submit" value="Upload Note" className="btn btn-block bg-primary text-white" />
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default PersonalNotes;