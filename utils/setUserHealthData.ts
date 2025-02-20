import userDataStorage from "~/storage/userData";
import { calculateBMI, getBaseGoal } from "./calc/basicHealthData";

const setUserHealhData = async (weight: number | null, height: number | null) => {
    if (!weight || !height) {
        throw new Error("Неверные аргументы");
    };

    const bmi = calculateBMI(weight, height);
    const baseGoal = getBaseGoal(bmi);

    await userDataStorage.setItem('health', {
        bmi: bmi,
        baseGoal: baseGoal
    });
};

export default setUserHealhData;