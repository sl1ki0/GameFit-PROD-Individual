<!-- components/ExerciseTable.vue -->
<template>
    <DataTable v-if="exercises.length > 0" :value="exercises" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
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
  </template>
  
  <script setup lang="ts">

  import type Exercise from '~/types/trainings/ExerciseType';
  import { formatItems } from '#imports';
  import deleteExercise from '~/utils/deleteExcercise';
  import { useToast } from "#imports";
  import Empty from '~/components/states/Empty.vue';
  
  const toast = useToast();
  
  const props = defineProps<{
    exercises: Exercise[];
  }>();
  
  const emit = defineEmits(['reload-exercises']);
  
  const handleDeletion = (id: string, usedIn: Array<string> | null) => {
    if (usedIn?.length === 0) {
      deleteExercise(id, toast).then(() => {
        emit('reload-exercises');
      }).catch((error) => {
        console.error(error);
        toast.add({
          severity: 'error',
          summary: 'Произошла ошибка',
          detail: 'Не удалось удалить упражнение',
          life: 2500,
        });
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Произошла ошибка',
        detail: 'Это упражнение используется в тренировке',
        life: 2500,
      });
    }
  };
  
  const openExercisePage = (event: any): ReturnType<typeof navigateTo> => {
    return navigateTo(`/exercise/${event.data.id}`);
  };
  </script>
  
  <style>
  .p-datatable-tbody>tr:hover {
    background-color: var(--p-button-secondary-hover-background) !important;
    cursor: pointer !important;
  }
  </style>