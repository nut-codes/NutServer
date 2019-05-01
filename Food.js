function Food(fat, carbohydrates, protein) {
	// All values normalized to a 100-gram portion
	
	// Macronutrients
	this.fatTotal = fat || 0;
	this.carbohydrates = carbohydrates || 0;
	this.protein = protein || 0;
	
	// Carbohydrate Detail
	this.fiber = 0;
	this.sugar = 0;
	
	// Fat Detail
	this.fatMonounsaturated = 0;
	this.fatPolyunsaturated = 0;
	this.fatSaturated = 0;
	this.cholesterol = 0;
	
	// Not in HealthKit
	this.sugarAdded = 0;
	this.sugarAlcohols = 0;

	// Vitamins
	this.vitaminA = 0;
	this.thiamin = 0;
	this.riboflavin = 0;
	this.niacin = 0;
	this.pantothenicAcid = 0;
	this.vitaminB6 = 0;
	this.biotin = 0;
	this.vitaminB12 = 0;
	this.vitaminC = 0;
	this.vitaminD = 0;
	this.vitaminE = 0;
	this.vitaminK = 0;
	this.folate = 0;
	
	// Minerals
	this.calcium = 0;
	this.chloride = 0;
	this.iron = 0;
	this.magnesium = 0;
	this.phosphorus = 0;
	this.potassium = 0;
	this.sodium = 0;
	this.zinc = 0;

	// Hydration
	this.water = 0;

	// Caffeination
	this.caffeine = 0;

	// Ultratrace Minerals
	this.chromium = 0;
	this.copper = 0;
	this.iodine = 0;
	this.manganese = 0;
	this.molybdenum = 0;
	this.selenium = 0;
	
	this.standardMass = 0.1;
}

function Serving() {
	this.Food = null;
	this.mass = 0.1;
}

module.exports = {Food: Food, Serving: Serving}





