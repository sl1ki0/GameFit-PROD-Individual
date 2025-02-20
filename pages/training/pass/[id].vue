<template>
  <div>
    <div class="flex flex-col items-center gap-8">
      <h1 class="text-3xl font-semibold mt-4">{{ training?.name }}</h1>

      <StepCard v-if="training" :ex-id="training.exercises[currentStep].exId" :count="training.exercises[currentStep].count" :index="currentStep" @complete="currentStep++" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StepCard from '../../../components/passTraining/StepCard.vue';

const route = useRoute();
const currentStep = ref<number>(0)
const {training, loadTraining} = useInitalizePass(route.params.id as string);


</script>
