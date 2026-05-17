/* src/data/blogs.ts — AiMA blog article registry */

export const BLOG_CATEGORIES = [
  'All',
  'Operations',
  'Distribution',
  'Lead Generation',
  'Analytics',
  'Client Management',
  'Pipeline',
  'Technology',
  'Case Study',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export interface Blog {
  id: string
  url: string
  date: string | null
  publishedDate: string | null
  modifiedDate: string
  title: string
  excerpt: string
  category: BlogCategory
  readTime: number
}

export const blogs: Blog[] = [
  {
    id: 'deploying-operational-rails',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-0020300',
    date: '2024-12-29',
    publishedDate: '29 Dec 2024',
    modifiedDate: '17 May 2026',
    title: 'Deploying Operational Rails: How Project Infrastructure Creates Compounding Returns',
    excerpt:
      'An operation without structural architecture is not a business: it is a recurring liability. Timelines drift and lead quality degrades. Build the rails first and everything else follows.',
    category: 'Operations',
    readTime: 4,
  },
  {
    id: 'engineering-client-lifetime-value',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-0031300',
    date: '2024-12-31',
    publishedDate: '31 Dec 2024',
    modifiedDate: '17 May 2026',
    title: 'Engineering Client Lifetime Value: The Architecture of Retention and Expansion',
    excerpt:
      'Retention is not a relationship skill. It is a systems function. The highest-performing operators engineer expansion windows, not upsells, and the business that invoices the same client three times in a year is engineered to do so.',
    category: 'Client Management',
    readTime: 4,
  },
  {
    id: 'signal-quality-over-volume',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-1031300',
    date: '2025-01-02',
    publishedDate: '2 Jan 2025',
    modifiedDate: '17 May 2026',
    title: 'Signal Quality Over Volume: The Architecture of Lead Routing',
    excerpt:
      'The highest-quality opportunities arrive as inbound signals: prospects who have already self-qualified by seeking out what you offer. The architecture question is what infrastructure draws the right signals in, and what you do with the ones that do not fit.',
    category: 'Lead Generation',
    readTime: 5,
  },
  {
    id: 'diagnosing-dead-outreach',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-1051300',
    date: '2025-01-03',
    publishedDate: '3 Jan 2025',
    modifiedDate: '17 May 2026',
    title: 'Diagnosing Dead Outreach: A Signal Architecture Audit',
    excerpt:
      'Low open rates are a diagnostic signal, not a performance problem. When outreach goes quiet, there are exactly two failure modes: wrong audience, or wrong message. Treat the audit accordingly.',
    category: 'Lead Generation',
    readTime: 4,
  },
  {
    id: 'pipeline-architecture-cold-to-warm',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q13-1051300',
    date: '2025-01-04',
    publishedDate: '4 Jan 2025',
    modifiedDate: '17 May 2026',
    title: 'Pipeline Architecture: Engineering the Cold-to-Warm Conversion Layer',
    excerpt:
      'Treating every lead as though they are ready to convert is the single most expensive error in outbound operations. It burns qualified relationships and produces the boom-bust revenue pattern that no operation can sustain at scale.',
    category: 'Pipeline',
    readTime: 5,
  },
  {
    id: 'zero-ad-spend-84-closed',
    url: 'https://start.innovatewithaima.com/aptbfcm',
    date: '2024-12-01',
    publishedDate: '1 Dec 2024',
    modifiedDate: '17 May 2026',
    title: 'Zero Ad Spend, 84 Closed Opportunities: An Infrastructure-Led Demand Case Study',
    excerpt:
      'Black Friday 2024. Two days. 1,080 leads reached. 152 positive responses. 84 closed or routed to delivery partners. Zero paid advertising. This is a case study in what happens when infrastructure replaces spend.',
    category: 'Case Study',
    readTime: 5,
  },
  {
    id: 'intelligence-layer-appointment-setting',
    url: 'https://start.innovatewithaima.com/aptech',
    date: '2024-11-21',
    publishedDate: '21 Nov 2024',
    modifiedDate: '17 May 2026',
    title: 'The Intelligence Layer Beneath Appointment Setting: Why Most Tools Are Just Noise',
    excerpt:
      'The appointment setting market is saturated with tools that promise lead volume and deliver data dumps. The distinction that matters is between raw lead data and operationally routed intelligence.',
    category: 'Technology',
    readTime: 4,
  },
  {
    id: 'creators-distribution-stack',
    url: 'https://start.innovatewithaima.com/aptech02',
    date: '2024-11-22',
    publishedDate: '22 Nov 2024',
    modifiedDate: '17 May 2026',
    title: "The Creator's Distribution Stack: Engineering Outreach Infrastructure at Scale",
    excerpt:
      'Creators with active offers face a structural problem that effort cannot resolve. The audience exists. The offer exists. The distribution infrastructure does not.',
    category: 'Distribution',
    readTime: 4,
  },
  {
    id: 'social-listening-revenue-infrastructure',
    url: 'https://start.innovatewithaima.com/aptech03',
    date: '2024-11-22',
    publishedDate: '22 Nov 2024',
    modifiedDate: '17 May 2026',
    title: 'Social Listening as Revenue Infrastructure: Capturing Market Signals Before Your Competitors Identify Them',
    excerpt:
      'Most brands discover conversations about their category after the opportunity has already closed. This is not a social media strategy problem. It is an infrastructure problem.',
    category: 'Distribution',
    readTime: 4,
  },
  {
    id: 'dual-channel-distribution-model',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-002001',
    date: null,
    publishedDate: null,
    modifiedDate: '17 May 2026',
    title: 'The Dual-Channel Distribution Model: Engineering Inbound and Outbound in Parallel',
    excerpt:
      'Single-channel client acquisition is an architectural vulnerability. The answer is not choosing a channel: it is building the infrastructure to run both simultaneously, with each channel serving a distinct function.',
    category: 'Distribution',
    readTime: 4,
  },
  {
    id: 'intake-architecture-qualification',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-002002',
    date: null,
    publishedDate: null,
    modifiedDate: '17 May 2026',
    title: 'Intake Architecture: Engineering a Zero-Tolerance Client Qualification Framework',
    excerpt:
      'Qualification is the most underbuilt layer in most service operations. A weak intake layer lets the wrong clients through, and the wrong clients consume disproportionate time and generate friction at every delivery stage.',
    category: 'Operations',
    readTime: 4,
  },
  {
    id: 'operational-frameworks-prince2-pmbok',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-003105',
    date: '2024-12-30',
    publishedDate: '30 Dec 2024',
    modifiedDate: '17 May 2026',
    title: 'Operational Frameworks as Infrastructure: What PRINCE2 and PMBOK Actually Build',
    excerpt:
      'Project management frameworks are not bureaucratic overlays. They are the operational rails that allow a service business to run at consistent quality across multiple concurrent projects without the delivery standard degrading.',
    category: 'Operations',
    readTime: 5,
  },
  {
    id: 'portfolio-distribution-asset',
    url: 'https://start.innovatewithaima.com/innovatewithaima0q3-0020056',
    date: null,
    publishedDate: null,
    modifiedDate: '17 May 2026',
    title: 'Your Portfolio Is a Distribution Asset: Stop Engineering It Like a Gallery',
    excerpt:
      'A portfolio that showcases work is a gallery. A portfolio that converts prospects into clients is infrastructure. The distinction matters because most operators build the former and wonder why the latter does not follow.',
    category: 'Operations',
    readTime: 4,
  },
  {
    id: 'operational-telemetry-metrics',
    url: 'https://start.innovatewithaima.com/innovatewithaima91-0010',
    date: '2024-12-11',
    publishedDate: '11 Dec 2024',
    modifiedDate: '17 May 2026',
    title: 'Operational Telemetry: The Metrics That Actually Drive Infrastructure Decisions',
    excerpt:
      'Measurement without a decision framework is noise. The goal of tracking metrics is not accountability for its own sake: it is the construction of a feedback loop that tells you with precision where the system is performing and where it is failing.',
    category: 'Analytics',
    readTime: 5,
  },
  {
    id: 'removing-instinct-data-architecture',
    url: 'https://start.innovatewithaima.com/innovatewithaima101-0010',
    date: '2024-12-11',
    publishedDate: '11 Dec 2024',
    modifiedDate: '17 May 2026',
    title: 'Removing Instinct From the Equation: How Data Architecture Replaces Guesswork',
    excerpt:
      'Instinct has a legitimate role in operations: at the creative stage and in genuinely novel situations where no prior data exists. It does not belong in client qualification, channel allocation, or outreach routing decisions.',
    category: 'Analytics',
    readTime: 6,
  },
]

export function searchBlogs(query: string, category: BlogCategory = 'All'): Blog[] {
  const q = query.toLowerCase().trim()
  return blogs.filter((blog) => {
    const matchesCategory = category === 'All' || blog.category === category
    if (!q) return matchesCategory
    const matchesQuery =
      blog.title.toLowerCase().includes(q) ||
      blog.excerpt.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
}

export const recentBlogs = blogs
  .filter((b) => b.date !== null)
  .sort((a, b) => {
    if (!a.date || !b.date) return 0
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  .slice(0, 5)