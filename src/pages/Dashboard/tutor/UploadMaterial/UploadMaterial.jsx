import { useQuery } from '@tanstack/react-query';
import DashboardHelmet from '../../../../hooks/DashboardHelmet';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UploadMaterial = ({params}) => {

    const axiosSecure = useAxiosSecure();

    const {data: loadSessions} = useQuery({
        queryKey: ["loadSessions"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/create-session/approved/${params}`)
            return res.data
        }
    })

    console.log(loadSession);


    return (
        <div>
            <DashboardHelmet name='Upload Material'></DashboardHelmet>
            Upload Material
        </div>
    );
};

export default UploadMaterial;