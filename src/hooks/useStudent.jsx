import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStudent = () => {
const {user, token} = useAuth();
const axiosSecure = useAxiosSecure();

const {data: isStudent, isPending: isStudentLoading} = useQuery({
    queryKey: [user?.email, 'isStudent'],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/users/student/${user.email}`)
        return res.data?.student;
    },
    enabled: !!user?.email && !!token
})

return [isStudent, isStudentLoading]

};

export default useStudent;