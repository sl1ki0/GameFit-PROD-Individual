import type Exercise from "~/types/trainings/ExerciseType";
import userDataStorage from "~/storage/userData";
import type HealthData from "~/types/createUser/HealthData";
import type { UserData } from "~/types/createUser/UserDataTypes";

type MetricPresets = {
    base: { [goal: string]: { [level: number]: number } },
    maxMultiplier: { [goal: string]: { [level: number]: number } }
};

const presets: { [key in Exercise['metric']]: MetricPresets } = {
    'Вес (кг)': {
        base: {
            mass_gain: { 1: 0.4, 2: 0.5, 3: 0.6 },
            weight_loss: { 1: 0.25, 2: 0.3, 3: 0.35 },
            maintenance: { 1: 0.35, 2: 0.4, 3: 0.45 }
        },
        maxMultiplier: {
            mass_gain: { 1: 1.3, 2: 1.25, 3: 1.2 },
            weight_loss: { 1: 1.2, 2: 1.15, 3: 1.1 },
            maintenance: { 1: 1.25, 2: 1.2, 3: 1.15 }
        }
    },
    'Число повторений': {
        base: {
            mass_gain: { 1: 8, 2: 10, 3: 12 },
            weight_loss: { 1: 15, 2: 20, 3: 25 },
            maintenance: { 1: 12, 2: 15, 3: 18 }
        },
        maxMultiplier: {
            mass_gain: { 1: 1.5, 2: 1.4, 3: 1.3 },
            weight_loss: { 1: 1.3, 2: 1.25, 3: 1.2 },
            maintenance: { 1: 1.4, 2: 1.3, 3: 1.25 }
        }
    },
    'Время (сек)': {
        base: {
            mass_gain: { 1: 40, 2: 50, 3: 60 },
            weight_loss: { 1: 50, 2: 60, 3: 70 },
            maintenance: { 1: 45, 2: 55, 3: 65 }
        },
        maxMultiplier: {
            mass_gain: { 1: 1.4, 2: 1.3, 3: 1.25 },
            weight_loss: { 1: 1.3, 2: 1.25, 3: 1.2 },
            maintenance: { 1: 1.35, 2: 1.3, 3: 1.25 }
        }
    },
    'Дистанция (м)': {
        base: {
            mass_gain: { 1: 800, 2: 1000, 3: 1200 },
            weight_loss: { 1: 2000, 2: 2500, 3: 3000 },
            maintenance: { 1: 1500, 2: 2000, 3: 2500 }
        },
        maxMultiplier: {
            mass_gain: { 1: 1.35, 2: 1.3, 3: 1.25 },
            weight_loss: { 1: 1.25, 2: 1.2, 3: 1.15 },
            maintenance: { 1: 1.3, 2: 1.25, 3: 1.2 }
        }
    }
};

const calculateExercise = async (
    exercise: Exercise
) => {
    const healthData: HealthData | null = await userDataStorage.getItem('health');
    const user: UserData | null = await userDataStorage.getItem('user');
    if (!healthData || !user) {
        throw new Error('Отсутствует информация о пользователе')
    }
    const goal = healthData.baseGoal;
    const ageFactor = user.age >= 50 ? 0.85 + (user.sportActivity * 0.05) : 1;

    const base = presets[exercise.metric].base[goal][user.sportActivity];
    const maxMult = presets[exercise.metric].maxMultiplier[goal][user.sportActivity];

    let target = base;
    if (exercise.metric === 'Вес (кг)') {
        target = user.weight * base;
    }

    const muscleFactor = {
        'Ноги': 1.2, 'Спина': 1.1, 'Грудь': 1.0, 'Руки': 1.0, 'Общее': 1.0
    }[exercise.muscleGroup];

    target = Math.round(target * ageFactor * muscleFactor);
    let upperLimit = Math.round(target * maxMult);

    if (exercise.metric === 'Вес (кг)' && upperLimit > user.weight * 0.9) {
        upperLimit = Math.round(user.weight * 0.9);
    }

    return { target, upperLimit };
};

export default calculateExercise;