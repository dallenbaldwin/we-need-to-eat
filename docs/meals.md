meals are managed in this page and populate in the [[Planner]]

meal is a base entity, and multiple types have one-one's with that meal

- [Recipes](#recipes)
- [Restaurants](#restaurants)

## Cuisines

## Tags

## Recipes

### Ingredient

### UOM

keep uom as a complex enum. the id is saved in the database and referenced with `UOM.byId` or `UOM.optionalById`

```ts
class UOM {
  private constructor({ ... }: UOM) { ... }
  id: string
  name: string
  description: string
  conversions: Record<UOM['id'], number>

  static byId(id: string): UOM
  static optionalById(id: string): UOM | null

  static Ounce = new UOM({ ... })
  ...
  static values = [ this.Ounce, ... ]
}
```

## Restaurants

it would be super cool to use a google, or open source, embedded map and let people search for and pick a point on the map as the location

[https://www.openstreetmap.org/copyright](https://www.openstreetmap.org/copyright)
[https://leafletjs.com/examples/quick-start/](https://leafletjs.com/examples/quick-start/)
[https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=4.2.7](https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=4.2.7)
