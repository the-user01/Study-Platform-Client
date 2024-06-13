import React from 'react';
import DashboardHelmet from '../../../../hooks/DashboardHelmet';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllMaterials = () => {

    const axiosSecure = useAxiosSecure();

    const { data: viewMaterials = [], isPending: isviewMaterialsLoading, refetch } = useQuery({
        queryKey: ['rejectedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/study-material")
            return res.data;
        },
    })

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
            <DashboardHelmet name='All Materials'></DashboardHelmet>

            <div>
                <div>
                    <h2 className="text-xl lg:text-3xl">All Uploaded Materials</h2>
                </div>

                <div className="mt-8">
                    {!isviewMaterialsLoading ?
                        viewMaterials.map(material =>
                            <div key={material._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={material.image} alt="Shoes" /></figure>
                                <div className="card-body">

                                    <h2 className="card-title">{material.title} </h2>

                                    <div className="space-y-2 mb-2">
                                        <a href={material.links} className="underline text-blue-500" target="_blank">Source Link</a>

                                        <p><b>Session Id: </b> {material.sessionId}</p>

                                    </div>

                                    <div className="card-actions flex items-center justify-center mt-2">
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
        </div>
    );
};

export default AllMaterials;