export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 animate-fadeInUp">
      <h2 className="font-display text-3xl md:text-4xl text-navy font-bold mb-4">{title}</h2>
      <div className="w-16 h-1 bg-gold mx-auto rounded"></div>
      {subtitle && <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
