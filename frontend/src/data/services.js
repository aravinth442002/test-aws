import { FaCity, FaCarSide, FaPlaneDeparture, FaSuitcase, FaMapMarkedAlt } from 'react-icons/fa'

export const services = [
  {
    id: 1,
    icon: FaCity,
    title: "City / Local Rides",
    description: "Comfortable and hassle-free rides within the city limits. Perfect for daily commutes, shopping trips, or visiting friends.",
    features: ["Point-to-point drop", "Hourly packages available", "Clean & sanitized vehicles", "Knowledgable local drivers"]
  },
  {
    id: 2,
    icon: FaCarSide,
    title: "Outstation One-Way & Round Trip",
    description: "Planning a weekend getaway or a business trip? Enjoy our affordable outstation cabs with experienced highway drivers.",
    features: ["Flexible pickup & drop", "Tolls & taxes included options", "24/7 breakdown support", "Zero cancellation fees"]
  },
  {
    id: 3,
    icon: FaPlaneDeparture,
    title: "Super Market pickup and Airport Transfers",
    description: "Never miss a flight. We provide punctual and reliable airport drop-off and pick-up services with fixed rates.",
    features: ["Flight tracking", "No night-time surcharges", "Spacious boot space for luggage", "Meet & greet options"]
  },
  {
    id: 4,
    icon: FaSuitcase,
    title: "Corporate Bookings",
    description: "Dedicated transportation solutions for businesses, employee commutes, and corporate events.",
    features: ["Monthly billing options", "Dedicated account manager", "Premium vehicles", "Priority booking"]
  },
  {
    id: 5,
    icon: FaMapMarkedAlt,
    title: "Tour Packages",
    description: "Explore popular tourist destinations with our curated sightseeing packages.",
    features: ["Customizable itineraries", "Multi-day trips", "Local sightseeing guides", "Comfortable multi-seater vehicles"]
  }
];
