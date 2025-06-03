import 'react';
import './Navbar.css'
import bac from "./bac.jpg"
import down from "./down.jpg";
import {FaInstagram} from 'react-icons/fa';
import {FaFacebook} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';
import Spinner from '../Spinner/Spinner.tsx';
import { useState } from "react";



function Navbar() {
    const [isLoading, setIsLoading] = useState(false);

    const handleEmergencyClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            window.open('/Emergency', '_blank');
            setIsLoading(false);
        }, 2000);
    }

    const handleEmergencyClicks = () => {
        setIsLoading(true);
        setTimeout(() => {
            window.open('/Tabfind', '_blank');
            setIsLoading(false);
      }, 2000);}

        const handleEmergencyClickss = () => {
            setIsLoading(true);
            setTimeout(() => {
                window.open('/Navbar', '_blank');
                setIsLoading(false);
            }, 2000);
    };
return (
    <>
    {isLoading && <Spinner isLoading={isLoading} />}
    <nav className='navi'>
        <label className="checkbtn">
            <i className="fas fa-bars"></i>
        </label>
        <label className="logo">
        <img src={bac} className="imga" alt="Logo" />
        </label>
        <ul>
        <li>
            <a href="#" className="active">
                Home
            </a>
        </li>
        <li className="dropdown">
            <a href="#">Services</a>
            <div className="dropdown-content">
            <a onClick={handleEmergencyClickss} className="Title">🧑‍🔧 Services 🧑‍🔧</a>
            </div>
            </li>
        <li>
            <a href="#">About Us</a>
            </li>
            <li>
            <a href="#">Contact Us</a>
            </li>
        </ul>
        </nav>
        <div className="container">
        <div className="row">
            <div className="column-66">
            <h1 className="xlarge-font">
                <b>EmAI</b>
            </h1>
            <h1 className="large-font" style={{ color: "gray" }}>
                <b>The Greatest Wealth is Health</b>
            </h1>
            <p>
                <span style={{ fontSize: "33px" }}>
                E-Medicare revolutionizes healthcare delivery through AI-driven
                solutions,
                </span>{" "}
                enhancing appointment scheduling, real-time patient monitoring,
                and personalized treatment plans. The platform ensures secure
                medical records, inclusive interfaces, and seamless provider
                collaboration for efficient, accessible, and holistic care.
            </p>
            </div>
            <div className="column-33">
            <img src={bac} alt="background" />
            </div>
        </div>
        </div>
      {/* Services Section */}
        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
            <div className="row">
            <div className="column-33">
            <img src={down} alt="App" width="400" height="471" />
                </div>
            <div className="column-66">
            <h1 className="xlarge-font">
                <b>Services</b>
            </h1>
            <a onClick={handleEmergencyClickss} className="Title">🧑‍🔧 Services 🧑‍🔧</a>
            </div>
        </div>
        </div>
      {/* About Us Section */}
        <div className="containers">
        <div className="rows">
        <div className="column-66">
            <h1 className="xlarge-font">
            <b>About Us</b>
            </h1>
            <h1 className="large-font" style={{ color: "gray" }}>
                <b>Kelsys Technologies</b>
            </h1>
            <p>
                <span style={{ fontSize: "36px" }}>Follow for Future Updates</span>
            </p>
            <div className="icons-container">
            <i className="lol"><FaLinkedin /></i>
                <i className="lol"><FaInstagram /></i>
                <i className="lol"> <FaGithub /></i>
                <i className="lol"><FaFacebook /></i>
            </div>
            </div>
        </div>
        </div>
    </>
);
}

export default Navbar;
