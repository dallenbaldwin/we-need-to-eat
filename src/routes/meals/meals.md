# Meals

- [Meals](#meals)
  - [Layout](#layout)
  - [Meal](#meal)
    - [Recipe](#recipe)
    - [Restaurant](#restaurant)

this page is where you manage meals which should populate in the planner

## Layout

a tabbed layout

with a fixed width side menu with actions that relate to the selected tab

- create
- import
- export

inside the tab a simple table containing each associated item

actions should go along with each item

- edit
- archive
- restore
- delete

## Meal

there is a base entity, meal, and multiple types have one-one's with that meal

`Meal -> Recipe`

`Meal -> Restaurant`

```mermaid
classDiagram

class Meal {
  createdDate: Date
  archiveDate: Date | null
  id: string
  name: string
  notes: string | null
  cuisine: Cuisine | null
  cuisineId: string | null
  rating: number | null
  userId: string
  user: User
}

class Cuisine {
  id: string
  name: string
  notes: string | null
  userId: string
  user: User
}

class Tag {
  id: string
  name: string
  userId: string
  user: User
}

class MealToTag {
  mealId: string
  meal: Meal
  tagId: string
  tag: Tag
}
```

### Recipe

```mermaid
classDiagram

class Recipe {
  mealId: string
  meal: Meal
  ingredients: Ingredient[]
  directions: string | null
  portions: number | null
  minutesToPrepare: number | null
}

class Ingredient {
  id: string
  recipeId: string
  recipe: Recipe
  name: string
  quantity: number | null
  uomId: string | null
  notes: string | null
}

class UOM {
  <<Abstract>>
  id: string
  name: string
  description: string
  conversions: Map[UOM, number]
}
```

### Restaurant

```mermaid
classDiagram

class Restaurant {
  mealId: string
  meal: Meal
  location: string | null
}
```
