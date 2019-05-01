var _mapping = {
	"water": {
		"exponent": 0,
		"symbol": 0x00
	},
	"cholesterol": {
		"exponent": 0,
		"symbol": 0x10
	},
	"sugarAdded": {
		"exponent": 0,
		"symbol": 0x11
	},
	"sugarAlcohols": {
		"exponent": 0,
		"symbol": 0x12
	},
	"vitaminA": {
		"exponent": 0,
		"symbol": 0x20
	},
	"thiamin": {
		"exponent": 0,
		"symbol": 0x21
	},
	"riboflavin": {
		"exponent": 0,
		"symbol": 0x22
	},
	"niacin": {
		"exponent": 0,
		"symbol": 0x23
	},
	"pantothenicAcid": {
		"exponent": 0,
		"symbol": 0x24
	},
	"vitaminB6": {
		"exponent": 0,
		"symbol": 0x25
	},
	"biotin": {
		"exponent": 0,
		"symbol": 0x26
	},
	"vitaminB12": {
		"exponent": 0,
		"symbol": 0x27
	},
	"vitaminC": {
		"exponent": 0,
		"symbol": 0x28
	},
	"vitaminD": {
		"exponent": 0,
		"symbol": 0x29
	},
	"vitaminE": {
		"exponent": 0,
		"symbol": 0x2A
	},
	"vitaminK": {
		"exponent": 0,
		"symbol": 0x2B
	},
	"folate": {
		"exponent": 0,
		"symbol": 0x2C
	},
	"calcium": {
		"exponent": 0,
		"symbol": 0x30
	},
	"chloride": {
		"exponent": 0,
		"symbol": 0x31
	},
	"iron": {
		"exponent": 0,
		"symbol": 0x32
	},
	"magnesium": {
		"exponent": 0,
		"symbol": 0x33
	},
	"phosphorus": {
		"exponent": 0,
		"symbol": 0x34
	},
	"potassium": {
		"exponent": 0,
		"symbol": 0x35
	},
	"sodium": {
		"exponent": 0,
		"symbol": 0x36
	},
	"zinc": {
		"exponent": 0,
		"symbol": 0x37
	},
	"chromium": {
		"exponent": 0,
		"symbol": 0x37
	},
	"copper": {
		"exponent": 0,
		"symbol": 0x38
	},
	"iodine": {
		"exponent": 0,
		"symbol": 0x39
	},
	"manganese": {
		"exponent": 0,
		"symbol": 0x3A
	},
	"molybdenum": {
		"exponent": 0,
		"symbol": 0x3B
	},
	"selenium": {
		"exponent": 0,
		"symbol": 0x3C
	},
	"caffeine": {
		"exponent": 0,
		"symbol": 0xD0
	},
};

var NutCode = {
	version: 0,

	urlify: function(foodOrServing) {
		var food = (foodOrServing instanceof Serving) ? foodOrServing.food : foodOrServing;

		var outputData = new Buffer();

		var writeAmount = function(input, exponent) {
			if (exponent !== 1 || exponent !== undefined) {
				// FIXME: exponentiation?
			}

			outputData.writeUInt8(round(input * 255 / food.standardMass));
		}

		// Version
		outputData.writeUInt8(NutCode.version);

		// Whole-Gram Values

		// - Macronutrients
		writeAmount(food.fatTotal);
		writeAmount(food.carbohydrates - food.fiber);
		writeAmount(food.protein);

		// - Carbohydrate Detail
		writeAmount(food.fiber);
		writeAmount(food.sugar);

		// - Lipid Detail
		writeAmount(food.fatSaturated);
		writeAmount(food.fatMonounsaturated);
		writeAmount(food.fatPolyunsaturated);

		return 'nut://' + outputData.toString('base64');
	},

	parse: function(url) {
		if (!url.startsWith('nut://')) {
			// Invalid scheme/not a nut code
			return undefined;
		}

		var inputData = Buffer.from(url.substring(6), 'base64');

		if (!inputData) {
			// Invalid base64-encoded data
			return undefined;
		}

		var isShortForm = (inputData.byteLength == 4);

		if (!isShortForm && inputData.byteLength < 9) {
			// Data is a length that doesn't make sense
			return undefined;
		}

		var index = 0;

		var readAmount = function(wholeGram) {
			return inputData.readUInt8(index++)
		}

		if (readAmount() > NutCode.version) {
			// Code is a newer version than we know how to handle
			return undefined;
		}

		var fat = readAmount();
		var carbohydrates = readAmount();
		var protein = readAmount();
		var fiber = 0

		if (!isShortForm) {
			fiber = readAmount();
			var sugar = readAmount();
			var fatSaturated = readAmount();
			var fatMonounsaturated = readAmount();
			var fatPolyunsaturated = readAmount();
		}

		var food = new Food(fat, carbohydrates + fiber, protein);
		food.standardMass = 0.255;

		return food;
	},

	mapping: _mapping,

	reverseMapping: Object.keys(_mapping).reduce(function(obj, key) {
		obj[_mapping[key].symbol] = { "name": key, "exponent": _mapping[key].exponent };
		return obj;
	}, {})
}

module.exports = NutCode;
