<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { DIFFICULTIES, METRICS, MUSCLEGROUPS, SPORT_EQUIPMENT } from '~/constants/exerciseConstants';
import formSchema from '~/formSchemas/addExerciseSchema';
import type ExerciseFromSubmitArgs from '~/types/trainings/ExerciseFormSubmitArgs';
import exerciseDataStorage from '~/storage/exerciseData';
import { nanoid } from 'nanoid';
import type Exercise from '~/types/trainings/ExerciseType';
import { useToast } from '#imports';
import Loading from '~/components/states/Loading.vue';

const toast = useToast();

const initialValues = ref({
    id: '',
    name: '',
    difficulty: '',
    muscleGroup: '',
    items: [],
    instruction: '',
    media: '',
    metric: ''
});

const resolver = zodResolver(formSchema);

const isLoading = ref<boolean>(false);

const handleSubmit = async (data: ExerciseFromSubmitArgs) => {
    if (!data.valid) return;

    isLoading.value = true
    const finalData: Exercise = {
        id: nanoid(),
        name: data.values.name,
        difficulty: data.values.difficulty,
        muscleGroup: data.values.muscleGroup,
        items: data.values.items,
        instruction: data.values.instruction,
        media: data.values.media,
        usedIn: [],
        metric: data.values.metric
    }
    try {
        await exerciseDataStorage.setItem(finalData.id, finalData);
        navigateTo('/exercise/list')
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        toast.add({
            severity: 'error',
            summary: 'Произошла ошибка',
            detail: errorMessage,
            life: 3500,
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="flex justify-center items-center w-full min-h-[calc(100vh-58px)]">
        <Card class="w-full min-h-[calc(100vh-58px)]" style="border: 1px solid #10b981">
            <template #title>
                <h2 class="text-center">Создать упражнение</h2>
            </template>
            <template #content>
                <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="handleSubmit"
                    class="flex flex-col items-center gap-4 w-full h-full">

                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="name" class="mb-2 font-semibold text-lg">Укажите название</label>
                        <InputText v-model="initialValues.name" id="name" name="name" type="text" placeholder="Название"
                            class="w-full" />
                        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.name?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="difficulty" class="mb-2 font-semibold text-lg">Выберите сложность</label>
                        <Select id="difficulty" name="difficulty" :options="DIFFICULTIES" optionLabel="name"
                            placeholder="Сложность" class="w-full" />
                        <Message v-if="$form.difficulty?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.difficulty?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="muscleGroup" class="mb-2 font-semibold text-lg">Выберите группу мышц</label>
                        <Select id="muscleGroup" name="muscleGroup" :options="MUSCLEGROUPS" optionLabel="name"
                            placeholder="Часть тела" class="w-full" />
                        <Message v-if="$form.muscleGroup?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.muscleGroup?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="items" class="mb-2 font-semibold text-lg">Выберите инвентарь</label>
                        <MultiSelect id="items" name="items" :options="SPORT_EQUIPMENT" display="chip"
                            optionLabel="name" filter placeholder="Инвентарь" :maxSelectedLabels="5" :show-clear="true"
                            class="w-full" />
                        <Message v-if="$form.items?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.items?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="metric" class="mb-2 font-semibold text-lg">Выберите единицу измерения</label>
                        <Select id="metric" name="metric" :options="METRICS" optionLabel="name"
                            placeholder="Единица измерения" class="w-full" />
                        <Message v-if="$form.metrics?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.metrics?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="instruction" class="mb-2 font-semibold text-lg">Введите описание
                            (инструкцию)</label>
                        <Editor id="instruction" name="instruction" editorStyle="height: 320px">
                            <template v-slot:toolbar>
                                <span class="ql-formats">
                                    <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                                    <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                                    <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                                </span>
                            </template>
                        </Editor>
                        <Message v-if="$form.instruction?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.instruction?.error?.message }}
                        </Message>
                    </div>

                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="media" class="mb-2 font-semibold text-lg">Перечислите ссылки на видео и фото</label>
                        <InputText id="media" name="media" type="text" placeholder="Перечислите через пробел"
                            class="w-full" />
                        <Message v-if="$form.media?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.media?.error?.message }}
                        </Message>
                    </div>

                    <div class="lg:mt-2 w-2/3">
                        <Button type="submit" severity="primary" label="Готово" class="w-full" />
                    </div>
                </Form>
            </template>
        </Card>
    </div>

    <Loading :is-loading="isLoading"></Loading>
</template>
