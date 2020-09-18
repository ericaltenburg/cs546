const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');

// ----------------------------------------------------------------------------

// arrayUtils
console.log("┌──────────────────┐");
console.log("│ arrayUtils Tests │");
console.log("└──────────────────┘");

console.log("\nMean Pass Example:");
try { // PASSES
	const exMeanOne = arrayUtils.mean([9, 12, 1, 5, 3, 7]);
	console.log(`\tMean passed successfully: ${exMeanOne}`);
} catch (e) {
	console.log(`\tMean failed test case: ${e}`);
}
console.log("Mean Fail Example:");
try { // FAILS
	const exMeanTwo = arrayUtils.mean([1, 'deadlift', 900]);
	console.log(`\tThis was supposed to fail: ${exMeanTwo}`);
} catch (e) {
	console.log(`\tMean failed successfully: ${e}`);
}

console.log("\nmedianSquared Pass Example:");
try{ // PASS
	const exMedianOne = arrayUtils.medianSquared([4, 8, 10, 1]);
	console.log(`\tmedianSquared passed successfully: ${exMedianOne}`);
} catch (e) {
	console.log(`\tmedianSquared failed test case: ${e}`);
}
console.log("medianSquared Fail Example:");
try { // FAIL
	const exMedianTwo = arrayUtils.medianSquared([]);
	console.log(`\tThis was supposed to fail: ${exMedianTwo}`);
} catch (e) {
	console.log(`\tmedianSquared failed successfully: ${e}`);
}

console.log("\nmaxElement Pass Example:");
try { //PASS
	const exMaxOne = arrayUtils.maxElement([9, 3, 45, 12, 0, -1, 5, 26]);
	console.log("\tmaxElement passed successfully: " , exMaxOne);
} catch (e) {
	console.log(`\tmaxElement failed test case: ${e}`);
}
console.log("maxElement Fail Example:");
try { //FAIL
	const exMaxTwo = arrayUtils.maxElement();
	console.log("\tThis was supposed to fail:" , exMaxTwo);
} catch (e) {
	console.log(`\tmaxElement failed successfully: ${e}`);
}

console.log("\nFill Pass Example:");
try { //PASS
	const exFillOne = arrayUtils.fill(4, 'doggo');
	console.log("\tFill passed successfully: " , exFillOne);
} catch (e) {
	console.log(`\tFill failed test case: ${e}`);
}
console.log("Fill Fail Example:");
try { //FAIL
	const exFillTwo = arrayUtils.fill(1.5);
	console.log("\tThis was supposed to fail:" , exFillTwo);
} catch (e) {
	console.log(`\tFill failed successfully: ${e}`);
}

console.log("\ncountRepeating Pass Example:");
try { //PASS
	const exCountOne = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello", false, "jazz", 7, 12, false, 'hello']);
	console.log("\tcountRepeating passed successfully: " , exCountOne);
} catch (e) {
	console.log(`\tcountRepeating failed test case: ${e}`);
}
console.log("countRepeating Fail Example:");
try { //FAIL
	const exCountTwo = arrayUtils.countRepeating("array");
	console.log("\tThis was supposed to fail:" , exCountTwo);
} catch (e) {
	console.log(`\tcountRepeating failed successfully: ${e}`);
}

console.log("\nisEqual Pass Example:");
try { //PASS
	const exEqualOne = arrayUtils.isEqual([[ 1, 2, 3, '10' ], [ 4, 5, 6 ], [ 7, '8', 9 ]], [[ 3, 1, '10', 2 ], [ 5, 4, 6 ], [ 9, 7, '8']]);
	console.log("\tisEqual passed successfully: " , exEqualOne);
} catch (e) {
	console.log(`\tisEqual failed test case: ${e}`);
}
console.log("isEqual Fail Example:");
try { //FAIL
	const exEqualTwo = arrayUtils.isEqual();
	console.log("\tThis was supposed to fail:" , exEqualTwo);
} catch (e) {
	console.log(`\tisEqual failed successfully: ${e}`);
}

// ----------------------------------------------------------------------------

console.log();

// stringUtils
console.log("┌───────────────────┐");
console.log("│ stringUtils Tests │");
console.log("└───────────────────┘");

console.log("\ncamelCase Pass Example:");
try { //PASS
	const exCamelOne = stringUtils.camelCase('The quick Brown fox Jumps ');
	console.log("\tcamelCase passed successfully: " , exCamelOne);
} catch (e) {
	console.log(`\tcamelCase failed test case: ${e}`);
}
console.log("camelCase Fail Example:");
try { //FAIL
	const exCameTwo = stringUtils.camelCase('');
	console.log("\tThis was supposed to fail:" , exCamelTwo);
} catch (e) {
	console.log(`\tcamelCase failed successfully: ${e}`);
}

console.log("\nreplaceChar Pass Example:");
try { //PASS
	const exRepOne = stringUtils.replaceChar("Bumble bees barely buzzing in bushes");
	console.log("\treplaceChar passed successfully: " , exRepOne);
} catch (e) {
	console.log(`\treplaceChar failed test case: ${e}`);
}
console.log("replaceChar Fail Example:");
try { //FAIL
	const exRepTwo = stringUtils.replaceChar('');
	console.log("\tThis was supposed to fail:" , exRepTwo);
} catch (e) {
	console.log(`\treplaceChar failed successfully: ${e}`);
}

console.log("\nmashUP Pass Example:");
try { //PASS
	const exMashOne = stringUtils.mashUp("hello", "world");
	console.log("\tmashUp passed successfully: " , exMashOne);
} catch (e) {
	console.log(`\tmashUp failed test case: ${e}`);
}
console.log("mashUp Fail Example:");
try { //FAIL
	const exMashTwo = stringUtils.mashUp('1', 'jail');
	console.log("\tThis was supposed to fail:" , exMashTwo);
} catch (e) {
	console.log(`\tmashUp failed successfully: ${e}`);
}

// ----------------------------------------------------------------------------

console.log();

// objUtils
console.log("┌────────────────┐");
console.log("│ objUtils Tests │");
console.log("└────────────────┘");