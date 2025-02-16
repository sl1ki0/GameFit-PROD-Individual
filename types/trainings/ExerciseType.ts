export default interface Exercise {
    id: string;
    name: string;
    difficulty: "Легкий" | "Средний" | "Высокий";
    muscleGroup: "Грудь" | "Руки" | "Спина" | "Ноги" | "Общее";
    items: string[];
    instruction: string;
    media?: string[];
    usedIn: string[] | null
}