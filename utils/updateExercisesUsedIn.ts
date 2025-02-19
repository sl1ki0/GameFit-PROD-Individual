import exerciseDataStorage from "~/storage/exerciseData";
import type PlanExercise from "~/types/trainings/PlanExercise";
import type Exercise from "~/types/trainings/ExerciseType";

export async function updateExercisesUsedIn(planExercises: PlanExercise[], trainingId: string) {
  const uniqueExerciseIds = Array.from(new Set(planExercises.map(({ exercise }) => exercise.id)));

  const updatePromises = uniqueExerciseIds.map(async (exerciseId) => {
    const exercise = await exerciseDataStorage.getItem<Exercise>(exerciseId);
    if (!exercise) {
        console.error(`Не удалось получить упражнение с ID: ${exerciseId}`)
        throw new Error(`Не удалось получить упражнение с ID: ${exerciseId}`)
    };

    if (!exercise.usedIn) {
      exercise.usedIn = [];
      console.warn(`Упражнение с ID ${exerciseId} не содержит массив usedIn`)
    }

    if (!exercise.usedIn.includes(trainingId)) {
      exercise.usedIn.push(trainingId);
      await exerciseDataStorage.setItem(exerciseId, exercise);
    }
  });

  await Promise.all(updatePromises);
}