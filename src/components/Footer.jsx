import { Link } from "react-router-dom";
// import Logo from '../assets/Logo.png'
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  // FaPinterest,
  // FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
        {/* info */}
        <div className="mb-6 md:mb-0">
          {/* <Link to="/">
            <img src="/Ekart.png" alt="" className="w-32" />
          </Link> */}
          <p className="mt-2 text-sm">
            Bringing elegance to your dining table with premium-quality
            crockery.
          </p>
          <p className="mt-2 text-sm">
            Digamber crockery, nera Indian Coffee House, Sadar Road
            Jabalpur,Madhya Pradesh
          </p>
          <p className="text-sm">Email: rishuzzworld@gmail.com</p>
          <p className="text-sm">Phone: 9302568817</p>
        </div>
        {/* customer service link */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        {/* social media links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.facebook.com/share/18xbSrxxeb/?mibextid=wwXlfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/digambermart?sktn=MWo1NXlvb3RvajJxeg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://chat.whatsapp.com/lnl9Z1MBkLxHEks1Eqp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <FaWhatsapp size={24} />
            </a>
            
          </div>
        </div>
        {/* newsletter subscription */}
        <div>
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form action="" className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 rounded-r-md hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* bottom section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-pink-600">EKart</span>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
