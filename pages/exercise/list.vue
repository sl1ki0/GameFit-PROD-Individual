<template>
  <Toast />
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Каталог упражнений</h1>
    <div class="mb-4 space-y-4 md:space-y-0 md:flex md:space-x-4">
      <Dropdown v-model="selectedDifficulty" :options="DIFFICULTIES" optionLabel="name" placeholder="Выберите сложность"
        class="w-full md:w-auto" />
      <Dropdown v-model="selectedMuscleGroup" :options="MUSCLEGROUPS" optionLabel="name"
        placeholder="Выберите группу мышц" class="w-full md:w-auto" />
      <Dropdown v-model="selectedItem" :options="SPORT_EQUIPMENT" optionLabel="name" placeholder="Выберите экипировку"
        class="w-full md:w-auto" />
      <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <Button label="Очистить фильтры" icon="pi pi-filter-slash" class="p-button-secondary w-full md:w-auto"
          @click="clearFilters" />
        <Button label="Добавить упражнение" icon="pi pi-plus" class="p-button-success w-full md:w-auto"
          @click="openAddExercisePage" />
      </div>
    </div>
    <DataTable v-if="exercises?.length > 0" :value="filteredExercises" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Показано с {first} по {last} из {totalRecords}" responsiveLayout="scroll"
      @row-click="openExercisePage">
      <Column field="name" header="Название"></Column>
      <Column field="difficulty" header="Сложность"></Column>
      <Column field="muscleGroup" header="Часть тела"></Column>
      <Column field="items" header="Экипировка">
        <template #body="slotProps">
          {{ formatItems(slotProps.data.items) }}
        </template>
      </Column>
      <Column header="Удалить">
        <template #body="slotProps">
          <Button icon="pi pi-trash" class="p-button-danger p-button-rounded p-button-text"
            @click="handleDeletion(slotProps.data.id, slotProps.data.usedIn)" />
        </template>
      </Column>
    </DataTable>
    <Empty v-else></Empty>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DIFFICULTIES, MUSCLEGROUPS, SPORT_EQUIPMENT } from '~/constants/exerciseConstants';
import type Exercise from '~/types/trainings/ExerciseType';
import type { FilterOption, ExerciseEvent } from '~/types/trainings/ExercisesFilterTypes';
import { formatItems } from '#imports';
import deleteExercise from '~/utils/deleteExcercise';
import { useToast } from "#imports";
import Empty from '~/components/states/Empty.vue';

const toast = useToast();
const { exercises, isLoading, loadExercises } = useExercises();

const handleDeletion = (id: string, usedIn: Array<string> | null) => {
  if (!usedIn) {
    deleteExercise(id, toast);
    loadExercises();
  } else {
    toast.add({
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: 'Это упражнение используется в тренировке',
      life: 2500,
    })
  }
}

const selectedDifficulty = ref<FilterOption | null>(null);
const selectedMuscleGroup = ref<FilterOption | null>(null);
const selectedItem = ref<FilterOption | null>(null);

const filteredExercises = computed<Exercise[]>(() => {
  let filtered = exercises.value;

  if (selectedDifficulty.value) {
    const difficultyValue = selectedDifficulty.value.value;
    filtered = filtered.filter((exercise: Exercise) => exercise.difficulty === difficultyValue);
  }
  if (selectedMuscleGroup.value) {
    const muscleGroupValue = selectedMuscleGroup.value.value;
    filtered = filtered.filter((exercise: Exercise) => exercise.muscleGroup === muscleGroupValue);
  }
  if (selectedItem.value) {
    const itemValue = selectedItem.value.value;
    filtered = filtered.filter((exercise: Exercise) => exercise.items.includes(itemValue));
  }
  return filtered;
});

const clearFilters = (): void => {
  selectedDifficulty.value = null;
  selectedMuscleGroup.value = null;
  selectedItem.value = null;
};

const openExercisePage = (event: ExerciseEvent): ReturnType<typeof navigateTo> => {
  return navigateTo(`/exercise/${event.data.id}`);
};

const openAddExercisePage = () => {
  return navigateTo('/exercise/add');
}
</script>


<style>
.p-datatable-tbody>tr:hover {
  background-color: var(--p-button-secondary-hover-background) !important;
  cursor: pointer !important;
}
</style>