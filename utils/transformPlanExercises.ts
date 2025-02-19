import type PlanExercise from "~/types/trainings/PlanExercise";

export function transformPlanExercises(planExercises: PlanExercise[]) {
    const muscleGroupCount: Record<string, number> = {};
    const difficultyCount: Record<string, number> = {};
    const itemsSet = new Set<string>();

    const transformedArray = planExercises.map(({ exercise: { id, muscleGroup, difficulty, items }, count }) => {
        muscleGroupCount[muscleGroup] = (muscleGroupCount[muscleGroup] || 0) + 1;
        difficultyCount[difficulty] = (difficultyCount[difficulty] || 0) + 1;
        items.forEach(item => itemsSet.add(item));

        return { exId: id, count };
    });

    const getMostCommon = (obj: Record<string, number>) =>
        Object.entries(obj).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    return {
        transformedArray,
        mostCommonMuscleGroup: getMostCommon(muscleGroupCount),
        mostCommonDifficulty: getMostCommon(difficultyCount),
        uniqueItems: Array.from(itemsSet),
    };
}
