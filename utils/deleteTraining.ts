import type Training from "~/types/trainings/TrainingType";
import trainingDataStorage from "~/storage/trainingData";
import { useToast } from "primevue";

const toast = useToast();

const deleteTraining = async (id: string) => {
    try {
      const fullTraining: Training | null = await trainingDataStorage.getItem(id);
      await removeTrainingFromExercisesUsedIn(fullTraining!.exercises, id);
      await trainingDataStorage.removeItem(id);
      toast.add({
        severity: 'success',
        summary: 'Успех!',
        detail: "Успешно удалено",
        life: 1500,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      toast.add({
        severity: 'error',
        summary: 'Произошла ошибка',
        detail: errorMessage,
        life: 3500,
      });
    }
};

export default deleteTraining