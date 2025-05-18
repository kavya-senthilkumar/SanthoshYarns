import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import { TabTitle } from "../utils/General";


const Home = () => {
    const [ featuredItems, setFeaturedItems ] = useState()
    TabTitle("SanthoshYarns");

    useEffect(() => {
        axios.get("https://Shema-backend.vercel.app/api/items")
            .then(res => setFeaturedItems(res.data))
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [])

    return ( 
        <Fragment>
            <Landing />
            {/* <About/>
            <FeaturedCategories />
            <Shop/>
            <Contact/> */}
        </Fragment>
    );
}
 
export default Home;