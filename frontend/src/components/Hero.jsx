function Hero() {

    return <header className="flex flex-col items-center">

        <div className="w-screen md:w-190 xl:w-300">
            <div>
                <h1>Warren Chemerika</h1>
                <h2>Some other text</h2>
                <p>Some paragraph text</p>
                <nav aria-label="Hero CTA Navigation">
                    <ul>
                        <li><button>Portfolio</button></li>
                        <li><button>About Me</button></li>
                    </ul>
                </nav>
            </div>

            <div>
                right side content
            </div>
        </div>

    </header>
}

export default Hero;