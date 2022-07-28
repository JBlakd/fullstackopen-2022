type exerciseCalculatorOutput = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type ratingWithDescription = {
  rating: number,
  description: string
}

const calculateExercises = (input: Array<number>, targetHours = 2): exerciseCalculatorOutput => {
  function calculateRating(average: number, targetHours: number): ratingWithDescription {
    const percentageHit: number = average / targetHours

    if (percentageHit < 0.5) {
      return { rating: 1, description: "ya lazy bastard, didn't even hit 50% of your goal" }
    } else if (percentageHit < 1.2) {
      return { rating: 2, description: "on the right track, we're all gonna make it brother" }
    } else {
      return { rating: 2, description: "slow down cowboy, careful not to overtrain" }
    }
  }

  const trainingDays: number = input.reduce((acc, cur) => (cur != 0) ? acc + 1 : acc, 0);

  const average: number = input.reduce((acc, cur) => acc + cur, 0) / input.length
  const ratingObj = calculateRating(average, targetHours)

  return {
    periodLength: input.length,
    trainingDays: trainingDays,
    success: (average >= targetHours),
    rating: ratingObj.rating,
    ratingDescription: ratingObj.description,
    target: targetHours,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));