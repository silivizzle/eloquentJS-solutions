const ancestryFile = require('./ancestry');
const ancestry = JSON.parse(ancestryFile);

// When we looked up all the people in our data set that lived more than 90 years, only the latest generation in the
// data came out.Let’s take a closer look at that phenomenon.

// Compute and output the average age of the people in the ancestry data set per century. A person is assigned
// to a century by taking their year of death, dividing it by 100, and rounding it up, as in Math.ceil(person.died / 100).

function average(array) {
  function plus(a, b) { return a + b; }
  return Math.round((array.reduce(plus) / array.length) * 100) / 100;
}

function groupByCentury(array) {
  let group = {};
  array.forEach(person => {
    let century = Math.ceil(person.died / 100);
    if (!group.hasOwnProperty(century)) {
      group[century] = [];
      group[century].push(person);
    } else {
      group[century].push(person);
    }
  })
  return group;
}

function calculateAverages(groups) {
  for (let century in groups) {
    let ages = groups[century].map(person => person.died - person.born);
    console.log(`Century ${century} average was ${average(ages)}`);
  }
}

calculateAverages(groupByCentury(ancestry));

