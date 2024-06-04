import { FaHome, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            {/* Sidebar */}
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content gap-4 lg:gap-6">


                            {/* Admin  Sidebar content here */}

                            <li className='text-base lg:text-lg shadow-xl p-2 rounded-md'><Link to='/'><FaHome></FaHome> Home</Link></li>
                            <li className='text-base lg:text-lg shadow-xl p-2 rounded-md'><NavLink to='/all-users'><FaUsers></FaUsers> All Users</NavLink></li>
                            <li className='text-base lg:text-lg shadow-xl p-2 rounded-md'><NavLink to='/all-sessions'><FaUsers></FaUsers> All Study Sessions</NavLink></li>
                            <li className='text-base lg:text-lg shadow-xl p-2 rounded-md'><NavLink to='/all-materials'><FaUsers></FaUsers> All Materials</NavLink></li>


                        </ul>

                    </div>
                </div>
            </div>


            {/* Outlet */}
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;