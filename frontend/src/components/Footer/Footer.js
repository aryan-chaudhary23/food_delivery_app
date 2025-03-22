import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-red-500 mb-4">Tomato.</h1>
          <p className="text-sm leading-relaxed mb-6">
            Discover a diverse menu crafted with the finest ingredients and culinary expertise. 
            Satisfy your cravings and elevate your dining experience, one delicious meal at a time.
          </p>
          <div className="flex gap-4">
            {/* Social Media Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Company</h2>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => window.location.href = '/'}
                className="hover:text-red-400 transition text-gray-400"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => window.location.href = '/about'}
                className="hover:text-red-400 transition text-gray-400"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => window.location.href = '/delivery'}
                className="hover:text-red-400 transition text-gray-400"
              >
                Delivery
              </button>
            </li>
            <li>
              <button
                onClick={() => window.location.href = '/privacy-policy'}
                className="hover:text-red-400 transition text-gray-400"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Get in Touch</h2>
          <ul className="space-y-3">
            <li className="hover:text-red-400 hover:cursor-pointer transition text-gray-400">
              +92-308-4900522
            </li>
            <li className="hover:text-red-400 hover:cursor-pointer transition text-gray-400">
              contact@tomato.com
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © 2024 <span className="text-red-500 font-semibold">Tomato</span> — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
