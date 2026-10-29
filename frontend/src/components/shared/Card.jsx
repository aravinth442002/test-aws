export default function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white shadow-card rounded-card transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
