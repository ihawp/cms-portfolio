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
                    <p className="max-w-120 opacity-90">Building dependable full-stack applications and websites with attention to detail and a focus on functionality.</p>
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
                    Hello, my name is Warren Chemerika, I am a Web Developer based in Vancouver, BC, with a strong background 
                    in front-end development and growing experience across the full stack. My interest in 
                    programming started in grade 7, when I taught myself HTML, CSS, and basic JavaScript to 
                    build small Counter-Strike websites. During high school I took each computer science course available, 
                    in these courses I experimented with Python and Java, one year receiving the school’s 
                    IT award. After high school, I attended the University of Saskatchewan for a time, taking courses in 
                    computer science, psychology, and health sciences—giving me a broader understanding of both people 
                    and technology. Now, I have focused my path on web development, completing certifications 
                    at Saskatchewan Polytechnic and BCIT, both with strong results through practical, project-based learning.
                </p>

                <p>
                    Professionally, I have contributed to projects in both freelance and agency environments, gaining hands-on 
                    experience with technologies such as WordPress, React, Node.js, and GraphQL. In addition to client work, I 
                    develop and maintain personal projects featured on my portfolio site, ihawp.com. My development approach 
                    emphasizes performance optimization, maintainable code, and responsive design to ensure reliable and scalable 
                    applications.
                </p>

                <p> 
                    Beyond technical ability, I bring a strong problem-solving instinct and a drive to improve with
                    every project completed. While much of my growth has come through independent learning and experimentation, I thrive
                    in team environments where ideas are shared freely and quality is a shared priority. I'm particularly
                    motivated when working alongside others who are equally invested in building thoughtful, high-standard
                    solutions. I find it imperative to take ownership of my work, adapt to challenges
                    quickly, and stay focused on delivering reliable, well-executed results. 
                    I believe that every moment of life is an opportunity to learn.
                </p>

            </div>

        </section>
        
    </>
}

export default Home;