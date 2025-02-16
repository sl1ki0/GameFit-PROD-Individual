export default interface Excercise {
    id: string;
    name: string;
    difficulty: "Легкий" | "Средний" | "Высокий";
    muscleGroup: "Грудь" | "Руки" | "Спина" | "Ноги" | "Общее";
    item: string;
    instruction: string;
    images?: Array<String>;
    usedIn: Array<String>
}