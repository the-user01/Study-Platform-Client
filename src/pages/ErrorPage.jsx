import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-12">404 Page Not Found</h2>
                <div className="flex justify-center mb-6 md:mb-10">
                    <img src="https://i.ibb.co/xqM43MZ/photo-1609743522653-52354461eb27.jpg" className="h-44 md:h-80 rounded-lg shadow-xl" />
                </div>
                <Link to='/'><button className="btn btn-primary">Back to Home Page</button></Link>
            </div>

        </div>
    );
};

export default ErrorPage;