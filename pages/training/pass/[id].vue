<template>
  <div>
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

const route = useRoute();
const currentStep = ref<number>(0);
const final = ref(false);
const startTime = ref(Date.now());
const trainingDuration = ref(0);

const { training, loadTraining } = useInitalizePass(route.params.id as string);

const completedMetrics = ref<Array<{ metric: string, count: number }>>([]);

const handleCompletion = async (data: CompletionData) => {
  if (data.isCompleted) {
    const existingMetricIndex = completedMetrics.value.findIndex(
    ex => ex.metric === data.metric
  );

  if (existingMetricIndex !== -1) {
    completedMetrics.value[existingMetricIndex].count += data.count;
  } else {
    completedMetrics.value.push({
      count: data.count,
      metric: data.metric
    });
  }
  }

  currentStep.value++;
  if (currentStep.value >= (training.value?.exercises.length ?? 0)) {
    trainingDuration.value = Math.floor((Date.now() - startTime.value) / 1000);
    final.value = true;
  }
};
</script>