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
        <Button label="Удалить" severity="danger" outlined class="w-full" />
        <Button label="Начать" class="w-full" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type Training from '~/types/trainings/TrainingType';

const props = defineProps<{
  training: Training;
}>();
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