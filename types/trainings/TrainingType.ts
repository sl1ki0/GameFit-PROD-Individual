export default interface Training {
    id: string;
    name: string;
    description: string;
    exercises: Array<string>;
    muscleGroup: "Грудь" | "Руки" | "Спина" | "Ноги" | "Общее";
    equipment: string[]
}