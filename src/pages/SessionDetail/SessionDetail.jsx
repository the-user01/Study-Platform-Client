import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SessionDetail = () => {
    const params = useParams();

    const axiosSecure = useAxiosSecure();

    const { data: loadSessionDetail = [] } = useQuery({
        queryKey: ["loadSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/create-session/approved/${params.id}`)
            return res.data;
        }
    })

    const regFee = parseInt(loadSessionDetail.regFee)

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content">
                    <div>

                        {/* title */}
                        <h1 className="text-5xl font-bold">{loadSessionDetail.sessionTitle}</h1>
                        <p className="py-6">{loadSessionDetail.description}</p>

                        <div className="divider"></div>

                        {/* Registration info */}
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <h2>
                                <b>Registration Start date: </b> {loadSessionDetail.regStartDate}
                            </h2>

                            <h2>
                                <b>Registration End date: </b> {loadSessionDetail.regEndDate}
                            </h2>
                        </div>

                        <div className="divider"></div>

                        {/* Class time Info */}
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <h2>
                                <b>Class Start date: </b> {loadSessionDetail.classStartDate}
                            </h2>

                            <h2>
                                <b>Class End date: </b> {loadSessionDetail.classEndDate}
                            </h2>
                        </div>

                        <div className="divider"></div>

                        {/* tutor & session info */}
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <h2>
                                <b>Session Duration: </b> {loadSessionDetail.sessionDuration} hrs
                            </h2>

                            <h2>
                                <b>Tutor Name: </b> {loadSessionDetail.tutorName}
                            </h2>
                        </div>

                        <div className="divider"></div>

                        <div>
                            {
                                regFee > 0 ?
                                    <Link 
                                    to={`/payment/${loadSessionDetail._id}`}
                                    className="btn btn-outline bg-green-700 text-white w-full">
                                        <button >Book Now</button>
                                    </Link> :

                                    <button className="btn btn-outline bg-red-700 text-white w-full">Book Now</button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionDetail;