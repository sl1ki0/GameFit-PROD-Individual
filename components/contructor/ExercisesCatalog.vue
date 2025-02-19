<template>
    <aside class="p-4 w-full md:w-1/3 overflow-y-auto">
        <h2 class="mb-4 font-bold text-2xl">Каталог упражнений</h2>

        <ExerciseFilters @update-filters="updateFilters"
            container-style="flex flex-col space-y-4 md:space-y-0 mb-4 gap-4" buttons-style="w-full h-full mb-2" />

        <!-- Список упражнений -->
        <div class="space-y-3">
            <Card v-for="exercise in filteredExercises" :key="exercise.id" class="hover:shadow-lg transition-shadow">
                <template #title>
                    <span class="font-bold text-lg">{{ exercise.name }}</span>
                </template>
                <template #content>
                    <Accordion>
                        <AccordionPanel value="0">
                            <AccordionHeader>Инструкция</AccordionHeader>
                            <AccordionContent>
                                <div class="m-0" v-html="exercise.instruction"></div>
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="1">
                            <AccordionHeader>Экипировка</AccordionHeader>
                            <AccordionContent>
                                <div class="m-0" v-html="exercise.items"></div>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                    <div class="flex justify-between items-center mt-3">
                        <span class="text-sm">{{ exercise.metric }}</span>
                        <Button icon="pi pi-plus" class="p-button-sm p-button-outlined"
                            @click="$emit('addToPlan', exercise)" />
                    </div>
                </template>
            </Card>
        </div>
    </aside>
</template>

<script setup lang="ts">
import ExerciseFilters from '../exerciseList/ExerciseFilters.vue';
import type TypicalSelectValue from '~/types/typicalSelect/TypicalSelectValue';
import type Exercise from '~/types/trainings/ExerciseType';

const emit = defineEmits<{
    (event: 'addToPlan', payload: Exercise): void
}>();

const { exercises } = useExercises();
const selectedDifficulty = ref<TypicalSelectValue | null>(null);
const selectedMuscleGroup = ref<TypicalSelectValue | null>(null);
const selectedItem = ref<TypicalSelectValue | null>(null);

const filteredExercises = computed<Exercise[]>(() => {
    let filtered = exercises.value;
    if (selectedDifficulty.value?.value) {
        filtered = filtered.filter((exercise: Exercise) =>
            exercise.difficulty === selectedDifficulty.value!.value
        );
    }
    if (selectedMuscleGroup.value?.value) {
        filtered = filtered.filter((exercise: Exercise) =>
            exercise.muscleGroup === selectedMuscleGroup.value!.value
        );
    }
    if (selectedItem.value?.value) {
        filtered = filtered.filter((exercise: Exercise) =>
            exercise.items.includes(selectedItem.value!.value)
        );
    }
    return filtered;
});

const updateFilters = (filters: { difficulty: any, muscleGroup: any, item: any }) => {
    selectedDifficulty.value = filters.difficulty;
    selectedMuscleGroup.value = filters.muscleGroup;
    selectedItem.value = filters.item;
};
</script>