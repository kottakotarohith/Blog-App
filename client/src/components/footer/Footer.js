import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="section bg-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Information
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <button>Pages</button>
                </li>
                <li>
                  <button>Our Team</button>
                </li>
                <li>
                  <button>Features</button>
                </li>
                <li>
                  <button>Pricing</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Resources
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <button>Wikipedia</button>
                </li>
                <li>
                  <button>React Blog</button>
                </li>
                <li>
                  <button>Terms &amp; Service</button>
                </li>
                <li>
                  <button>Angular Dev</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">Help</h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <button>Sign Up</button>
                </li>
                <li>
                  <button>Login</button>
                </li>
                <li>
                  <button>Terms of Service</button>
                </li>
                <li>
                  <button>Privacy Policy</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="">
              <h6 className="footer-heading text-uppercase text-white">
                Contact Us
              </h6>
              <p className="contact-info mt-4">
                Contact us if you need help with anything
              </p>
              <p className="contact-info">+91 9999999999</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="footer-alt mb-0 f-14">2019 © VNR, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
