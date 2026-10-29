import { FaInfoCircle } from 'react-icons/fa'
import SectionHeader from '../components/shared/SectionHeader'
import Button from '../components/shared/Button'
import Card from '../components/shared/Card'
import { pricing } from '../data/pricing'

export default function Pricing() {
  return (
    <div className="w-full">
      {/* Page Hero */}
      <div className="bg-navy py-20 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 animate-fadeInUp">Transparent Pricing, No Surprises</h1>
        <div className="text-gold font-medium animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Home <span className="mx-2 text-white">/</span> Pricing
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Tariffs" subtitle="Affordable rates tailored to your travel needs." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.map((item) => (
              <Card key={item.id} className="p-8 flex flex-col relative overflow-hidden border-t-4 border-gold">
                <h3 className="font-display font-bold text-xl text-navy mb-4">{item.service}</h3>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-gold">{item.baseRate}</span>
                  <span className="text-gray-500 font-medium">{item.unit}</span>
                </div>
                <div className="bg-gray-50 rounded py-2 px-4 inline-block mb-6 text-sm text-gray-600 font-medium w-fit">
                  {item.minCharge}
                </div>
                <ul className="space-y-3 mb-8 grow">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <FaInfoCircle className="text-gray-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button to="/contact" variant="outline" className="w-full mt-auto">Book Now</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-card border border-green-100">
              <h3 className="font-bold text-green-800 text-xl mb-4">What's Included</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Driver allowance (for city rides & packages)</li>
                <li>• Fuel charges</li>
                <li>• GST & local taxes</li>
              </ul>
            </div>
            <div className="bg-red-50 p-8 rounded-card border border-red-100">
              <h3 className="font-bold text-red-800 text-xl mb-4">What's Excluded</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Parking fees & Airport entry fees</li>
                <li>• Toll charges (for outstation)</li>
                <li>• State permit fees (for outstation)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Fleet" subtitle="Choose the right vehicle for your journey." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="p-8">
              <img src="/seden.png" alt="Sedan" className="h-32 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-xl mb-2 text-navy">Sedan</h3>
              <p className="text-gold font-medium mb-4">4 Seater</p>
              <p className="text-gray-600">Ideal for city rides, airport drops, and small family outstation trips. (Dzire, Etios)</p>
            </Card>
            <Card className="p-8">
              <img src="/suv.png" alt="SUV" className="h-32 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-xl mb-2 text-navy">SUV</h3>
              <p className="text-gold font-medium mb-4">6 Seater</p>
              <p className="text-gray-600">Perfect for extra luggage and comfortable long-distance travel. (Innova, Ertiga)</p>
            </Card>
            <Card className="p-8">
              <img src="/tempo.png" alt="Tempo Traveller" className="h-32 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-xl mb-2 text-navy">Tempo Traveller</h3>
              <p className="text-gold font-medium mb-4">12 Seater</p>
              <p className="text-gray-600">Best for group tours, corporate events, and large families.</p>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <p className="italic text-gray-500 mb-6">All prices are indicative. Contact us for exact quotes.</p>
            <Button to="/contact" variant="primary">Get a Custom Quote</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
