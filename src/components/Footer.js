import "../css/Footer.css"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer>Copyright {year} Maciej Bąba</footer>
  )
}

export default Footer