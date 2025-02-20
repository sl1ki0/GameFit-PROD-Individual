import { ref, onMounted } from 'vue';
import trainingDataStorage from '~/storage/trainingData';
import type Training from '~/types/trainings/TrainingType';


export function useInitalizePass(id: string) {
  const training = ref<Training | null>(null);


  const loadTraining = async () => {
    try {
        training.value = await trainingDataStorage.getItem(id);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error(errorMessage);
    }
  };

  onMounted(loadTraining);
  
  return { training, loadTraining };
}