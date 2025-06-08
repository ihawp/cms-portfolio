function Footer() {
    return <footer className="text-center flex flex-col justify-center items-center gap-4 my-10">

        <img src="/ihawp-com-logo.svg" alt="ihawp.com Logo" title="ihawp.com Logo" />

        <p>&copy; ihawp.com {new Date().getFullYear()}</p>

    </footer>
}

export default Footer;