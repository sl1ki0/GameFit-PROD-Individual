<template>
    <Galleria v-if="exercise?.media" :key="index" :value="exercise?.media" :numVisible="5" containerStyle="max-width: 100vw"
        :showThumbnails="false" :showIndicators="true">
        <template #item="slotProps">
            <img :src="slotProps.item" :alt="slotProps.item" style="width: 100%; max-height: 15vh; display: block" />
        </template>
    </Galleria>
    <transition name="swipe" mode="out-in">
        <Card :key="index" style="width: 25rem; overflow: hidden">
            <template #content>
                <div class="flex flex-col items-center w-full h-full gap-4">
                    <h2 class="text-xl font-semibold">{{ exercise?.name }}</h2>
                    <div v-html="exercise?.instruction"></div>
                    <Countdown v-if="exercise?.metric === 'Время (сек)' " :duration="count"></Countdown>
                    <p v-else>{{ actionText }}</p>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Cancel" severity="secondary" outlined class="w-full" />
                    <Button label="Save" class="w-full" @click="$emit('complete')" />
                </div>
            </template>
        </Card>
    </transition>
</template>

<script setup lang="ts">
import type Exercise from '~/types/trainings/ExerciseType';
import { getExerciseByKey } from '#imports';
import Countdown from '../pass/Countdown.vue';

const props = defineProps<{
    exId: string;
    index: number;
    count: number;
}>();

const emit = defineEmits<{
    (event: 'complete'): void,
}>();

const exercise = ref<Exercise | null>()

onMounted(async () => {
    exercise.value = await getExerciseByKey(props.exId);
})

watch(
    () => props.exId,
    async (newId) => {
        if (newId) {
            exercise.value = await getExerciseByKey(props.exId);
        }
    },
    { immediate: true }
);

const actionText = computed(() => {
  if (!exercise.value) return '';
  switch (exercise.value.metric) {
    case 'Число повторений':
        return `Сделать ${props.count} раз.`
    case 'Вес (кг)':
        return `Сделать с ${props.count} кг.`
    case 'Дистанция (м)':
        return `На ${props.count} метров.`
    case 'Время (сек)':
        return `Выполнять в течение ${props.count} секунд.`
    default:
        return `Сделать ${props.count} ${exercise.value.metric}`
  }
});
</script>

<style scoped>
.swipe-enter-active,
.swipe-leave-active {
    transition: transform 0.3s ease;
}

.swipe-enter-from {
    transform: translateX(100%);
}

.swipe-enter-to {
    transform: translateX(0%);
}

.swipe-leave-from {
    transform: translateX(0%);
}

.swipe-leave-to {
    transform: translateX(-100%);
}
</style>