import { ref, onMounted } from 'vue';
import trainingDataStorage from '~/storage/trainingData';
import type Training from '~/types/trainings/TrainingType';


export function useTrainings() {
  const trainings = ref<Training[]>([]);
  const isLoading = ref<boolean>(false);


  const loadTrainings = async () => {
    try {
      isLoading.value = true;
      const keys = await trainingDataStorage.keys();
      if (!keys) {
        return null
      }
      const data = await Promise.all(
        keys.map(async (key) => await trainingDataStorage.getItem(key) as Training)
      );
      trainings.value = data.filter(Boolean);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      isLoading.value = false;
    }
  };


  onMounted(loadTrainings);

  return { trainings, isLoading, loadTrainings };
}