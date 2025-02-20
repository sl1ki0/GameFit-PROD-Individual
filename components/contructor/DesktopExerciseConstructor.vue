<template>
    <main class="hidden md:block flex-1 p-6 overflow-y-auto">
        <div class="flex md:flex-row flex-col justify-between items-center mb-6">
            <h2 class="mb-4 md:mb-0 font-bold text-2xl md:text-3xl">
                Конструктор тренировки
            </h2>
            <PlanControlButtons @open-auto-dialog="$emit('openAutoDialog')" @reset="$emit('reset')"
                @save="$emit('save')" />
        </div>

        <div v-if="planExercises?.length === 0" class="text-center">
            Вы не добавили упражнения.
        </div>

        <div v-for="(exercise, index) in planExercises" v-else class="space-y-4">
            <ContructorCard :exercise="exercise" :index="index" :input-style="'w-1/6'" :slider-style="'w-1/6'" @remove-ex="$emit('removeEx', index)" />
        </div>
    </main>
</template>

<script setup lang="ts">
import type PlanExercise from '~/types/trainings/PlanExercise';
import PlanControlButtons from './PlanControlButtons.vue';
import ContructorCard from './ContructorCard.vue';

const props = defineProps({
    planExercises: Array<PlanExercise>
});

const emit = defineEmits<{
    (event: 'openAutoDialog'): void,
    (event: 'reset'): void,
    (event: 'save'): void,
    (event: 'removeEx', payload: number): void,
}>();

</script>