import DashboardHelmet from "../../../../hooks/DashboardHelmet";
import useAuth from "../../../../hooks/useAuth";

const CreateSession = () => {
    const { user } = useAuth();

    return (
        <div>
            <DashboardHelmet name='Create Session'></DashboardHelmet>
            <div>
                <h2 className="text-xl lg:text-3xl">Create Session</h2>
            </div>

            <div>
                <form className="space-y-4 mt-6" >
                    {/* Form Row */}
                    <div className="md:flex items-center space-y-4 md:space-y-0">
                        <div className="form-control md:w-full">
                            <label className="label">
                                <span className="label-text text-base">Session Title</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" name="session_title" placeholder="Session Title" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>


                    </div>

                    {/* Form Row */}
                    <div className="md:flex space-y-4 md:space-y-0">
                        <div className=" md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-base">Tutor Name</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" name="tutor_name" defaultValue={user.displayName} placeholder="Tutor Name" readOnly className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                        <div className=" md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base">Tutor Email</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" name="tutor_email" defaultValue={user.email} placeholder="Tutor Email" readOnly className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>

                    {/* Form Row */}
                    <div className="md:flex space-y-4 md:space-y-0">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-base">Rating</span>
                            </label>
                            <select className="select border-2 border-blue-300 w-full" name='rating'>
                                <option></option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>

                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base">Short Description</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" name="description" placeholder="Short Description" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>

                    {/* Form Row */}
                    <div >
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-base">Book Image</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Add Book" className="btn btn-block bg-primary text-white" />
                </form>

            </div>

        </div>
    );
};

export default CreateSession;