const arrayUtils = require('./arrayUtils');

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

