import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { blogs } from '../data/blogs'
import './blog.css'

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }

function parseContent(raw: string): ContentBlock[] {
  const result: ContentBlock[] = []
  const sections = raw.split('\n\n')

  for (const section of sections) {
    const trimmed = section.trim()
    if (!trimmed) continue
    const lines = trimmed.split('\n')

    if (lines.some(l => l.trimStart().startsWith('- '))) {
      const before = lines.filter(l => !l.trimStart().startsWith('- '))
      const items = lines
        .filter(l => l.trimStart().startsWith('- '))
        .map(l => l.trimStart().slice(2))
      if (before.length > 0) {
        const t = before.join('\n').trim()
        const isH = before.length === 1 && t.length <= 90 && !t.match(/[.!?]$/)
        result.push(isH ? { type: 'heading', text: t } : { type: 'paragraph', text: t })
      }
      result.push({ type: 'list', items })
      continue
    }

    const first = lines[0]
    const rest = lines.slice(1).join('\n').trim()

    if (rest && first.length <= 90 && !first.match(/[.!?]$/)) {
      result.push({ type: 'heading', text: first })
      result.push({ type: 'paragraph', text: rest })
    } else {
      result.push({ type: 'paragraph', text: trimmed })
    }
  }

  return result
}

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>()
  const blog = blogs.find(b => b.id === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    const prev = document.title
    if (blog) document.title = `${blog.title} | AiMA`
    return () => { document.title = prev }
  }, [blog])

  if (!blog) return <Navigate to="/blog" replace />

  const blocks = parseContent(blog.content)

  return (
    <div className="bp-wrap">
      <div className="bp-inner">

        <Link to="/blog" className="bp-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All articles
        </Link>

        <div className="bp-badge">{blog.category}</div>

        <h1 className="bp-title">{blog.title}</h1>

        <div className="bp-meta">
          {blog.publishedDate && (
            <>
              <span className="bp-meta-text">{blog.publishedDate}</span>
              <span className="bp-meta-dot" />
            </>
          )}
          <span className="bp-meta-text">{blog.readTime} min read</span>
        </div>

        <p className="bp-excerpt">{blog.excerpt}</p>

        <hr className="bp-divider" />

        <div className="bp-body-wrap">
          {blocks.map((block, i) => {
            if (block.type === 'heading') {
              return <h2 key={i} className="bp-heading">{block.text}</h2>
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="bp-list">
                  {block.items.map((item, j) => (
                    <li key={j} className="bp-list-item">
                      <span className="bp-list-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            return <p key={i} className="bp-para">{block.text}</p>
          })}
        </div>

        <div className="bp-foot">
          <Link to="/blog" className="bp-foot-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
          <span className="bp-foot-date">Updated {blog.modifiedDate}</span>
        </div>

      </div>
    </div>
  )
}