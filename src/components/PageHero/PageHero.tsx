import { ReactNode } from 'react'
import './PageHero.css'

interface PageHeroProps {
  eyebrow: string
  title: string
  /** Italic accent line rendered beneath the title in the accent colour. */
  accent?: string
  lede?: string
  /** Path to a background image under /images. */
  image: string
  /** Vertical focus of the background image, e.g. "center 30%". */
  focus?: string
  children?: ReactNode
}

const PageHero = ({ eyebrow, title, accent, lede, image, focus, children }: PageHeroProps) => {
  return (
    <section className="page-hero">
      <div
        className="page-hero-media"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundPosition: focus ?? 'center',
        }}
      />
      <div className="page-hero-scrim" />
      <div className="page-hero-inner">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 className="display-title display-title--light page-hero-title">
          {title}
          {accent && <em>{accent}</em>}
        </h1>
        {lede && <p className="page-hero-lede">{lede}</p>}
        {children && <div className="page-hero-cta">{children}</div>}
      </div>
    </section>
  )
}

export default PageHero
