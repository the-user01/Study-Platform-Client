import { CgNotes } from 'react-icons/cg';
import { DiMaterializecss } from 'react-icons/di';
import { FaHome, FaUsers } from 'react-icons/fa';
import { GiExplosiveMaterials } from 'react-icons/gi';
import { GrNotes } from 'react-icons/gr';
import { SiSession, SiSessionize, SiStudyverse } from 'react-icons/si';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const isTutor = false;
    const isStudent = false;

    return (
        <div className='flex'>

            {/* Sidebar */}
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn  drawer-button lg:hidden mt-6 ml-4"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg></label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-60 lg:w-72 min-h-full bg-base-200 text-base-content gap-4 lg:gap-6">


                            {/* Admin  Sidebar content here */}

                            {
                                isAdmin &&
                                <>
                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/admin-home'><FaHome></FaHome>Admin Home</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/all-users'><FaUsers></FaUsers> All Users</NavLink></li>

                                    <li className='text-sm lg:text-base  shadow-xl p-2 rounded-md'><NavLink to='/dashboard/all-sessions'><SiSession></SiSession> All Study Sessions</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/all-materials'><DiMaterializecss></DiMaterializecss> All Materials</NavLink></li>
                                </>
                            }



                            {/* Tutor  Sidebar content here */}

                            {
                                isTutor &&
                                <>
                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/student-home'><FaHome></FaHome>Tutor Home</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/create-session'><SiStudyverse></SiStudyverse> Create Study Session</NavLink></li>

                                    <li className='text-sm lg:text-base  shadow-xl p-2 rounded-md'><NavLink to='/dashboard/view-all-sessions'><SiSession></SiSession> View All Study Sessions</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/upload-materials'><GiExplosiveMaterials></GiExplosiveMaterials> Upload Materials</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/view-materials'><DiMaterializecss></DiMaterializecss> View Materials</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/view-notes'><GrNotes></GrNotes> View Notes</NavLink></li>
                                </>
                            }



                            {/* Student  Sidebar content here */}

                            {
                                isStudent &&
                                <>
                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/student-home'><FaHome></FaHome>Student Home</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/booked-session'><SiSessionize></SiSessionize> Booked Session</NavLink></li>

                                    <li className='text-sm lg:text-base  shadow-xl p-2 rounded-md'><NavLink to='/dashboard/create-note'><GrNotes></GrNotes>Create Note</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/personal-notes'><CgNotes></CgNotes> Manage Personal Notes</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/view-study-materials'><DiMaterializecss></DiMaterializecss> View Study Materials</NavLink></li>
                                </>
                            }

                            <div className="divider"></div>

                            <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><Link to='/'><FaHome></FaHome>Home</Link></li>


                        </ul>

                    </div>
                </div>
            </div>


            {/* Outlet */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;