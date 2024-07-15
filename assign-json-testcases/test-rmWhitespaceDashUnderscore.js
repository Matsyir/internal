const fs = require("fs");
const originalAssign = require("./original-assign.json"); // original assign.json as well as the "desired" result
const newAssign = require("./new-assign2.json"); // new assign.json to be tested

var originalKeysToBeMatched = Object.keys(originalAssign);

var failedCount = 0;
for (var i = 0; i < originalKeysToBeMatched.length; i++) {
    // it seems the original keys should be lowercased and trimmed already, but a few aren't?
    var originalKey = `${originalKeysToBeMatched[i]}`.toLowerCase().trim();
    var _actuallyOriginalKey = originalKeysToBeMatched[i];

    // same with val: I presume they're supposed to be trimmed, but a few aren't?
    var originalVal = `${originalAssign[_actuallyOriginalKey]}`.trim();

    // the new key should be the same as the original, just with whitespace & -_ removed
    var newKey = originalKey.replace(/\s|-|_/g, "");
    var newVal = newAssign[newKey]; // retrieve the newVal from newAssign based on the newKey derived from originalKey

    // ensure newVal is the same as originalVal.
    if (newVal != originalVal) {
        console.log(`Test failed! Found a value that differs from the original on i=${i} | originalKey=${originalKey} | originalVal=${originalVal} | newVal=${newVal}`);
        failedCount++;
    }
}

var newKeyTestCount = Object.keys(newAssign).length;
if (failedCount > 0) {
    console.log(`Tests FAILED with a total of ${failedCount} failures.`);
} else {
    console.log(`Tests completed successfully! ${originalKeysToBeMatched.length} keys can be reduced to ${newKeyTestCount} keys while achieving the same results (and tons more possible alternate spellings), by just removing whitespaces from the keys.`);
}l

// code for new-assign2.json:
// same as new-assign1.json but also remove -_
// var testAssign = originalAssign;
// var testAssignKeys = Object.keys(testAssign); // 707 keys
// var newTestAssign = {};
// for (var i = 0; i < testAssignKeys.length; i++) {
//   newTestAssign[testAssignKeys[i].replace(/\s|_|-/g, "").toLowerCase()] = testAssign[testAssignKeys[i]].trim(); // trim(): some values has leading or trailing spaces??
// }
// var newTestAssignJson = JSON.stringify(newTestAssign); // 456 keys
// fs.writeFileSync("./new-assign2.json", newTestAssignJson);
// console.log("wrote new-assign2.json!");