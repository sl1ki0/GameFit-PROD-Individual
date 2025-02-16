<template>
    <div class="p-4">
        <h1 class="text-3xl font-bold mb-4">Каталог упражнений</h1>
        <div class="mb-4 space-y-4 md:space-y-0 md:flex md:space-x-4">
            <Dropdown v-model="selectedDifficulty" :options="DIFFICULTIES" optionLabel="name"
                placeholder="Select Difficulty" class="w-full md:w-auto" />
            <Dropdown v-model="selectedMuscleGroup" :options="MUSCLEGROUPS" optionLabel="name"
                placeholder="Select Muscle Group" class="w-full md:w-auto" />
            <Dropdown v-model="selectedItem" :options="items" optionLabel="name" placeholder="Select Item"
                class="w-full md:w-auto" />
            <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <Button label="Add Exercise" icon="pi pi-plus" class="p-button-success w-full md:w-auto" @click="openAddExercisePage"/>
                <Button label="Clear Filters" icon="pi pi-filter-slash" class="p-button-danger w-full md:w-auto"
                    @click="clearFilters" />
            </div>
        </div>
        <DataTable :value="filteredExercises" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Показано с {first} по {last} из {totalRecords}" responsiveLayout="scroll" @row-click="openExercisePage"
            >
            <Column field="name" header="Название"></Column>
            <Column field="difficulty" header="Сложность"></Column>
            <Column field="muscleGroup" header="Часть тела"></Column>
            <Column field="items" header="Экипировка"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DIFFICULTIES, MUSCLEGROUPS } from '~/constants/exerciseConstants';
import type Exercise from '~/types/trainings/ExerciseType';
import type { FilterOption,  ExerciseEvent} from '~/types/trainings/ExercisesFilterTypes';

const exercises = ref<Exercise[]>([
  {
    id: 'dfndnfd',
    name: 'Приседания',
    difficulty: 'Легкий',
    muscleGroup: 'Ноги',  
    items: ['Нет'],
    instruction: '',
    usedIn: [],
  },
]);

const items = ref<FilterOption[]>([
  { name: 'Нет', value: 'Нет' },
  { name: 'Гантеля', value: 'Гантеля' },
  { name: 'Штанга', value: 'Штанга' },
  { name: 'Скакалка', value: 'Скакалка' },
]);

const selectedDifficulty = ref<FilterOption | null>(null);
const selectedMuscleGroup = ref<FilterOption | null>(null);
const selectedItem = ref<FilterOption | null>(null);

const filteredExercises = computed<Exercise[]>(() => {
  let filtered = exercises.value;

  if (selectedDifficulty.value) {
    const difficultyValue = selectedDifficulty.value.value;
    filtered = filtered.filter((exercise) => exercise.difficulty === difficultyValue);
  }
  if (selectedMuscleGroup.value) {
    const muscleGroupValue = selectedMuscleGroup.value.value;
    filtered = filtered.filter(exercise => exercise.muscleGroup === muscleGroupValue);
  }
  if (selectedItem.value) {
    const itemValue = selectedItem.value.value;
    filtered = filtered.filter(exercise => exercise.items.includes(itemValue));
  }
  return filtered;
});

const clearFilters = (): void => {
  selectedDifficulty.value = null;
  selectedMuscleGroup.value = null;
  selectedItem.value = null;
};

const openExercisePage = (event: ExerciseEvent): ReturnType<typeof navigateTo> => {
  return navigateTo(`/exercises/${event.data.id}`);
};

const openAddExercisePage = () => {
    return navigateTo('/exercise/add');
}
</script>


<style>
.p-datatable-tbody > tr:hover{
    background-color: var(--p-button-secondary-hover-background) !important;
    cursor: pointer !important;
}
</style>