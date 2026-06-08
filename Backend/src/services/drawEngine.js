import Score from "../models/Score.js";

// RANDOM NUMBERS
export const generateRandomNumbers = () => {

const numbers = new Set();

while (numbers.size < 5) {


numbers.add(
  Math.floor(Math.random() * 50) + 1
);


}

return [...numbers];

};

// ALGORITHMIC WEIGHTED DRAW
export const generateWeightedNumbers =
async () => {

const scores = await Score.find();

const frequency = {};

scores.forEach((score) => {

  frequency[score.score] =
    (frequency[score.score] || 0) + 1;

});

const weightedPool = [];

Object.keys(frequency).forEach(
  (num) => {

    const weight =
      frequency[num];

    for (
      let i = 0;
      i < weight;
      i++
    ) {

      weightedPool.push(
        Number(num)
      );

    }

  }
);

const result = new Set();

while (
  result.size < 5 &&
  weightedPool.length > 0
) {

  const randomIndex =
    Math.floor(
      Math.random() *
      weightedPool.length
    );

  result.add(
    weightedPool[randomIndex]
  );

}

return [...result];

};

// MATCH LOGIC
export const calculateMatches = (
playerNumbers,
drawNumbers
) => {

return playerNumbers.filter(
(num) =>
drawNumbers.includes(num)
).length;

};
