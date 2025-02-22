<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { DIFFICULTIES, METRICS, MUSCLEGROUPS, SPORT_EQUIPMENT } from '~/constants/exerciseConstants';
import formSchema from '~/formSchemas/addExerciseSchema';
import type ExerciseFromSubmitArgs from '~/types/trainings/ExerciseFormSubmitArgs';
import exerciseDataStorage from '~/storage/exerciseData';
import type Exercise from '~/types/trainings/ExerciseType';
import { useToast } from '#imports';
import Loading from '~/components/states/Loading.vue';
import { transformLinksToArray } from '#imports';
import { getExerciseByKey } from '#imports';

const toast = useToast();
const route = useRoute();

const initialValues = ref<any>({
    id: '',
    name: '',
    difficulty: '',
    muscleGroup: '',
    items: [],
    instruction: '',
    media: [],
    metric: ''
});

const formKey = ref(0);
let used: string[] | null = null


function transformExerciseData(ex: any) {
    return {
        ...ex,
        difficulty: DIFFICULTIES.find(d => d.value === ex.difficulty),
        muscleGroup: MUSCLEGROUPS.find(m => m.value === ex.muscleGroup),
        items: ex.items.map((itemValue: string) =>
            SPORT_EQUIPMENT.find(item => item.value === itemValue)
        ),
        media: ex.media.join(','),
        metric: METRICS.find(m => m.value === ex.metric),
    };
}

function handleError(err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    toast.add({
        severity: 'error',
        summary: 'Произошла ошибка',
        detail: errorMessage,
        life: 3500,
    });
}

async function initializeForm() {
    if (!route.params.id) return;

    const ex = await getExerciseByKey(route.params.id as string);

    if (ex) {
        used = ex.usedIn;
        initialValues.value = transformExerciseData(ex);
        formKey.value++;
    }
}


function prepareFinalData(data: ExerciseFromSubmitArgs): Exercise {
    const transformedLinks = transformLinksToArray(data.values.media);

    return {
        id: route.params.id as string,
        name: data.values.name,
        difficulty: data.values.difficulty,
        muscleGroup: data.values.muscleGroup,
        items: data.values.items,
        instruction: data.values.instruction,
        media: transformedLinks,
        usedIn: used || [],
        metric: data.values.metric,
    };
}


const handleSubmit = async (data: ExerciseFromSubmitArgs) => {
    if (!data.valid) return;

    isLoading.value = true;

    const finalData = prepareFinalData(data);

    try {
        await exerciseDataStorage.setItem(finalData.id, finalData);
        navigateTo('/exercise/list');
    } catch (err: unknown) {
        handleError(err);
    } finally {
        isLoading.value = false;
    }
};

onMounted(initializeForm);

const resolver = zodResolver(formSchema);
const isLoading = ref<boolean>(false);
</script>
<template>
    <div class="flex justify-center items-center w-full min-h-[calc(100vh-58px)]">
        <Card class="w-full min-h-[calc(100vh-58px)]" style="border: 1px solid #10b981">
            <template #title>
                <h2 class="text-center">Редактировать упражнение</h2>
            </template>
            <template #content>
                <Form :key="formKey" v-slot="$form" :initialValues="initialValues" :resolver="resolver"
                    @submit="handleSubmit" class="flex flex-col items-center gap-4 w-full h-full">

                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="name" class="mb-2 font-semibold text-lg">Укажите название</label>
                        <InputText :maxlength="35" id="name" name="name" type="text" placeholder="Название"
                            class="w-full" />
                        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.name?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <p class="mb-2 font-semibold text-lg">Выберите сложность</p>
                        <Select id="difficulty" name="difficulty" :options="DIFFICULTIES" optionLabel="name"
                            placeholder="Сложность" class="w-full" />
                        <Message v-if="$form.difficulty?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.difficulty?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <p class="mb-2 font-semibold text-lg">Выберите группу мышц</p>
                        <Select id="muscleGroup" name="muscleGroup" :options="MUSCLEGROUPS" optionLabel="name"
                            placeholder="Часть тела" class="w-full" />
                        <Message v-if="$form.muscleGroup?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.muscleGroup?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <p class="mb-2 font-semibold text-lg">Выберите инвентарь</p>
                        <MultiSelect id="items" name="items" :options="SPORT_EQUIPMENT" display="chip"
                            optionLabel="name" filter placeholder="Инвентарь" :maxSelectedLabels="5" :show-clear="true"
                            class="w-full" />
                        <Message v-if="$form.items?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.items?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <p class="mb-2 font-semibold text-lg">Выберите единицу измерения</p>
                        <Select id="metric" name="metric" :options="METRICS" optionLabel="name"
                            placeholder="Единица измерения" class="w-full" />
                        <Message v-if="$form.metrics?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.metrics?.error?.message }}
                        </Message>
                    </div>


                    <div class="flex flex-col gap-1 w-2/3">
                        <p class="mb-2 font-semibold text-lg">Введите описание
                            (инструкцию)</p>
                        <Editor v-model:model-value="initialValues.instruction" id="instruction" name="instruction"
                            editorStyle="height: 320px">
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
                        <label for="media" class="mb-2 font-semibold text-lg">Перечислите ссылки на фото через запятую</label>
                        <InputText id="media" name="media" type="text" placeholder="Перечислите через запятую"
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
