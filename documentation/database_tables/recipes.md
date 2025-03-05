# Recipe Model Guide

The `Recipe` model is the base table for storing/searching of all recipes used inside of Nutrifit, this page is present to give a human readible and understandable guide on how to use it along with details on how the data should be structured.

## Table Name
**Recipes**

## Fields and Validation Rules

| Field         | Type         | Required | Default | Validation |
|--------------|-------------|----------|---------|------------|
| `userId`      | Integer      | Yes      | None    | Valid user ID from `Users` table. |
| `title`       | String (255) | Yes      | None    | Length: 3-255 characters. |
| `description` | String (255) | Yes      | None    | Length: 3-255 characters. |
| `introduction`| Text        | Yes      | None    | Length: 3-5000 characters. |
| `image`       | String (255) | Yes      | None    | Length: 10-255 characters. |
| `tags`        | JSONB        | No      | `[]`    | Valid JSON array. |
| `ingredients` | JSONB        | Yes      | None    | Valid JSON array and not empty. |
| `instructions`| JSONB        | Yes      | None    | Valid JSON array and not empty. |

## Specific Data Structures
- `userId` must reference a valid user from the `Users` table.
  - It uses foreign keys to link to the `Users` table
- `title`, `description`, and `introduction` must meet length requirements.
- `image` must be a valid URL.
- `tags`:
  ```json
  { label: string; colour: string; }[]
  ```
- `instructions`:
  - The order of the array is the step order
  ```json
  { 
    // either text or image have to be defined
    text?: string;
    image?: string; // valid image url
   }[]
  ```
- `ingredients`:
  ```json
  { 
    name: string;
    type: "meat"|"fish"|"vegetable"|"condiment"|"liquid"|"spice"|"herbe";
    quantity: { amount: number; measurement: number; } // Ideally in a metric measurement which can be altered in the front end
    notes?: string; // Any comments or watchouts on what's best to buy
   }[]
  ```

## Limitations
- `tags`, `ingredients`, and `instructions` **must be JSON arrays**.
- `description` and `introduction` **must meet character limits**.
- `image` must be between **10 and 255 characters**.

## Example JSON Structure
```json
{
    "userId": 1,
    "title": "Spaghetti Bolognese",
    "description": "A classic Italian dish with rich tomato sauce.",
    "introduction": "Spaghetti Bolognese is a beloved Italian dish...",
    "image": "https://example.com/spaghetti.jpg",
    "tags": [
        { label: "High Carbs", colour: "#ffd06b" }
    ],
  "ingredients": [
    {
      "name": "Spaghetti",
      "type": "vegetable",
      "quantity": { "amount": 200, "measurement": "g" },
      "notes": "Use high-quality durum wheat pasta."
    },
    {
      "name": "Minced beef",
      "type": "meat",
      "quantity": { "amount": 300, "measurement": "g" },
      "notes": "Preferably 80% lean, 20% fat for better flavor."
    }
  ],
  "instructions": [
    { "text": "Boil water and cook spaghetti." },
    { "text": "Cook minced beef until browned.", "image": "https://example.com/browning-meat.jpg" }
  ]
}
```
