<template>
  <div :class="containerStyle">
    <Dropdown v-model="selectedDifficulty" :options="difficulties" optionLabel="name" placeholder="Выберите сложность"
      class="w-full md:w-auto" />
    <Dropdown v-model="selectedMuscleGroup" :options="muscleGroups" optionLabel="name"
      placeholder="Выберите группу мышц" class="w-full md:w-auto" />
    <Dropdown v-model="selectedItem" :options="sportEquipment" optionLabel="name" placeholder="Выберите экипировку"
      class="w-full md:w-auto" />
    <div class="flex md:flex-row flex-col md:space-x-2 space-y-2 md:space-y-0">
      <Button label="Очистить фильтры" icon="pi pi-filter-slash" class="p-button-secondary" :class="buttonsStyle"
        @click="clearFilters" />
      <Button label="Добавить упражнение" icon="pi pi-plus" class="p-button-success" :class="buttonsStyle"
        @click="openAddExercisePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DIFFICULTIES, MUSCLEGROUPS, SPORT_EQUIPMENT } from '~/constants/exerciseConstants';
import type { FilterOption } from '~/types/trainings/ExercisesFilterTypes';

defineProps({
  containerStyle: String,
  buttonsStyle: String
})

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