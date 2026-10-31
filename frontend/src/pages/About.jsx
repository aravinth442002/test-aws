import { FaShieldAlt, FaClock, FaHeart, FaCar } from 'react-icons/fa'
import SectionHeader from '../components/shared/SectionHeader'
import Button from '../components/shared/Button'
import Card from '../components/shared/Card'

export default function About() {
  return (
    <div className="w-full">
      {/* Page Hero */}
      <div className="bg-navy py-20 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 animate-fadeInUp">About SS Cabs</h1>
        <div className="text-gold font-medium animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Home <span className="mx-2 text-white">/</span> About Us
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">Driven by Trust and Reliability</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded with a mission to provide safe, affordable, and punctual transportation, SS Cabs has grown to become a trusted name for local and outstation travel. We believe that a journey should be as comfortable as the destination.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our fleet is constantly maintained to the highest standards, and our drivers are carefully vetted to ensure your peace of mind. Whether it's a quick trip to the mall, a daily commute, or a long-distance family vacation, we've got you covered.
              </p>
            </div>
            <div className="bg-navy-light rounded-card h-80 flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px]"></div>
              <FaCar className="text-gold text-9xl z-10 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Core Values" subtitle="What makes us different from the rest." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="p-8">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-gold text-3xl" />
              </div>
              <h3 className="font-display font-bold text-xl text-navy mb-3">Safety First</h3>
              <p className="text-gray-600">Your safety is our priority. We maintain strict hygiene and vehicle standards.</p>
            </Card>
            <Card className="p-8">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClock className="text-gold text-3xl" />
              </div>
              <h3 className="font-display font-bold text-xl text-navy mb-3">Always On Time</h3>
              <p className="text-gray-600">Punctuality is in our DNA. We value your time as much as you do.</p>
            </Card>
            <Card className="p-8">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-gold text-3xl" />
              </div>
              <h3 className="font-display font-bold text-xl text-navy mb-3">Customer Last</h3>
              <p className="text-gray-600">Friendly support, transparent billing, and a dedication to your satisfaction.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Placeholder */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Meet The Team" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mukesh Kannan.T", role: "Founder & CEO", image: "./mukesh.JPG.jpeg" },
              { name: "Vignesh.V", role: "Co-Founder", image: "./vignesh.JPG.jpeg" },
              { name: "Selvaganesh.M", role: "Customer Support Lead", image: "/selva.png" }
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-md object-cover"
                  onError={(e) => {
                    e.target.onerror = null; // prevents looping
                    e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(/\s+/g, '+')}&background=0D2340&color=D4AF37&size=128`;
                  }}
                />
                <h4 className="font-bold text-navy text-lg">{member.name}</h4>
                <p className="text-gold font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-10 bg-navy text-center px-4">
        <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">Ready for Your Next Ride?</h2>
        <p className="text-gold text-2xl font-bold mb-8">+91 6381304990</p>
        <Button to="/contact" variant="primary" className="px-10 py-3 text-lg">Contact Us</Button>
      </section>
    </div>
  )
}
