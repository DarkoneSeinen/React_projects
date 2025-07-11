interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'you need to work much harder';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent, you reached your goal!';
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

const parseArgs = (args: string[]): { target: number; hours: number[] } => {
  if (args.length < 4) throw new Error('Not enough arguments. First: target, then daily hours');

  const target = Number(args[2]);
  const hours = args.slice(3).map(h => Number(h));

  if (isNaN(target) || hours.some(h => isNaN(h))) {
    throw new Error('All arguments must be numbers');
  }

  return { target, hours };
};

try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let message = 'Something went wrong.';
  if (error instanceof Error) {
    message += ' Error: ' + error.message;
  }
  console.log(message);
}
