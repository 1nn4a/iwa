import { handleDealsList } from '../../../src/worker-routes/deals-list'

interface Env {
  iwa_product_interest: D1Database
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return handleDealsList(env)
}