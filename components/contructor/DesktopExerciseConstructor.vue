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

        <div v-else class="space-y-4">
            <Card v-for="(exercise, index) in planExercises" :key="index"
                class="shadow-md hover:shadow-lg p-4 transition-shadow">
                <template #content>
                    <div class="flex justify-between items-center">
                        <h3 class="font-bold text-xl">{{ exercise.exercise.name }}</h3>
                        <Button icon="pi pi-times" class="p-button-text" severity="danger"
                            @click="$emit('removeEx', index)" />
                    </div>


                    <div class="flex flex-col gap-4 mt-3 mb-2">
                        <InputNumber :min="1" class="w-1/6" v-model.number="exercise.count" />
                        <Slider :min="1" v-model="exercise.count" class="w-1/6" />
                    </div>
                    <span class="text-sm">
                        {{ exercise.exercise.metric }}
                    </span>


                    <div v-if="false" class="mt-2 font-medium text-red-600 text-sm">
                        Предупреждение: слишком высокая нагрузка!
                    </div>
                </template>
            </Card>
        </div>
    </main>
</template>

<script setup lang="ts">
import type PlanExercise from '~/types/trainings/PlanExercise';
import PlanControlButtons from './PlanControlButtons.vue';

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