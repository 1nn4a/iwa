import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  blogs,
  searchBlogs,
  recentBlogs,
  BLOG_CATEGORIES,
  type BlogCategory,
  type Blog,
} from '../data/blogs'
import './blog.css'

function CategoryIcon({ category }: { category: string }) {
  const props = {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (category) {
    case 'Operations':
      return (
        <svg {...props}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    case 'Distribution':
      return (
        <svg {...props}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      )
    case 'Lead Generation':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      )
    case 'Analytics':
      return (
        <svg {...props}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    case 'Client Management':
      return (
        <svg {...props}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    case 'Pipeline':
      return (
        <svg {...props}>
          <path d="M6 3v12" />
          <path d="M18 9a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M6 21a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M15 6H9a6 6 0 000 12h3" />
          <path d="M18 15v6M15 18l3 3 3-3" />
        </svg>
      )
    case 'Technology':
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    case 'Case Study':
      return (
        <svg {...props}>
          <path d="M9 12h6M9 16h6M9 8h3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <path d="M9 12h6M9 16h6M9 8h3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      )
  }
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link to={blog.url} className="bsp-card">
      <div className="bsp-card-icon">
        <CategoryIcon category={blog.category} />
      </div>
      <div className="bsp-card-body">
        <div className="bsp-card-title">{blog.title}</div>
        <div className="bsp-card-excerpt">{blog.excerpt}</div>
        <div className="bsp-card-meta">
          <span className="bsp-card-cat">{blog.category}</span>
          {blog.publishedDate && (
            <>
              <span className="bsp-card-sep" />
              <span className="bsp-card-date">{blog.publishedDate}</span>
            </>
          )}
          <span className="bsp-card-sep" />
          <span className="bsp-card-time">{blog.readTime} min read</span>
        </div>
      </div>
      <svg
        className="bsp-card-arr"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

export default function BlogsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All')
  const inputRef = useRef<HTMLInputElement>(null)

  const isFiltered = query.trim().length > 0 || activeCategory !== 'All'
  const results = searchBlogs(query, activeCategory)
  const displayedBlogs = isFiltered ? results : blogs

  function handleClear() {
    setQuery('')
    setActiveCategory('All')
    inputRef.current?.focus()
  }

  function handleCategoryChange(cat: BlogCategory) {
    setActiveCategory(cat)
    setQuery('')
  }

return (
    <>
    <Helmet>
      <link rel="canonical" href="https://innovatewithaima.com/blog" />
    </Helmet>
    <div className="bsp-wrap">
      <div className="bsp-hero">
        <div className="bsp-eyebrow">Intelligence Library</div>
        <h1 className="bsp-hero-title">The AiMA Blog</h1>
        <p className="bsp-hero-sub">
          Operational frameworks, distribution architecture, and infrastructure strategy for the modern operator.
        </p>

        <div
          className="bsp-search-row"
          role="search"
        >
          <svg
            className="bsp-search-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            className="bsp-search-input"
            type="text"
            placeholder="Search operations, pipeline, analytics, distribution..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label="Search articles"
          />
          <button
            className={`bsp-search-clear${query ? ' bsp-clear-vis' : ''}`}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bsp-body">
        <aside className="bsp-sidebar" aria-label="Article categories">
          <div className="bsp-sidebar-label">Categories</div>
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`bsp-cat-btn${activeCategory === cat ? ' bsp-cat-on' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat === 'All' ? 'All articles' : cat}
            </button>
          ))}

          <div className="bsp-sidebar-sep" />

          <div className="bsp-sidebar-label">Recent</div>
          {recentBlogs.map(blog => (
            <Link
              key={blog.id}
              to={blog.url}
              className="bsp-recent-link"
            >
              <span className="bsp-recent-dot" />
              <span className="bsp-recent-text">{blog.title}</span>
            </Link>
          ))}
        </aside>

        <main className="bsp-main">
          <div
            className="bsp-pills"
            role="group"
            aria-label="Filter by category"
          >
            {BLOG_CATEGORIES.slice(1).map(cat => (
              <button
                key={cat}
                className={`bsp-pill${activeCategory === cat ? ' bsp-pill-on' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="bsp-count">
            {isFiltered
              ? `${results.length} article${results.length !== 1 ? 's' : ''}${query.trim() ? ` matching "${query.trim()}"` : ''}${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}`
              : `${blogs.length} articles`}
          </div>

          {!isFiltered && (
            <>
              <div className="bsp-section-label">All Articles</div>
              <div className="bsp-cards">
                {displayedBlogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </>
          )}

          {isFiltered && results.length > 0 && (
            <div className="bsp-cards">
              {results.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {isFiltered && results.length === 0 && (
            <div className="bsp-empty">
              <div className="bsp-empty-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <div className="bsp-empty-h">No articles found</div>
              <p className="bsp-empty-sub">
                Try a different search term or browse all categories.
              </p>
              <button className="bsp-clear-btn" onClick={handleClear}>
                Clear filters
              </button>
            </div>
          )}
        </main>
  </div>
    </div>
    </>
  )
}