const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height * height);

  console.log('BMI: ', bmi);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal';
  } else if (bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

console.log(calculateBmi(1.645, 62.2));