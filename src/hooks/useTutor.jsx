import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTutor = () => {
    const {user, token} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: isTutor, isLoading: isTutorLoading} = useQuery({
        queryKey: [user?.email, 'isTutor'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/tutor/${user.email}`);
            return res.data?.tutor;
        },
        enabled: !!user?.email && !!token
    })

    return [isTutor, isTutorLoading]
};

export default useTutor;