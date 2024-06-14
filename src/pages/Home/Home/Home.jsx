import HelmetHook from "../../../hooks/HelmetHook";
import Banner from "../Banner/Banner";
import Sessions from "../Sessions/Sessions";
import Tutors from "../Tutors/Tutors";


const Home = () => {
    return (
        <>
            <HelmetHook name={"Home"}></HelmetHook>
            
            <Banner></Banner>
            <Sessions></Sessions>
            <Tutors></Tutors>
        </>
    );
};

export default Home;