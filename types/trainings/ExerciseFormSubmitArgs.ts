import type Exercise from "./ExerciseType";

export default interface ExerciseFromSubmitArgs {
    valid: boolean;
    values: {
        id: string;
        name: string;
        difficulty: "Легкий" | "Средний" | "Высокий";
        muscleGroup: "Грудь" | "Руки" | "Спина" | "Ноги" | "Общее";
        items: string[];
        instruction: string;
        media: string;
        usedIn: string[] | null;
        metric: "Вес (кг)" | "Число повторений" | "Время (сек)" | "Дистанция (м)";
    };
}