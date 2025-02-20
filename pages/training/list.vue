<template>
  <Toast></Toast>
  <div class="mx-auto p-4 container">
    <div class="flex justify-between items-center mb-4">
      <h1 class="font-bold text-3xl">Тренировки</h1>
      <Button label="Добавить" class="p-button-success" icon="pi pi-plus" @click="redirectToConstructor" />
    </div>
    <div class="mb-4">
      <div class="flex md:flex-row flex-col md:space-x-4 space-y-2 md:space-y-0">
        <InputText v-model="searchQuery" placeholder="Поиск по названию" class="mb-2 md:mb-0 w-full" />
        <div class="flex md:flex-row flex-col md:space-x-4 space-y-2 md:space-y-0 w-full">
          <Dropdown v-model="selectedMuscleGroup" :options="MUSCLEGROUPS" placeholder="Группа мышц" optionLabel="name"
            class="w-full" @change="filterTrainings" />
          <Dropdown v-model="selectedEquipment" :options="SPORT_EQUIPMENT" placeholder="Оборудование" optionLabel="name"
            class="w-full" @change="filterTrainings" />
        </div>
        <Button label="Сбросить фильтры" icon="pi pi-filter-slash" class="mt-2 md:mt-0 p-button-secondary w-full"
          @click="resetFilters" />
      </div>
    </div>
    <div v-if="trainings.length > 0" class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <TrainingCard v-for="training in filteredTrainings" :key="training.id" :training="training"
        @reloadTrainings="loadTrainings" />
    </div>
    <Empty v-else></Empty>
  </div>
</template>

<script setup lang="ts">
import TrainingCard from '~/components/TrainingCard.vue';
import { MUSCLEGROUPS, SPORT_EQUIPMENT } from '~/constants/exerciseConstants';
import type Training from '~/types/trainings/TrainingType';
import Empty from '~/components/states/Empty.vue';

const { trainings, isLoading, loadTrainings } = useTrainings();

const searchQuery = ref<string>('');


const selectedMuscleGroup = ref<{ name: string } | null>(null);
const selectedEquipment = ref<{ name: string } | null>(null);

const filterTrainings = () => {
  return trainings.value.filter(training => {
    const nameMatch = !searchQuery.value || training.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const muscleMatch = !selectedMuscleGroup.value || training.muscleGroup === selectedMuscleGroup.value.name;
    const equipmentMatch = !selectedEquipment.value || training.equipment.includes(selectedEquipment.value.name);
    return nameMatch && muscleMatch && equipmentMatch;
  });
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedMuscleGroup.value = null;
  selectedEquipment.value = null;
};

const redirectToConstructor = () => navigateTo('/training/contructor');

const filteredTrainings = computed<Training[]>(filterTrainings);
</script>