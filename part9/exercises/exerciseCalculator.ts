export interface ExerciseInput {
  daily_exercises: number[];
  target: number;
}

export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  daily_exercises: number[],
  target: number
): ExerciseResult => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((d) => d > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job!';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};
