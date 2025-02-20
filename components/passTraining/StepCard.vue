<template>
    <Galleria v-if="exercise?.media && !rest" :key="index" :value="exercise?.media" :numVisible="5" containerStyle="max-width: 100vw"
        :showThumbnails="false" :showIndicators="true">
        <template #item="slotProps">
            <img :src="slotProps.item" :alt="slotProps.item" style="width: 100%; max-height: 15vh; display: block" />
        </template>
    </Galleria>
    <transition name="swipe" mode="out-in">
        <Card :key="index" style="width: 25rem; overflow: hidden">
            <template #content>
                <div v-if="!rest" class="flex flex-col items-center gap-4 w-full h-full">
                    <h2 class="font-semibold text-xl">{{ exercise?.name }}</h2>
                    <div v-html="exercise?.instruction"></div>
                    <Countdown v-if="exercise?.metric === 'Время (сек)' " :duration="count" @complete="handleCompletion"></Countdown>
                    <p v-else>{{ actionText }}</p>
                </div>
                <div v-else class="flex flex-col items-center gap-4 w-full h-full">
                    <h2 class="font-semibold text-xl">Отдых</h2>
                    <Countdown :duration="count" :isRest="rest" @complete="handleEndRest"></Countdown>
                </div>
            </template>
            <template #footer>
                <div v-if="exercise?.metric !== 'Время (сек)' && !rest " class="flex gap-4 mt-1">
                    <Button label="Выполнено" severity="secondary" icon="pi pi-check" class="w-full" @click="handleCompletion" />
                </div>
            </template>
        </Card>
    </transition>
</template>

<script setup lang="ts">
import type Exercise from '~/types/trainings/ExerciseType';
import { getExerciseByKey } from '#imports';
import Countdown from './Countdown.vue';

const props = defineProps<{
    exId: string;
    index: number;
    count: number;
}>();

const emit = defineEmits<{
    (event: 'complete'): void,
}>();

const exercise = ref<Exercise | null>(null)

const initExercise = async () => {
    exercise.value = await getExerciseByKey(props.exId);
}

watchEffect(async () => {
    if (props.exId) {
        await initExercise();
    }
});

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

const rest = ref(false);

const handleCompletion = () => {
    rest.value = true;
    
}

const handleEndRest = () => {
    rest.value = false;
    emit('complete')
}
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