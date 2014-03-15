function numberOfEntries(x, array) {
   return array.reduce(function (total, y) { return total + (x == y); }, 0);
}

var topRow = [1, 2, 3];
var rightRow = [3, 6, 9];

var clauses = [
   function firstIsLargerThanSecond(digits) {
      return digits[0] > digits[1];
   },
   
   function secondTwiceTheThird(digits) {
      return digits[1] == digits[2] * 2;
   },
   
   function thirdSmallerThanFirst(digits) {
      return digits[2] < digits[0];
   },
   
   function fourthIsHalfOfTheFirst(digits) {
      return digits[3] == digits[0] / 2;
   },
   
   function notRepeated(digits) {
      return digits.every(function (x) { return numberOfEntries(x, digits) == 1; });
   },
   
   function threeAreNotInTopRow(digits) {
      return !(
         [digits[0], digits[1], digits[2]].every(function (x) { return topRow.indexOf(x) != -1; }) ||
         [digits[1], digits[2], digits[3]].every(function (x) { return topRow.indexOf(x) != -1; }) ||
         [digits[2], digits[3], digits[0]].every(function (x) { return topRow.indexOf(x) != -1; }) ||
         [digits[3], digits[0], digits[1]].every(function (x) { return topRow.indexOf(x) != -1; })
      );
   }
];

function generateDigitCombinationSequence() {
   var sequence = [];
   for (var i = 1111; i < 10000; i++) {
      var digits = i.toString().split('');
      if (digits.indexOf('0') != -1) {
         continue;
      }
      sequence.push(digits.map(function (x) { return +x; }));
   }
   return sequence;
}

console.log('Started code calculations.');
console.log('Generating sequnece of possible code combinations...');

var sequence = generateDigitCombinationSequence();

console.log('Done!');
console.log('Determining the possible code combinations...');

var possibilities = sequence.filter(function (digits) {
   return clauses.every(function (clause) { return clause(digits); });
});

console.log('Done!');
console.log('The result is: \n', possibilities);