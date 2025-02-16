export default interface Exercise {
    id: string;
    name: string;
    difficulty: "Легкий" | "Средний" | "Высокий";
    muscleGroup: "Грудь" | "Руки" | "Спина" | "Ноги" | "Общее";
    item: string;
    instruction: string;
    images?: string[];
    usedIn: string[]
}