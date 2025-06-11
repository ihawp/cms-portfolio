import { Link } from "react-router-dom";

function Hero() {

    return <header className="flex flex-col items-center w-full">

        <div className="w-full md:w-180 mt-10">
            <div className="w-full flex flex-col items-start">
                <h1 className="text-5xl font-bold">Warren Chemerika</h1>
                <h2 className="text-3xl my-4">Full-Stack Web Developer</h2>
                <p className="max-w-120">I produce full-stack applications and beautiful websites that are exactly what you expected or better.</p>
                <nav aria-label="Hero CTA Navigation" className="my-8">
                    <ul className="flex flex-row gap-4">
                        <li><Link to="/portfolio" title="Portfolio" className="px-3 py-2 bg-[#ff69b4] border border-[#111] font-semibold rounded">Portfolio</Link></li>
                        <li><a href="" className="px-3 py-2" title="About Me">About Me</a></li>
                    </ul>
                </nav>
            </div>
        </div>

    </header>
}

export default Hero;