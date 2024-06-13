import Swal from "sweetalert2";
import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CreateNote = () => {
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure();

    const handleCreateNote = (e) => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const title = form.title.value;
        const description = form.description.value;

        const noteInfo = {
            email,
            title,
            description,
        }

        axiosSecure.post('/notes', noteInfo)
        .then(()=>{
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Note Created Successfully",
            });

            form.reset();
        })
    }


    return (
        <div>
            <DashboardHelmet name='Create Note'></DashboardHelmet>

            <div>
                <div>
                    <h2 className="text-xl lg:text-3xl">Create Your Personal Note</h2>
                </div>

                <div>
                    <form className="space-y-4 mt-6" onSubmit={handleCreateNote}>


                        {/* Form Row */}
                        <div className="md:flex space-y-4 md:space-y-0">
                            <div className=" md:w-1/4">
                                <label className="label">
                                    <span className="label-text text-base">Email</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" name="email" defaultValue={user.email} placeholder="Email" readOnly className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>
                        </div>

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

                            <div className="form-control md:w-full ">
                                <label className="label">
                                    <span className="label-text text-base">Description</span>
                                </label>
                                <label
                                    className="input-group ">
                                    <textarea name="description" className="input input-bordered w-full border-2 border-blue-300"></textarea>
                                </label>
                            </div>
                        </div>

                        <input type="submit" value="Create Note" className="btn btn-block bg-primary text-white" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;