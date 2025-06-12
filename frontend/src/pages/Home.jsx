import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import updateDocumentTitle from "../utils/updateDocumentTitle";

function Home() {

    updateDocumentTitle('Home | ihawp.com');

    return <>
    
        <Hero />

        <AboutMe />
        
    </>
}

export default Home;