const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('malformed input');
  }

  const bmi: number = weight / ((height / 100) * (height / 100));

  console.log(`height: ${height}, weight: ${weight}`);
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
};

export default calculateBmi;