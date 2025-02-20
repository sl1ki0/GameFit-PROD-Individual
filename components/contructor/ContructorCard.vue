<template>
    <Card :key="index" class="shadow-md hover:shadow-lg p-4 transition-shadow mt-4">
        <template #content>
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-xl">{{ exercise!.exercise.name }}</h3>
                <Button icon="pi pi-times" class="p-button-text" severity="danger" @click="$emit('removeEx', index!)" />
            </div>

            <div class="flex flex-col gap-4 mt-3 mb-2">
                <p class="text-md font-semibold">Рекомендованная цель: {{ exTarget }}</p>
                <InputNumber :min="1" :class="inputStyle" v-model.number="exercise!.count" />
                <Slider :min="1" v-model="exercise!.count" :class="sliderStyle" />
            </div>
            <span class="text-sm">
                {{ exercise!.exercise.metric }}
            </span>

            <HighLoad v-if="exercise.count > exUpperLimit" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import HighLoad from '../states/HighLoad.vue';
import calculateExercise from '~/utils/calc/calculateExercise';
import type PlanExercise from '~/types/trainings/PlanExercise';

const props = defineProps<{
  index: number;
  exercise: PlanExercise;
  inputStyle: string;
  sliderStyle: string;
}>();

const exTarget = ref(0);
const exUpperLimit =  ref(0)

onMounted(async () => {
    if (!props.exercise) {
        return
    }

    try {
        const { target, upperLimit } = await calculateExercise(props.exercise.exercise);
        exTarget.value = target;
        exUpperLimit.value =  upperLimit;
    } catch (err) {
        console.error(err);
    }
})

const emit = defineEmits<{
    (event: 'removeEx', payload: number): void,
}>();

</script>