import { useQuery } from "@tanstack/react-query";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
const StudyMaterials = () => {

    const axiosSecure = useAxiosSecure();

    const { data: viewMaterials = [], isPending: isviewMaterialsLoading, refetch } = useQuery({
        queryKey: ['rejectedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/study-material")
            return res.data;
        },
    })


    return (
        <div>
            <DashboardHelmet name='Study Materials'></DashboardHelmet>

            <div>
                <div>
                    <h2 className="text-xl lg:text-3xl">All Uploaded Materials</h2>
                </div>

                <div className="mt-12">

                    {!isviewMaterialsLoading ?
                        viewMaterials.map(material =>
                            <div key={material._id} className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={material.image} alt={material.title} /></figure>
                                <div className="card-body">

                                    <h2 className="card-title">{material.title} </h2>

                                    <div className="space-y-2 mb-2">
                                        <a href={material.links} className="underline text-blue-500" target="_blank">Source Link</a>

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

export default StudyMaterials;