export default interface Training {
    id: string;
    name: string;
    description: string;
    exercises: Array<{
        exId: string,
        count: number
    }>;
    muscleGroup: "Грудь" | "Руки" | "Спина" | "Ноги" | "Общее";
    equipment: string[]
}