import type Training from "~/types/trainings/TrainingType";
import trainingDataStorage from "~/storage/trainingData";

const deleteTraining = async (id: string) => {
    const fullTraining: Training | null = await trainingDataStorage.getItem(id);
    await removeTrainingFromExercisesUsedIn(fullTraining!.exercises, id);
    await trainingDataStorage.removeItem(id);
};

export default deleteTraining