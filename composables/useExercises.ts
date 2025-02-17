import { ref, onMounted } from 'vue';
import exerciseDataStorage from '~/storage/exerciseData';
import type Exercise from '~/types/trainings/ExerciseType';


export function useExercises() {
  const exercises = ref<Exercise[]>([]);
  const isLoading = ref<boolean>(false);


  const loadExercises = async () => {
    try {
      isLoading.value = true;
      const keys = await exerciseDataStorage.keys();
      const data = await Promise.all(
        keys.map(async (key) => await exerciseDataStorage.getItem(key) as Exercise)
      );
      exercises.value = data.filter(Boolean);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      isLoading.value = false;
    }
  };


  onMounted(loadExercises);

  return { exercises, isLoading, loadExercises };
}