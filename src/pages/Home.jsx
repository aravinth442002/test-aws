import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaClock, FaTags, FaMapMarkerAlt, FaStar, FaCarSide, FaPlaneDeparture, FaCity } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Button from '../components/shared/Button'
import SectionHeader from '../components/shared/SectionHeader'
import Card from '../components/shared/Card'
import { reviews as staticReviews } from '../data/reviews'

export default function Home() {
  const [liveReviews, setLiveReviews] = useState(staticReviews)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) return;

    const fetchReviews = () => {
      try {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
          console.error("Google Maps Places library failed to load. Check your API key.");
          return;
        }
        
        const PlacesService = window.google.maps.places.PlacesService;
        if (!PlacesService) return;

        const service = new PlacesService(document.createElement('div'));
        
        if (!service || !service.getDetails) {
          console.error("Google Maps PlacesService is unavailable.");
          return;
        }

        service.getDetails({
        placeId: placeId,
        fields: ['reviews']
      }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.reviews) {
          const formattedReviews = place.reviews
            .filter(r => r.text) // Only show reviews that actually have text
            .map(review => ({
              id: review.time,
              name: review.author_name,
              rating: review.rating,
              text: review.text,
              source: "Google Reviews"
            }));
          
          if (formattedReviews.length > 0) {
            setLiveReviews(formattedReviews);
          }
        }
      });
      } catch (err) {
        console.error("Error fetching Google Reviews:", err);
      }
    };

    if (window.google && window.google.maps) {
      fetchReviews();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = fetchReviews;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-72px)] min-h-150 flex items-center justify-center overflow-hidden bg-linear-to-br from-navy-dark to-navy">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5A623_1px,transparent_1px)] bg-size-[20px_20px]"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 leading-tight">
            SS Cabs — Local & Outstation Rides You Can Trust
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Safe, punctual, and comfortable rides across the city and beyond.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button to="/contact" variant="primary" className="w-full sm:w-auto text-lg px-8 py-3">
              Book a Ride
            </Button>
            <Button to="/pricing" variant="outline" className="w-full sm:w-auto text-lg px-8 py-3 bg-transparent hover:bg-gold hover:text-white border-2 border-gold text-gold">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Why Ride With SS Cabs" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaShieldAlt, title: "Safe Drivers", desc: "Verified and trained professionals." },
              { icon: FaClock, title: "24/7 Availability", desc: "Ready whenever you need us." },
              { icon: FaTags, title: "Fixed Pricing", desc: "No hidden charges or surprise surges." },
              { icon: FaMapMarkerAlt, title: "Local Expertise", desc: "We know the best routes." }
            ].map((feature, idx) => (
              <Card key={idx} className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="text-gold text-3xl" />
                </div>
                <h3 className="font-display font-bold text-xl text-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="What We Offer" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaCity, title: "City Rides", desc: "Comfortable local commutes." },
              { icon: FaCarSide, title: "Outstation Trips", desc: "Reliable highway travel." },
              { icon: FaPlaneDeparture, title: "Airport Transfers", desc: "Always on-time drop & pickup." }
            ].map((service, idx) => (
              <div key={idx} className="bg-navy rounded-card p-8 text-white hover:-translate-y-2 transition-transform duration-300">
                <service.icon className="text-gold text-4xl mb-6" />
                <h3 className="font-display font-bold text-2xl mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.desc}</p>
                <Link to="/services" className="text-gold font-semibold flex items-center gap-2 hover:text-white transition-colors">
                  Explore <span className="text-xl">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader title="Simple, Transparent Pricing" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-card shadow-card">
              <h4 className="font-semibold text-gray-600 mb-2">City Ride</h4>
              <p className="font-display text-3xl font-bold text-navy">from ₹12/km</p>
            </div>
            <div className="bg-white p-6 rounded-card shadow-card">
              <h4 className="font-semibold text-gray-600 mb-2">Outstation</h4>
              <p className="font-display text-3xl font-bold text-navy">from ₹14/km</p>
            </div>
            <div className="bg-white p-6 rounded-card shadow-card">
              <h4 className="font-semibold text-gray-600 mb-2">Airport</h4>
              <p className="font-display text-3xl font-bold text-navy">Flat rates</p>
            </div>
          </div>
          <Button to="/pricing" variant="primary">See Full Pricing</Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="What Our Riders Say" />
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            grabCursor={true}
            className="pb-12"
          >
            {liveReviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <Card className="h-full p-8 border-l-4 border-gold">
                  <div className="flex text-gold mb-4">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                  <div>
                    <h4 className="font-bold text-navy">{review.name}</h4>
                    <p className="text-sm text-gray-500">— via {review.source}</p>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 bg-navy text-center px-4">
        <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">Ready for Your Next Ride?</h2>
        <p className="text-gold text-2xl font-bold mb-8">+91 6381304990</p>
        <Button to="/contact" variant="primary" className="px-10 py-3 text-lg">Contact Us</Button>
      </section>
    </div>
  )
}
