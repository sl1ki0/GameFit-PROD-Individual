<template>
    <div class="md:hidden block right-0 bottom-0 left-0 z-50 fixed shadow-lg transition-all duration-300 autoBg"
        :class="isExpanded ? 'h-[80vh]' : 'h-16'">

        <div @click="$emit('toggle')">
            <div class="flex justify-center items-center w-full cursor-pointer">
                <div class="bg-gray-300 my-2 rounded-full w-12 h-1"></div>
            </div>
            <div v-if="!isExpanded" class="px-4 pb-2">
                <h2 class="font-bold text-lg">Нажми, чтобы открыть</h2>
            </div>
        </div>

        <div v-if="isExpanded" class="p-4 h-full overflow-y-auto">
            <div class="flex flex-col">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="font-bold text-2xl">Конструктор тренировки</h2>
                    <Button label="Закрыть" icon="pi pi-times" class="p-button-text p-button-rounded"
                        @click="$emit('toggle')" />
                </div>
                <div v-if="planExercises?.length === 0" class="text-center">
                    Вы не добавили упражнения.
                </div>
                <div v-else v-for="(exercise, index) in planExercises" class="space-y-4">
                    <ContructorCard :exercise="exercise" :index="index" :input-style="'w-1/2'" :slider-style="'w-full'" @remove-ex="$emit('removeEx', index)" />
                </div>
                <PlanControlButtons :is-mobile="true" @open-auto-dialog="$emit('openAutoDialog')"
                    @reset="$emit('reset')" @save="$emit('save')" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type PlanExercise from '~/types/trainings/PlanExercise';
import PlanControlButtons from './PlanControlButtons.vue';
import ContructorCard from './ContructorCard.vue';

const props = defineProps({
    planExercises: Array<PlanExercise>,
    isExpanded: Boolean
});

const emit = defineEmits<{
    (event: 'openAutoDialog'): void,
    (event: 'reset'): void,
    (event: 'save'): void,
    (event: 'removeEx', payload: number): void,
    (event: 'toggle'): void,
}>();

</script>