<template>
<Card class="overflow-hidden w-full lg:w-4/5">
    <template #title>{{training.name}}</template>
    <template #subtitle>{{training.muscleGroup}}</template>
    <template #content>
      <div class="flex flex-col gap-4">
        <p class="m-0">
          {{ training.description }}
        </p>
        <div class="flex w-full gap-2">
          <Tag v-for="item in training.equipment" class="w-1/3 overflow-hidden" severity="secondary" rounded>{{item}}</Tag>
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
.p-card-body{
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  }

.p-card-footer{
  margin-top: auto !important;
}
</style>