export default interface Training {
    id: string;
    name: string;
    description: string;
    exercises: Array<{
        exId: string,
        count: number
    }>;
    muscleGroup: string;
    difficulty: string;
    equipment: string[]
}