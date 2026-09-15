import './PhotoBand.css'

interface PhotoBandProps {
  eyebrow?: string
  quote: string
  image: string
  focus?: string
}

const PhotoBand = ({ eyebrow, quote, image, focus }: PhotoBandProps) => {
  return (
    <section
      className="photo-band"
      style={{ backgroundImage: `url("${image}")`, backgroundPosition: focus ?? 'center' }}
    >
      <div className="photo-band-scrim" />
      <div className="photo-band-inner">
        {eyebrow && <p className="eyebrow eyebrow--center eyebrow--light">{eyebrow}</p>}
        <p className="photo-band-quote">{quote}</p>
      </div>
    </section>
  )
}

export default PhotoBand
