import { Link } from 'react-router-dom'
import { FaWhatsapp, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Col 1 */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/transport.png" alt="SS Cabs Logo" className="h-10 w-auto" />
              <span className="font-display font-bold text-3xl">SS Cabs</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Safe, punctual, and comfortable rides across the city and beyond. Your trusted travel partner.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold transition-colors text-xl"><FaWhatsapp /></a>
              <a href="#" className="text-white hover:text-gold transition-colors text-xl"><FaFacebook /></a>
              <a href="https://www.instagram.com/ss_tours_travels__/" target='_blank' className="text-white hover:text-gold transition-colors text-xl"><FaInstagram /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6 text-gold">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaPhone className="text-gold mt-1" />
                <div>
                  <p className="text-gray-300">Call Us (24/7)</p>
                  <a href="tel:+916381304990" className="font-semibold">+91 6381304990</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-gold mt-1" />
                <div>
                  <p className="text-gray-300">Email Us</p>
                  <a href="mailto:sscabstaxi@gmail.com" className="font-semibold">sscabstaxi@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold mt-1" />
                <div>
                  <p className="text-gray-300">Location</p>
                  <p className="font-semibold">Ramanathapuram, Tamil Nadu</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SS Cabs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
