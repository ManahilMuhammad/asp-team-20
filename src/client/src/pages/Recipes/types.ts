export interface Ingredient { 
    name: string;
    type: "meat"|"fish"|"vegetable"|"condiment"|"liquid"|"spice"|"herbe";
    quantity: { amount: number; measurement: number; }
    notes?: string;
};

export interface Instruction {
    text?: string;
    image?: string;
};

export interface RecipeTags {
    label: string;
    colour: string;
}

export interface RecipeRecap {
    id: number;
    title: string;
    image: string;
    tags: RecipeTags[]
};

export interface CompleteRecipe extends RecipeRecap {
    introduction: string;
    description: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
    createdAt: string;
    updatedAt: string;
};