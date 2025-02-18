<template>
  <div class="mb-4 space-y-4 md:space-y-0 md:flex md:space-x-4">
    <Dropdown v-model="selectedDifficulty" :options="difficulties" optionLabel="name" placeholder="Выберите сложность"
      class="w-full md:w-auto" />
    <Dropdown v-model="selectedMuscleGroup" :options="muscleGroups" optionLabel="name"
      placeholder="Выберите группу мышц" class="w-full md:w-auto" />
    <Dropdown v-model="selectedItem" :options="sportEquipment" optionLabel="name" placeholder="Выберите экипировку"
      class="w-full md:w-auto" />
    <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
      <Button label="Очистить фильтры" icon="pi pi-filter-slash" class="p-button-secondary w-full md:w-auto"
        @click="clearFilters" />
      <Button label="Добавить упражнение" icon="pi pi-plus" class="p-button-success w-full md:w-auto"
        @click="openAddExercisePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DIFFICULTIES, MUSCLEGROUPS, SPORT_EQUIPMENT } from '~/constants/exerciseConstants';
import type { FilterOption } from '~/types/trainings/ExercisesFilterTypes';

const difficulties = DIFFICULTIES;
const muscleGroups = MUSCLEGROUPS;
const sportEquipment = SPORT_EQUIPMENT;

const selectedDifficulty = ref<FilterOption | null>(null);
const selectedMuscleGroup = ref<FilterOption | null>(null);
const selectedItem = ref<FilterOption | null>(null);

const emit = defineEmits(['update-filters']);

const clearFilters = (): void => {
  selectedDifficulty.value = null;
  selectedMuscleGroup.value = null;
  selectedItem.value = null;
  emit('update-filters', { difficulty: null, muscleGroup: null, item: null });
};

const openAddExercisePage = () => {
  navigateTo('/exercise/add');
}

watch([selectedDifficulty, selectedMuscleGroup, selectedItem], ([difficulty, muscleGroup, item]) => {
  emit('update-filters', { difficulty, muscleGroup, item });
});
</script>