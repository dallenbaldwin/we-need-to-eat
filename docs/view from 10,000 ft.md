At it's very core, We need to eat should make it easier to pick what you want to eat today
To know what you want to eat, it needs a list of things you like to eat
It then picks one of the things you like to eat
## MVP
We need to eat can be considered an MVP if you can enter meal ideas and get a suggestion
## Scope Creep
### Filters
Meal type
Cuisines are a type of food
Tags allow users to group various meals together
Date Added
Date Edited
Owner 
Price enum ($, \$\$, \$\$\$)
- How does this work for recipes?
- Or maybe price amount?
distance
Recipes are meals you cook yourself. They have ingredients and directions
Restaurants are meals you go out to eat. They have a location
### Friends
Friends can view each others' meals
### Groups
Groups are a container of friends
they are created by one of the friends
- who becomes the owner (?)
- who then invites others to it (?)
Groups have meals using the meals of its members.
- copy - a new meal is created in the database using the meal's info at copy
- link - changes made to the meal by the owner propogate to all groups
#### Group Meals
if you want a custom meal for just the group, anyone in the group can create the meal entry
### [[Planner|Meal Planner]]
Users, or Groups, should be able to plan meals for as many days as they want
they can export a shopping list for a desired time-frame, with the ability to edit before export since the list may have things they don't actually need to buy, or don't need as much of
They can add a list of desired grocery stores which we can get data for
- we'll give them the best shopping list possible
- maybe even look for coupons
Should be able to integrate with calendars