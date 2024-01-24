import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { useRef } from "react";

function App() {
    const aboutRef = useRef(null);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <nav id="header" className="sticky w-full z-10 top-0 bg-silver-300">
                <div className="w-full md:max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 sm:flex-0 items-center justify-between mt-0 py-3 bg-gray-200">
                    <div className="sm:pl-4 flex-1">
                        <Link className="flex items-center gap-2" to="/">
              <span className="text-gray-900 no-underline hover:italic font-extrabold text-xl">
                Car Overview
              </span>
                        </Link>
                    </div>
                    <div className="flex justify-end flex-1 bg-gray-100 z-20 gap-4 flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20">
                        <Link className="text-gray-600 no-underline hover:text-green-600 py-2 px-4" to="/" onClick={scrollToTop}>
                            Home
                        </Link>
                        <Link className="cursor-pointer text-gray-600 no-underline hover:text-green-600 py-2 px-4 font-bold" to="/cars" onClick={scrollToTop}>
                            Cars
                        </Link>
                        <a className="text-gray-600 no-underline hover:text-green-600 py-2 px-4" onClick={scrollToAbout}>
                            About
                        </a>
                    </div>
                </div>
            </nav>

            <div id="main" className="container w-full md:max-w-3xl mx-auto pt-4">
                <Outlet/>
            </div>

            <footer className="mt-8" ref={aboutRef}>
                <div className="container max-w-4xl mx-auto flex py-8">
                    <div className="w-full mx-auto flex flex-wrap">
                        <div className="flex w-full">
                            <div className="px-8">
                                <h3 className="font-bold text-gray-900">About</h3>
                                <p className="py-4 text-gray-600 text-sm">
                                    On this website you will find an overview of information about cars. We
                                    strive to provide a comprehensive collection of data, allowing you to learn more
                                    about different car models and technical specifications.
                                </p>
                                <p className="py-4 text-gray-600 text-sm">
                                    Additionally, we offer the opportunity to contribute information. If you have
                                    additional details about a particular car model or want to share interesting facts,
                                    feel free to contribute.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default App;