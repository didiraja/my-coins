const Card = ({ label, children }: { label: string; children: string }) => {
  return (
    <div className="card--card">
      <p className="card--label">{label}</p>
      <p className="card--value">{children}</p>
    </div>
  )
}

export default Card
