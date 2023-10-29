# Meals

this page is where you manage meals which should populate in the planner

## Types

there should 2 different types of meals

1. Home
1. Restaurant

```typescript
class Meal {
  id: string
  name: string
  description: string | null
  pricePerPortion: number
  cuisine: Cuisine
  cuisineId: string
}

class Cuisine {
  id: string
  name: string
  description: string | null
}

class HomeMeal extends Meal {
  steps: MealStep[]
  portions: number
  url: string | null
}

class MealStep {
  id: string
  mealId: string
  meal: HomeMeal
  ingredient: string
  quantity: number
  uom: UOM
  uomId: string
  description: string | null
}

// internal
class UOM {
  id: string
  name: string
  description: string | null
  /** 
   * { toId: multiplier }
  */
  conversions: { [toId: string]: number }
}

class RestaurantMeal extends Meal {
  
}
```
