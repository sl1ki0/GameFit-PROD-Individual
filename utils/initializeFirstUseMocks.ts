import { mockExercises, mockTrainings } from "~/constants/mocks";
import trainingDataStorage from "~/storage/trainingData";
import exerciseDataStorage from "~/storage/exerciseData";

export const initializeFirstUseMocks = async () => {
    for (let i = 0; i < mockExercises.length; i++) {
        await exerciseDataStorage.setItem(mockExercises[i].id, mockExercises[i]);
    };

    for (let l = 0; l < mockTrainings.length; l++) {
        await trainingDataStorage.setItem(mockTrainings[l].id, mockTrainings[l])
    }
}