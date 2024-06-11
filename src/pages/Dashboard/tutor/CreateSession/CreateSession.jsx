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
                        <div className="form-control md:w-full">
                            <label className="label">
                                <span className="label-text text-base">Session Description</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" name="description" placeholder="Session Description" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>

                    {/* Form Row */}
                    <div className="md:flex space-y-4 md:space-y-0">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-base">Registration Start Date</span>
                            </label>
                            <label className="input-group ">
                                <input type="date" name="registration_start_date" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base">Registration End Date</span>
                            </label>
                            <label className="input-group ">
                                <input type="date" name="registration_end_date" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>

                    {/* Form Row */}
                    <div className="md:flex space-y-4 md:space-y-0">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-base">Class Start Date</span>
                            </label>
                            <label className="input-group ">
                                <input type="date" name="class_start_date" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base">Class End Date</span>
                            </label>
                            <label className="input-group ">
                                <input type="date" name="class_end_date" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>

                    {/* Form Row */}
                    <div className="md:flex space-y-4 md:space-y-0">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-base">Session Duration</span>
                            </label>
                            <label className="input-group ">
                                <input type="number" name="session_duration" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base">Registration fee</span>
                            </label>
                            <label className="input-group ">
                                <input type="text" defaultValue={0} readOnly name="registration_fee" className="input input-bordered w-full border-2 border-blue-300" />
                            </label>
                        </div>
                    </div>

                   
                    <input type="submit" value="Create Session" className="btn btn-block bg-primary text-white" />
                </form>

            </div>

        </div>
    );
};

export default CreateSession;