import exerciseDataStorage from "~/storage/exerciseData";
import type Exercise from "~/types/trainings/ExerciseType";

export async function removeTrainingFromExercisesUsedIn(
  planExercises: { exId: string, count: number }[],
  trainingId: string
) {
  const uniqueExerciseIds = Array.from(new Set(planExercises.map(({ exId }) => exId)));

  const updatePromises = uniqueExerciseIds.map(async (exerciseId) => {
    const exercise = await exerciseDataStorage.getItem<Exercise>(exerciseId);
    if (!exercise) {
      console.error(`Не удалось получить упражнение с ID: ${exerciseId}`);
      throw new Error(`Не удалось получить упражнение с ID: ${exerciseId}`);
    }

    if (!exercise.usedIn) {
      console.warn(`Упражнение с ID ${exerciseId} не содержит массив usedIn`);
      return;
    }

    const originalLength = exercise.usedIn.length;

    exercise.usedIn = exercise.usedIn.filter(id => id !== trainingId);

    if (exercise.usedIn.length !== originalLength) {
      await exerciseDataStorage.setItem(exerciseId, exercise);
    }
  });

  await Promise.all(updatePromises);
}
