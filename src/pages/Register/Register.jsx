import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import HelmetHook from "../../hooks/HelmetHook";


const Register = () => {

    const { createUser, updateUser, logOut } = useAuth()

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const hanldeRegister = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const name = form.get('name');
        const photoUrl = form.get('photoUrl');
        const role = form.get('role');
        const email = form.get('email');
        const password = form.get('password');

        if (password.length < 6) {
            toast.error('Password should be atleast 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error('Password should be atleast one uppercase characters');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            toast.error('Password should be atleast one lowercase characters');
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUser(name, photoUrl)
                    .then(() => {
                        // send data to database

                         


                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Registration Successful",
                            });
                            logOut();
                            navigate('/login')
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

        e.target.reset();
    }

    return (
        <div>
            <HelmetHook name={"Register"}> </HelmetHook>

            <div className="hero min-h-screen bg-base-200 pb-6">
                <div className="hero-content flex-col">
                    <div className="text-center mt-6 mb-6">
                        <h1 className="text-4xl font-bold">Register now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={hanldeRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Enter Your Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoUrl</span>
                                </label>
                                <input type="text" name="photoUrl" placeholder="Insert Your Photo URL here" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select name="role" defaultValue='default' className="select select-bordered">
                                    <option disabled value='default'>Select your role</option>
                                    <option>Teacher</option>
                                    <option>Student</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        placeholder="Password"
                                        className="input input-bordered w-full" required />

                                    <span className="absolute top-4 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-outline btn-primary w-full">Register</button>
                            </div>
                        </form>

                        <div className="text-center p-4">
                            <p>Already have an account? Please<Link to='/login'><button className="btn btn-link font-bold">Login</button></Link></p>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;