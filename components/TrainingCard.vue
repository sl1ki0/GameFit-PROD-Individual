<template>
  <Card class="overflow-hidden w-full lg:w-4/5">
    <template #title>{{ training.name }}</template>
    <template #subtitle>{{ training.muscleGroup }}</template>
    <template #content>
      <div class="flex flex-col gap-4">
        <p class="m-0">
          {{ training.description }}
        </p>
        <div class="flex flex-wrap gap-2">
          <Tag v-for="item in training.equipment" severity="secondary" :key="item"
            class="inline-flex items-center justify-center px-2 py-1 text-sm rounded-lg min-w-fit max-w-[150px] truncate">
            {{ item }}
          </Tag>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Удалить" severity="danger" outlined class="w-full" @click="handleDeletion(training.id)" />
        <Button label="Начать" class="w-full" @click="passTraining(training.id)" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type Training from '~/types/trainings/TrainingType';
import { useToast } from 'primevue';

const props = defineProps<{
  training: Training;
}>();

const emit = defineEmits<{
  (event: 'reloadTrainings'): void
}>();

const passTraining = (id: string) => {
  return navigateTo(`/training/pass/${id}`)
}

const toast = useToast();

const handleDeletion = async (id: string) => {
  try {
    await deleteTraining(id);
    toast.add({
      severity: 'success',
      summary: 'Успех!',
      detail: "Успешно удалено",
      life: 1500,
    });
    emit('reloadTrainings');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    toast.add({
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: errorMessage,
      life: 3500,
    });
  }
}
</script>

<style>
.p-card-body {
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

.p-card-footer {
  margin-top: auto !important;
}
</style>