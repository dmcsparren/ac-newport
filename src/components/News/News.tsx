import './News.css'

interface NewsArticle {
  id: number
  title: string
  date: string
  excerpt: string
  category: string
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'AC Newport Launched January 12, 2026',
    date: 'January 12, 2026',
    excerpt: 'AC Newport launched as a new initiative to elevate football in Newport and surrounding Aquidneck Island, bringing high level soccer to this renowned sporting hub.',
    category: 'Club News'
  },
  {
    id: 2,
    title: 'Meet the Leadership: Ziggy Korytoski, Sporting Director',
    date: 'January 15, 2026',
    excerpt: 'Jeffrey "Ziggy" Korytoski brings distinguished coaching experience, including leading ASC San Diego to two conference championships and NPSL National Semifinals.',
    category: 'Team'
  },
  {
    id: 3,
    title: 'Newport\'s Unique Soccer Identity',
    date: 'January 20, 2026',
    excerpt: 'AC Newport leverages Newport\'s unique status as home to the Tennis Hall of Fame and Sailing Capital of the World, creating an unmatched sporting experience.',
    category: 'Community'
  }
]

const News = () => {
  return (
    <section className="news" id="news">
      <div className="news-container">
        <div className="news-header">
          <h2>Latest News</h2>
          <a href="#all-news" className="view-all">View All News →</a>
        </div>
        <div className="news-grid">
          {newsArticles.map((article) => (
            <article key={article.id} className="news-card">
              <span className="news-category">{article.category}</span>
              <h3 className="news-title">{article.title}</h3>
              <time className="news-date">{article.date}</time>
              <p className="news-excerpt">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default News
