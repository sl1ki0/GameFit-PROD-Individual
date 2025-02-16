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
                <Button label="Add Exercise" icon="pi pi-plus" class="p-button-success w-full md:w-auto" />
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
            <Column field="item" header="Экипировка"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { DIFFICULTIES, MUSCLEGROUPS } from '~/constants/exerciseConstants';


const exercises = ref([
    { id:'dfndnfd', name: 'Приседания', difficulty: 'Легкий', muscleGroup: 'Ноги', item: 'Нет' },

]);

const items = ref([
    { name: 'Нет', value: 'Нет' },
    { name: 'Гантеля', value: 'Гантеля' },
    { name: 'Штанга', value: 'Штанга' },
    { name: 'Скакалка', value: 'Скакалка' },
]);

const selectedDifficulty = ref(null);
const selectedMuscleGroup = ref(null);
const selectedItem = ref(null);

const filteredExercises = computed(() => {
    let filtered = exercises.value;
    if (selectedDifficulty.value) {
        filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty.value.value);
    }
    if (selectedMuscleGroup.value) {
        filtered = filtered.filter(exercise => exercise.muscleGroup === selectedMuscleGroup.value.value);
    }
    if (selectedItem.value) {
        filtered = filtered.filter(exercise => exercise.item === selectedItem.value.value);
    }
    return filtered;
});

const clearFilters = () => {
    selectedDifficulty.value = null;
    selectedMuscleGroup.value = null;
    selectedItem.value = null;
};

const openExercisePage = (event) => {
    return navigateTo(`/exercises/${event.data.id}`)
}
</script>

<style>
.p-datatable-tbody > tr:hover{
    background-color: var(--p-button-secondary-hover-background) !important;
    cursor: pointer !important;
}
</style>