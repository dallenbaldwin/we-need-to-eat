import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server'

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent()
  const meals = user
    ? await db.query.meals.findMany({
        where: (meals, { eq }) => eq(meals.userId, user.id),
        with: {
          cuisine: true,
          mealToTags: {
            with: { tag: true },
          },
        },
      })
    : []
  return { user, meals }
}

export const actions: Actions = {}
