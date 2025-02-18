<template>
    <div class="flex md:flex-row flex-col h-screen">
        <!-- Каталог упражнений -->
        <aside class="p-4 w-full md:w-1/3 overflow-y-auto">
            <h2 class="mb-4 font-bold text-2xl">Каталог упражнений</h2>

            <ExerciseFilters @update-filters="updateFilters"
                container-style="flex flex-col space-y-4 md:space-y-0 mb-4 gap-4" buttons-style="w-full h-full mb-2" />

            <!-- Список упражнений -->
            <div class="space-y-3">
                <Card v-for="exercise in filteredExercises" :key="exercise.id"
                    class="hover:shadow-lg transition-shadow">
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
                                @click="addExerciseToPlan(exercise)" />
                        </div>
                    </template>
                </Card>
            </div>
        </aside>

        <div class="hidden lg:block">
            <Divider layout="vertical"><b class="pi-arrow-right pi"></b></Divider>
        </div>

        <!-- Конструктор тренировки -->
        <main class="flex-1 p-6 overflow-y-auto">
            <div class="flex md:flex-row flex-col justify-between items-center mb-6">
                <h2 class="mb-4 md:mb-0 font-bold text-2xl md:text-3xl">
                    Конструктор тренировки
                </h2>
                <div class="flex flex-wrap gap-3">
                    <Button label="Автозаполнить" icon="pi pi-filter" class="p-button-rounded"
                        @click="openAutoSelectDialog" />
                    <Button label="Сбросить план" icon="pi pi-refresh" class="p-button-warning p-button-rounded"
                        @click="resetPlan" />
                    <Button label="Сохранить" icon="pi pi-check" class="p-button-success p-button-rounded"
                        @click="savePlan" />
                </div>
            </div>

            <div v-if="planExercises.length === 0" class="text-center">
                Вы не добавили упражнения.
            </div>

            <div v-else class="space-y-4">
                <Card v-for="(exercise, index) in planExercises" :key="index"
                    class="shadow-md hover:shadow-lg p-4 transition-shadow">
                    <template #content>
                        <div class="flex justify-between items-center">
                            <h3 class="font-bold text-xl">{{ exercise.exercise.name }}</h3>
                            <Button icon="pi pi-times" class="p-button-text" severity="danger"
                                @click="() => removeExerciseFromPlan(index)" />
                        </div>

                        <!-- Управление параметрами -->
                        <div class="flex flex-col gap-4 mt-3 mb-2">
                            <InputNumber :min="1" class="w-1/6" v-model.number="exercise.count" />
                            <Slider :min="1" v-model="exercise.count" class="w-1/6" />
                        </div>
                        <span class="text-sm">
                            {{ exercise.exercise.metric }}
                        </span>

                        <!-- Предупреждение о перегрузке -->
                        <div v-if="isOverload(exercise)" class="mt-2 font-medium text-red-600 text-sm">
                            Предупреждение: слишком высокая нагрузка!
                        </div>
                    </template>
                </Card>
            </div>
        </main>

        <!-- Диалог автоподбора -->
        <Dialog header="Автоподбор упражнений" v-model:visible="autoSelectDialogVisible" :modal="true" :closable="true">
            <div class="space-y-4">
                <div>
                    <label class="block mb-1">Выберите часть тела</label>
                    <Dropdown v-model="autoSelectedBodyPart" :options="MUSCLEGROUPS" optionLabel="name"
                        optionValue="value" placeholder="Часть тела" class="w-full" />
                </div>
                <Button label="Подобрать упражнения" icon="pi pi-search" class="w-full" @click="applyAutoSelect" />
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { MUSCLEGROUPS } from '~/constants/exerciseConstants';
import type Exercise from '~/types/trainings/ExerciseType';
import type TypicalSelectValue from '~/types/typicalSelect/TypicalSelectValue';
import ExerciseFilters from '~/components/exerciseList/ExerciseFilters.vue';

const { exercises, isLoading, loadExercises } = useExercises();
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

const planExercises = ref<any>([])

const addExerciseToPlan = (exercise: Exercise) => {
    planExercises.value.push({
        exercise,
        count: 1
    })
}

const removeExerciseFromPlan = (index: number) => {
    planExercises.value.splice(index, 1)
}

const resetPlan = () => {
    planExercises.value = []
}

const isOverload = (exercise: Exercise): boolean => {
    return true // Костылек для проверки верстки, нагуглю формулы и сделаю
}

// Автоподбор через диалог (нужно доделать)
const autoSelectDialogVisible = ref<boolean>(false)
const autoSelectedBodyPart = ref<string | null>(null)
const autoSelectedType = ref<string | null>(null)

const openAutoSelectDialog = () => {
    autoSelectDialogVisible.value = true
}

const applyAutoSelect = () => {
    return
}

const savePlan = () => {
    console.log('Сохранённый план:', planExercises.value);
}
</script>