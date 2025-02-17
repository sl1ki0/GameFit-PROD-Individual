import exerciseDataStorage from "~/storage/exerciseData";

export default async function deleteExercise(id: string, toast: any) {
    try {
        await exerciseDataStorage.removeItem(id);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        toast.add({
            severity: 'error',
            summary: 'Произошла ошибка',
            detail: errorMessage,
            life: 2500,
        });
    } finally {
        toast.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: "Упражнение удалено",
            life: 2500,
        });
        
    }
}