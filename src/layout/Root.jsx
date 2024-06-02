import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const Root = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ScrollRestoration></ScrollRestoration>
        </>
    );
};

export default Root;