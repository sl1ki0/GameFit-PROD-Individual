<template>
  <Toast />
  <div class="p-4">
    <h1 class="mb-4 font-bold text-3xl">Каталог упражнений</h1>
    <ExerciseFilters @update-filters="updateFilters" />
    <ExerciseTable :exercises="filteredExercises" @reload-exercises="loadExercises" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type Exercise from '~/types/trainings/ExerciseType';
import ExerciseFilters from '~/components/exerciseList/ExerciseFilters.vue';
import ExerciseTable from '~/components/exerciseList/ExerciseTable.vue';
import { useExercises } from '~/composables/useExercises';
import type TypicalSelectValue from '~/types/typicalSelect/TypicalSelectValue';

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
</script>
