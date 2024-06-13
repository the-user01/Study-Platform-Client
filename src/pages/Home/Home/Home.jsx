import HelmetHook from "../../../hooks/HelmetHook";
import Banner from "../Banner/Banner";
import Sessions from "../Sessions/Sessions";


const Home = () => {
    return (
        <>
            <HelmetHook name={"Home"}></HelmetHook>
            
            <Banner></Banner>
            <Sessions></Sessions>
        </>
    );
};

export default Home;