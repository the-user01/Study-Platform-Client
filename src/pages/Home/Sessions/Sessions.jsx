import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Sessions = () => {

    const axiosSecure = useAxiosSecure();

     // fetching pending approved data
     const { data: approvedStudySessions, isPending: isApprovedSessionLoading } = useQuery({
        queryKey: ['approvedStudySessions'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get("/create-session/approved")
            return res.data;
        },
    })

    console.log(approvedStudySessions);

    return (
        <div>
            
        </div>
    );
};

export default Sessions;