  import type Exercise from "~/types/trainings/ExerciseType";
  import exerciseDataStorage from "~/storage/exerciseData";

  export const getExerciseByKey = async (key: string): Promise<Exercise | null> => {
    try {
      const exercise = await exerciseDataStorage.getItem(key) as Exercise;
      return exercise || null;
    } catch (error) {
      console.error('Ошибка получения упражнения:', error);
      return null;
    }
  };