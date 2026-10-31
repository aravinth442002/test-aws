import { useState } from 'react'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    pickupLocation: '',
    dropLocation: '',
    tripType: 'City Ride',
    travelDate: '',
    returnDate: '',
    passengers: 1,
    specialRequests: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number'
    }
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup Location is required'
    if (!formData.dropLocation.trim()) newErrors.dropLocation = 'Drop Location is required'
    if (!formData.travelDate) newErrors.travelDate = 'Travel Date is required'
    if (formData.tripType === 'Outstation Round Trip' && !formData.returnDate) {
      newErrors.returnDate = 'Return Date is required for round trips'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    const templateParams = {
      fullName: formData.fullName,
      mobileNumber: formData.mobileNumber,
      emailAddress: formData.emailAddress || 'Not provided',
      tripType: formData.tripType,
      pickupLocation: formData.pickupLocation,
      dropLocation: formData.dropLocation,
      travelDate: formData.travelDate,
      returnDate: formData.returnDate || 'N/A',
      passengers: formData.passengers,
      specialRequests: formData.specialRequests || 'None',
    }

    // Replace these with your actual EmailJS IDs or set them in a .env file
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

    if (serviceId === 'YOUR_SERVICE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      console.warn("EmailJS credentials are missing! Form data:", templateParams);
      toast.error('EmailJS is not configured yet. Please configure the IDs in .env file.')
      setIsSubmitting(false)
      return;
    }

    emailjs.send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    })
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text)
        toast.success('Thank you! We\'ll reach out within 30 minutes.')
        setIsSubmitting(false)
        setFormData({
          fullName: '',
          mobileNumber: '',
          emailAddress: '',
          pickupLocation: '',
          dropLocation: '',
          tripType: 'City Ride',
          travelDate: '',
          returnDate: '',
          passengers: 1,
          specialRequests: ''
        })
      })
      .catch((err) => {
        console.error('FAILED...', err)
        toast.error('Failed to send request. Please check your EmailJS Public Key in .env file or use WhatsApp.')
        setIsSubmitting(false)
      })
  }

  return (
    <div className="w-full">
      {/* Page Hero */}
      <div className="bg-navy py-20 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 animate-fadeInUp">Book a Ride / Get in Touch</h1>
        <div className="text-gold font-medium animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Home <span className="mx-2 text-white">/</span> Contact
        </div>
      </div>

      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form Section */}
            <div className="lg:col-span-3 bg-white p-8 rounded-card shadow-card">
              <h2 className="font-display text-2xl font-bold text-navy mb-6">Send Booking Request</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} maxLength={20} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="Aravinth" />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                    <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} maxLength={10} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="9876543210" />
                    {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="aravinth@sscabs.com" />
                  </div>

                  {/* Trip Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type *</label>
                    <select name="tripType" value={formData.tripType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none bg-white">
                      <option>City Ride</option>
                      <option>Outstation One-Way</option>
                      <option>Outstation Round Trip</option>
                      <option>Airport Transfer</option>
                      <option>Tour Package</option>
                    </select>
                  </div>

                  {/* Pickup */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
                    <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="e.g. Indiranagar" />
                    {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
                  </div>

                  {/* Drop */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Drop Location *</label>
                    <input type="text" name="dropLocation" value={formData.dropLocation} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="e.g. Airport" />
                    {errors.dropLocation && <p className="text-red-500 text-sm mt-1">{errors.dropLocation}</p>}
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date *</label>
                    <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" />
                    {errors.travelDate && <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>}
                  </div>

                  {/* Return Date (Conditional) */}
                  {formData.tripType === 'Outstation Round Trip' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Return Date *</label>
                      <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" />
                      {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
                    </div>
                  )}

                  {/* Passengers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers</label>
                    <input type="number" min="1" max="10" name="passengers" value={formData.passengers} onChange={handleChange} maxLength={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none" placeholder="Any specific requirements..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-gold text-white rounded-md px-6 py-3 font-bold text-lg hover:bg-gold-dark transition-colors duration-200 active:scale-[0.99] outline-none disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Sending...' : 'Send Booking Request'}
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-navy p-8 rounded-card text-white shadow-card">
                <h3 className="font-display text-2xl font-bold mb-6 text-gold">Contact Information</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <FaPhone className="text-gold" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Call Us (24/7)</p>
                      <a href="tel:+916381304990" className="text-lg font-semibold hover:text-gold transition-colors">+91 6381304990</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <FaWhatsapp className="text-gold" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">WhatsApp</p>
                      <a href="https://wa.me/916381304990?text=Hi%20SS%20Cabs!%20I%27m%20interested%20in%20booking%20a%20ride." target="_blank" rel="noreferrer" className="text-lg font-semibold hover:text-gold transition-colors">6381304990</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <FaEnvelope className="text-gold" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <a href="mailto:sscabstaxi@gmail.com" className="text-lg font-semibold hover:text-gold transition-colors">sscab@gmail.com</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt className="text-gold" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Office Location</p>
                      <a href="https://maps.app.goo.gl/86SaaUniUSmxUBCR8" target="_blank" rel="noreferrer" className="text-lg font-semibold hover:text-gold transition-colors">Click to Google Maps</a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map Embed */}
              <div className="bg-white rounded-card overflow-hidden shadow-card h-64 relative">
                <iframe
                  title="SS Cabs Location"
                  src="https://maps.google.com/maps?q=9.1688605,78.4496094&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
