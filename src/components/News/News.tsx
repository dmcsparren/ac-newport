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
    title: 'AC Newport Announces Inaugural Season',
    date: 'February 10, 2026',
    excerpt: 'We are thrilled to announce the launch of AC Newport\'s first professional season. Join us on this historic journey.',
    category: 'Club News'
  },
  {
    id: 2,
    title: 'Season Ticket Memberships Now Available',
    date: 'February 8, 2026',
    excerpt: 'Be part of history! Founding member season tickets are now on sale for our inaugural 2026 season.',
    category: 'Tickets'
  },
  {
    id: 3,
    title: 'Home Stadium Announced',
    date: 'February 5, 2026',
    excerpt: 'AC Newport will call Newport Stadium home. The venue will provide an intimate atmosphere for our supporters.',
    category: 'Stadium'
  }
]

const News = () => {
  return (
    <section className="news" id="news">
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
            <a href={`#news-${article.id}`} className="read-more">Read More →</a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default News
