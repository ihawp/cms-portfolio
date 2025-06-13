import updateDocumentTitle from "../utils/updateDocumentTitle";
import { Link } from "react-router-dom";
import { useRef } from "react";

function Home() {

    updateDocumentTitle('Home | ihawp.com');

    const aboutMe = useRef();

    const scrollToAboutMe = (e) => {
        e.preventDefault();
        aboutMe.current.scrollIntoView();
    }

    return <>
    
        {/* Hero */}
        <header className="flex flex-col items-center w-full">
            <div className="w-full md:w-180 mt-10">
                <div className="w-full flex flex-col items-start">
                    <h1 className="text-5xl font-bold">Warren Chemerika</h1>
                    <h2 className="text-3xl my-4 font-">Full-Stack Web Developer</h2>
                    <p className="max-w-120 opacity-90">I produce full-stack applications and beautiful websites that are exactly what you expected or better.</p>
                    <nav aria-label="Hero CTA Navigation" className="my-8">
                        <ul className="flex flex-row gap-4">
                            <li><Link to="/portfolio" title="Portfolio" className="px-3 py-2 bg-[#333] border border-[#444] font-semibold rounded">Portfolio</Link></li>
                            <li><a href="" className="px-3 py-2" onClick={scrollToAboutMe} title="About Me">About Me</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

        {/* About Me */}
        <section className="w-full md:w-180 flex flex-col gap-4" ref={aboutMe}>
        
            <hr className="w-5 my-4 opacity-20"></hr>

            <h2 className="text-center text-xl font-semibold mb-4">About Me</h2>

            <div className="w-full text-left gap-4 flex flex-col opacity-90">
                <p>
                    Hello! My name is Warren Chemerika. I am a Web Developer from beautiful Vancouver, British Columbia, Canada.
                    I am a professional Front-End Web Developer who spends his time building and learning about full-stack web
                    applications.
                </p>

                <p>My education consists of two 6 month certificates of Front-End Web Development.</p>
            </div>

        </section>
        
    </>
}

export default Home;