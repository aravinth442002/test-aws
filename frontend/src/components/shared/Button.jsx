import { Link } from 'react-router-dom'

export default function Button({ children, variant = 'primary', to, className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center rounded px-5 py-2 font-semibold transition-colors duration-200 active:scale-[0.98] outline-none"
  
  const variants = {
    primary: "bg-gold text-white hover:bg-gold-dark",
    outline: "border-2 border-gold text-gold hover:bg-gold hover:text-white",
    white: "bg-white text-navy hover:bg-gray-100"
  }

  const classes = `${baseStyle} ${variants[variant]} ${className}`

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>
  }

  return <button className={classes} {...props}>{children}</button>
}
