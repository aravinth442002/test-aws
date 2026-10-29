import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IoCall } from 'react-icons/io5'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <img src="/transport.png" alt="SS Cabs Logo" className="h-8 w-auto" />
            <span className="font-display text-navy font-bold text-2xl">SS Cabs</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-16">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-bold transition-colors hover:text-gold ${isActive ? 'text-gold border-b-2 border-gold pb-1' : 'text-charcoal'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Link to="/contact" className="bg-gold text-white rounded px-5 py-2 font-semibold hover:bg-gold-dark transition-colors duration-200 active:scale-[0.98] inline-flex items-center gap-2">
              <IoCall /> Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-navy text-2xl focus:outline-none">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 bg-white shadow-lg border-t' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md font-bold ${isActive ? 'bg-navy/5 text-gold' : 'text-charcoal hover:bg-gray-50'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-4 bg-gold text-white rounded px-5 py-2 font-semibold hover:bg-gold-dark"
          >
            <IoCall /> Book Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
