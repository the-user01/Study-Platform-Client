import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import DashboardHelmet from '../../../../hooks/DashboardHelmet';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UploadMaterial = () => {

    const params = useParams();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const { data: loadSessions = [] } = useQuery({
        queryKey: ["loadSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/create-session/approved/${params.id}`)
            return res.data;
        }
    })

    const handleUploadMaterial = async (data) => {
        const imageFile = { image: data.image[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const materials = {
                title: data.title,
                sessionId: data.session_id,
                tutorEmail: data.tutor_email,
                links: data.links,
                image: res.data.data.display_url,
            }

            const materialUpload = await axiosSecure.post("/study-material", materials)

            if (materialUpload.data.insertedId) {
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Material Uploaded Successfully",
                });

            }
        }

    }




    return (
        <div>
            <DashboardHelmet name='Upload Material'></DashboardHelmet>
            <div>
                <h2 className="text-xl lg:text-2xl">Upload Material Of <b> {loadSessions.sessionTitle}</b></h2>
            </div>

            <div className='mt-8'>

                <form className="space-y-4 mt-6" onSubmit={handleSubmit(handleUploadMaterial)}>
                    {/* Form Row */}
                    <div className="md:flex items-center space-y-4 md:space-y-0">
                        <div className="form-control md:w-full">
                            <label className="label">
                                <span className="label-text text-base">Title</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" {...register("title")} placeholder="Title" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>


                    </div>

                    {/* Form Row */}
                    <div className="md:flex space-y-4 md:space-y-0">
                        <div className=" md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-base">Sesssion Id</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" {...register("session_id")}
                                    defaultValue={loadSessions._id} readOnly className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                        <div className=" md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base">Tutor Email</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" {...register("tutor_email")} defaultValue={loadSessions.tutorEmail} readOnly className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>

                    {/* Form Row */}
                    <div className="md:flex space-y-4 md:space-y-0">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-base">Upload Image</span>
                            </label>
                            <label className="input-group ">
                                <input type="file" {...register("image")} className="input input-bordered w-full pt-2" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
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
        </div>
    );
};

export default UploadMaterial;