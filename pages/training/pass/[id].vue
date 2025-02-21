<template>
  <div>
    <Toast :success-icon="'pi pi-trophy'" />
    <div class="flex flex-col items-center gap-8">
      <h1 class="mt-4 font-semibold text-3xl">{{ training?.name }}</h1>

      <StepCard 
        v-if="training?.exercises[currentStep]"
        :ex-id="training.exercises[currentStep].exId" 
        :count="training.exercises[currentStep].count" 
        :index="currentStep" 
        @complete="handleCompletion" 
      />

      <FinalStats v-if="final" :stats="completedMetrics" :time="trainingDuration" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StepCard from '@/components/passTraining/StepCard.vue';
import FinalStats from '~/components/passTraining/FinalStats.vue';
import type CompletionData from '~/types/trainings/CompletionData';
import { processStatistics } from '~/utils/achievements/achievementController';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const currentStep = ref<number>(0);
const final = ref(false);
const startTime = ref(Date.now());
const trainingDuration = ref(0);
const toast = useToast();

const { training, loadTraining } = useInitalizePass(route.params.id as string);

const completedMetrics = ref<Array<{ metric: string, count: number }>>([]);

const handleCompletion = async (data: CompletionData) => {
  if (data.isCompleted) {
    updateCompletedMetrics(data);
  }

  currentStep.value++;

  const isTrainingComplete = currentStep.value >= (training.value?.exercises.length ?? 0);
  if (isTrainingComplete) {
    await finishTraining();
  }
};

const updateCompletedMetrics = (data: CompletionData) => {
  const existingMetricIndex = completedMetrics.value.findIndex(
    metric => metric.metric === data.metric
  );

  if (existingMetricIndex !== -1) {
    completedMetrics.value[existingMetricIndex].count += data.count;
  } else {
    completedMetrics.value.push({
      count: data.count,
      metric: data.metric
    });
  }
};

const finishTraining = async () => {
  trainingDuration.value = Math.floor((Date.now() - startTime.value) / 1000);
  final.value = true;

  try {
    const newAchievements = await processStatistics(completedMetrics.value);
    
    if (newAchievements.length > 0) {
      showAchievementsToast(newAchievements.length);
    }
  } catch (error) {
    console.error('Ошибка при обработке ачивок:', error);
  }
};

const showAchievementsToast = (achievementsCount: number) => {
  toast.add({
    severity: 'success', 
    summary: 'Новые достижения!',
    detail: `Получено ${achievementsCount} новых достижений`,
    life: 4000,
  });
};
</script>