import { useQuery } from "@tanstack/react-query";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ViewMaterials = () => {

    const axiosSecure = useAxiosSecure();

    const { data: viewMaterials = [], isPending: isviewMaterialsLoading, refetch } = useQuery({
        queryKey: ['rejectedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/study-material")
            return res.data;
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        document.getElementById('update-material').close();

        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Material Updated Successfully",
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
                    text: `Material has been deleted.`,
                    icon: "success"
                });

            }
        });
    }


    return (
        <div>
            <DashboardHelmet name='View Materials'></DashboardHelmet>

            <div>
                <div>
                    <h2 className="text-xl lg:text-3xl">All Uploaded Materials</h2>
                </div>

                <div className="mt-8">
                    {!isviewMaterialsLoading ?
                        viewMaterials.map(material =>
                            <div key={material._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={material.image} alt={material.title} /></figure>
                                <div className="card-body">

                                    <h2 className="card-title">{material.title} </h2>

                                    <div className="space-y-2 mb-2">
                                        <a href={material.links} className="underline text-blue-500" target="_blank">Source Link</a>

                                        <p><b>Session Id: </b> {material.sessionId}</p>

                                    </div>

                                    <div className="card-actions flex justify-between mt-2">

                                        <button
                                            onClick={() => document.getElementById('update-material').showModal()}
                                            className="btn btn-outline bg-yellow-300"><FaEdit></FaEdit> Update</button>

                                        <button
                                            onClick={handleDelete}
                                            className="btn btn-outline bg-red-400"><FaTrash></FaTrash> Delete</button>
                                    </div>
                                </div>
                            </div>
                        ) :
                        <span className="loading loading-dots loading-lg"></span>
                    }
                </div>
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
                                    <span className="label-text text-base">Sesssion Id</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" name="session_id"
                                        className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>

                        </div>

                        {/* Form Row */}
                        <div className="space-y-4 md:space-y-0">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">Upload Image</span>
                                </label>
                                <label className="input-group ">
                                    <input type="file" name="image" className="input input-bordered w-full pt-2" />
                                </label>
                            </div>
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">Links</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" name="links" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>
                        </div>


                        <input type="submit" value="Upload Material" className="btn btn-block bg-primary text-white" />
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ViewMaterials;