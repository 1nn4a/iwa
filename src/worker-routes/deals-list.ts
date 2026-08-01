interface Env {
  iwa_product_interest: D1Database
}

export async function handleDealsList(env: Env) {
  const { results } = await env.iwa_product_interest
    .prepare('SELECT * FROM deals ORDER BY sort_order ASC, created_at DESC')
    .all()

  const deals = results.map(mapRow)
  return Response.json(deals)
}

function mapRow(row: any) {
  return {
    slug: row.slug,
    company: row.company,
    dealTitle: row.dealTitle,
    savingsLabel: row.savingsLabel ?? undefined,
    logo: row.logo ?? undefined,
    category: row.category,
    overview: JSON.parse(row.overview),
    featureSections: JSON.parse(row.featureSections),
    closingLine: row.closingLine,
    aboutDeal: row.aboutDeal,
    eligibility: JSON.parse(row.eligibility),
    availability: row.availability,
    aboutCompanyName: row.aboutCompanyName,
    aboutCompanyText: row.aboutCompanyText,
    companySize: row.companySize,
    yearFounded: row.yearFounded,
    country: row.country,
    footerLine: row.footerLine,
    redirectUrl: row.redirect_url ?? undefined,
    gallery: row.gallery ? JSON.parse(row.gallery) : undefined,
    locked: !!row.locked,
  }
}