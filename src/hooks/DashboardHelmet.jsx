import { Helmet } from 'react-helmet-async';

const DashboardHelmet = ({name}) => {
    return (
        <Helmet>
            <title>Dashboard | {name}</title>
        </Helmet>
    );
};

export default DashboardHelmet;