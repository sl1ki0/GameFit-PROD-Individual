<template>
  <div>
    <div class="flex flex-col items-center gap-8">
      <h1 class="mt-4 font-semibold text-3xl">{{ training?.name }}</h1>

      <StepCard 
        v-if="training && !final"
        :ex-id="training.exercises[currentStep].exId" 
        :count="training.exercises[currentStep].count" 
        :index="currentStep" 
        @complete="handleCompletion" 
      />
      
      <div v-else-if="final" class="text-2xl">
        Тренировка завершена!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepCard from '../../../components/passTraining/StepCard.vue';

const route = useRoute();
const currentStep = ref<number>(0);
const final = ref(false)
const {training, loadTraining} = useInitalizePass(route.params.id as string);

const handleCompletion = () => {
  currentStep.value++
  if (currentStep.value >= (training.value?.exercises.length ?? 0)) {
    final.value = true
    console.log('final')
  }
}
</script>
