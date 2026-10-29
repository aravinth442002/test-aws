import { FaCheckCircle } from 'react-icons/fa'
import SectionHeader from '../components/shared/SectionHeader'
import Button from '../components/shared/Button'
import Card from '../components/shared/Card'
import { services } from '../data/services'

export default function Services() {
  return (
    <div className="w-full">
      {/* Page Hero */}
      <div className="bg-navy py-20 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 animate-fadeInUp">Our Services</h1>
        <div className="text-gold font-medium animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Home <span className="mx-2 text-white">/</span> Services
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Transportation Solutions For Every Need" subtitle="From quick city drops to multi-day outstation trips, we have the right vehicle and package for you." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service) => (
              <Card key={service.id} className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <service.icon className="text-gold text-3xl" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-navy">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 grow">{service.description}</p>
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h4 className="font-semibold text-navy mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-gold mt-1 shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button to="/contact" variant="primary" className="w-full">Book This Service</Button>
              </Card>
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
