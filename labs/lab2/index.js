const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

// ----------------------------------------------------------------------------

// arrayUtils
console.log("┌──────────────────┐");
console.log("│ arrayUtils Tests │");
console.log("└──────────────────┘");

console.log("\nMean Pass Example:");
try { // PASSES
	const exMeanOne = arrayUtils.mean([9, 12, 1, 5, 3, 7]);
	console.log(`\tSUCCESS: ${exMeanOne}`);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("Mean Fail Example:");
try { // FAILS
	const exMeanTwo = arrayUtils.mean([1, 'deadlift', 900]);
	console.log(`\tFAIL: ${exMeanTwo}`);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\nmedianSquared Pass Example:");
try{ // PASS
	const exMedianOne = arrayUtils.medianSquared([4, 8, 10, 1]);
	console.log(`\tSUCCESS: ${exMedianOne}`);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("medianSquared Fail Example:");
try { // FAIL
	const exMedianTwo = arrayUtils.medianSquared([]);
	console.log(`\tFAIL: ${exMedianTwo}`);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\nmaxElement Pass Example:");
try { //PASS
	const exMaxOne = arrayUtils.maxElement([9, 3, 45, 12, 0, -1, 5, 26]);
	console.log("\tSUCCESS: " , exMaxOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("maxElement Fail Example:");
try { //FAIL
	const exMaxTwo = arrayUtils.maxElement();
	console.log("\tFAIL:" , exMaxTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\nFill Pass Example:");
try { //PASS
	const exFillOne = arrayUtils.fill(4, 'doggo');
	console.log("\tSUCCESS: " , exFillOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("Fill Fail Example:");
try { //FAIL
	const exFillTwo = arrayUtils.fill(1.5);
	console.log("\tFAIL:" , exFillTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}

console.log("\ncountRepeating Pass Example:");
try { //PASS
	const exCountOne = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello", false, "jazz", 7, 12, false, 'hello']);
	console.log("\tSUCCESS: " , exCountOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("countRepeating Fail Example:");
try { //FAIL
	const exCountTwo = arrayUtils.countRepeating("array");
	console.log("\tFAIL:" , exCountTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\nisEqual Pass Example:");
try { //PASS
	// const exEqualOne = arrayUtils.isEqual([[ 10, 1, 2, 3, '10' ], [ 4, 5, 6 ], [ 7, '8', 9 ]], [[ 3, 1, '10', 2, 10], [ 5, 4, 6 ], [ 9, 7, '8']]);
	// const exEqualOne = arrayUtils.isEqual([1,"23", "false", false,[3,2, 10], 23], [1,23, false, "false", "23", [2, 3, 10]]);
	// const exEqualOne = arrayUtils.isEqual([1,"23", [3,2, 10], 23], [1,23, "23", [2, 3, 10]]);
	// const exEqualOne = arrayUtils.isEqual(["632", 632], [632, "632"]);
	// const exEqualOne = arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]]);
	const exEqualOne = arrayUtils.isEqual([1,"23", "false", false,[3,2, [4, 5, 6, 7, [8, 0]], "2", 6], 10, 23], [ 1, 10, [3,"2", 2, [4, 5, 6, 7, [8, 0]], 6], false, 23, "false", "23"]);
	console.log("\tSUCCESS: " , exEqualOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("isEqual Fail Example:");
try { //FAIL
	const exEqualTwo = arrayUtils.isEqual();
	console.log("\tFAIL:" , exEqualTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}

// ----------------------------------------------------------------------------

console.log();

// stringUtils
console.log("┌───────────────────┐");
console.log("│ stringUtils Tests │");
console.log("└───────────────────┘");

console.log("\ncamelCase Pass Example:");
try { //PASS
	const exCamelOne = stringUtils.camelCase('  The quick Brown fox Jumps ');
	console.log("\tSUCCESS: " , exCamelOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("camelCase Fail Example:");
try { //FAIL
	const exCamelTwo = stringUtils.camelCase('    ');
	console.log("\tFAIL:" , exCamelTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\nreplaceChar Pass Example:");
try { //PASS
	const exRepOne = stringUtils.replaceChar("Bumble bees barely buzzing in bushes");
	console.log("\tSUCCESS: " , exRepOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("replaceChar Fail Example:");
try { //FAIL
	const exRepTwo = stringUtils.replaceChar('');
	console.log("\tFAIL:" , exRepTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\nmashUP Pass Example:");
try { //PASS
	const exMashOne = stringUtils.mashUp("hello", "world");
	console.log("\tSUCCESS: " , exMashOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("mashUp Fail Example:");
try { //FAIL
	const exMashTwo = stringUtils.mashUp('1', 'jail');
	console.log("\tFAIL:" , exMashTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}

// ----------------------------------------------------------------------------

console.log();

// objUtils
console.log("┌────────────────┐");
console.log("│ objUtils Tests │");
console.log("└────────────────┘");

console.log("\nmakeArrays Pass Example:");
try { //PASS
	const first = { thing: 1, thing2: 2};
	const second = { name: 'root cellar cafe', location: 'San Marcos, Texas', rating: 'one million'};
	const third = { nickel: 5, dime: 10, quarter: 25 };

	const exMakeOne = objUtils.makeArrays([first, second, third]);
	console.log("\tSUCCESS: " , exMakeOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("makeArrays Fail Example:");
try { //FAIL
	const first = {	a: 1, b: 2};
	const str = "doggos";

	const exMakeTwo = objUtils.makeArrays([first, str]);
	console.log("\tFAIL:" , exMakeTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\nisDeepEqual Pass Example:");
try { //PASS
	const first = {a: 2, b: 3};
	const second = {a: 2, b: 4};
	const third = {a: 2, b: 3};
	const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
	const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}};
	const sixth = {a: 90, d: {Aa: "general",  Ab: "kenobi", Ac: "hey", Ad: {Ba: "there", Bb: "you are"}}, c: {Ae: false, Af: "false"}};	
	const seventh = {a: 90, c: {Af: "false", Ae: false}, d: {Ac: "hey", Aa: "general", Ad: {Bb: "you are", Ba: "there"}, Ab: "kenobi"}};

	// const exDeepOne = objUtils.isDeepEqual(first, second);
	// const exDeepOne = objUtils.isDeepEqual(forth, fifth);
	// const exDeepOne = objUtils.isDeepEqual(forth, third);
	const exDeepOne = objUtils.isDeepEqual(sixth, seventh);
	// const exDeepOne = objUtils.isDeepEqual({}, {});
	console.log("\tSUCCESS: " , exDeepOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("isDeepEqual Fail Example:");
try { //FAIL
	const exDeepTwo = objUtils.isDeepEqual();
	console.log("\tFAIL:" , exDeepTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}


console.log("\ncomputeObject Pass Example:");
try { //PASS
	const first = { x: 2, y: 3};
	const function1 = function (a) {
		return Math.sqrt(Math.pow(a, 2)) + 1 ;
	}
	const exCompOne = objUtils.computeObject(first, function1);
	console.log("\tSUCCESS: " , exCompOne);
} catch (e) {
	console.log(`\tFAIL: ${e}`);
}
console.log("computeObject Fail Example:");
try { //FAIL
	const first = {};
	const str = 'dog';

	const exCompTwo = objUtils.computeObject(first, str);
	console.log("\tFAIL:" , exCompTwo);
} catch (e) {
	console.log(`\tSUCCESS: ${e}`);
}
