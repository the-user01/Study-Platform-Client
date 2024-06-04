import { Link, NavLink } from "react-router-dom";
import demoImg from '../../assets/user.png';
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";

const Navbar = () => {

    const isAdmin = false;
    const isTutor = true;
    const isStudent = true;

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem("theme") : "light"
    );

    const handleChange = e => {
        if (e.target.checked) {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector('html').setAttribute("data-theme", localTheme);
    }, [theme])


    const { user, logOut, loader } = useAuth();

    const navList = <>
        <li className="mr-4"><NavLink to='/'>Home</NavLink></li>
        {
            user && isAdmin && <>
                <li className="mr-4"><Link to='/dashboard/admin-home'>Dashboard</Link></li>
            </>
        }
        {
            user && isTutor && <>
                <li className="mr-4"><Link to='/dashboard/tutor-home'>Dashboard</Link></li>
            </>
        }
    </>

    const handleLogOut = () => {
        logOut()
            .catch(error => console.log(error))
    }

    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navList}
                    </ul>
                </div>
                <img src="https://i.ibb.co/2t6pQmf/photo-1593882100241-aef1449fe351.jpg" alt="" className="h-10 w-10 rounded-full"/>
                <a className="btn btn-ghost text-sm md:text-xl">Knowledge Jutsu</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navList}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            {
                                loader ? <span className="loading loading-dots loading-sm"></span> :
                                    <>
                                        <div className="tooltip tooltip-bottom mr-4" data-tip={user.displayName}>
                                            <div className="avatar">
                                                <div className="w-10 md:w-12 rounded-full">
                                                    <img src={user.photoURL} />
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-primary btn-sm md:btn-md" onClick={handleLogOut}>SignOut</button>
                                    </>
                            }
                        </>
                        :
                        <>
                            {loader ? <span className="loading loading-dots loading-sm text-center"></span> :
                                <>
                                    <div className="avatar mr-4">
                                        <div className="w-12 rounded-full">
                                            <img src={demoImg} />
                                        </div>
                                    </div>
                                    <Link to='/login'><button className="btn btn-primary">Login</button></Link>
                                </>}
                        </>
                }

                <div>
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleChange} className="theme-controller" value="synthwave" />

                        {/* sun icon */}
                        <FiSun className="swap-off h-7 w-7 md:w-10 md:h-10 ml-4 mt-2 md:mt-0" />

                        {/* moon icon */}
                        <IoMoonOutline className="swap-on fill-current  h-7 w-7 md:w-10 md:h-10 ml-4 mt-2 md:mt-0" />

                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;