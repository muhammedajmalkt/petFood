import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa'; 

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white  py-28 ">
            <div className="max-w-6xl mx-auto px-5">
                <div className="flex flex-col md:flex-row justify-between">

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">About Pet Shope</h3>
                        <p>Your one-stop destination for all your pet needs. We provide the best products to keep your pets happy and healthy!</p>
                    </div>

          <div className="mb-6 md:mb-0">
               <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                    <li><a href="/" className="hover:text-gray-400">Home</a></li>
                    <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                    <li><a href="/products" className="hover:text-gray-400">Products</a></li>
                    <li><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
          </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
                            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
                            <a href="#" className="hover:text-red-500"><FaInstagram /></a>
                            <a href="#" className="hover:text-red-700"><FaPinterest /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Pet food. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
