import React from "react";
import { ImLocation2 } from "react-icons/im";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact footer-div">
        <div className="phone">
          <p>
            <AiFillPhone className="footer-icon" />
            +44 7868 719814
          </p>
        </div>
        <div className="email footer-div">
          <p>
            <MdEmail className="footer-icon" />
            info@lottowinstar.co.uk
          </p>
        </div>
      </div>
      <div className="adress footer-div">
        <p>
          <ImLocation2 className="footer-icon" />
          Office- 3358 Perigrine Road, Hainault, Ilford, Essex, United Kingdom
        </p>
      </div>
      <div className="copy-right">
        <p>Copyright &copy;{new Date().getFullYear()} Super Luckey 3 Pick.</p>
      </div>
    </div>
  );
};

export default Footer;
