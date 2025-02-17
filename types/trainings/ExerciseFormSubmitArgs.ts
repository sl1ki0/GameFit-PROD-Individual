import type Exercise from "./ExerciseType";

export default interface ExerciseFromSubmitArgs {
    valid: boolean;
    values: Exercise;
}