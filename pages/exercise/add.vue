<script setup lang="ts">
import type Exercise from '~/types/trainings/ExerciseType';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { DIFFICULTIES, MUSCLEGROUPS, SPORT_EQUIPMENT } from '~/constants/exerciseConstants';

const initialValues = ref({
    id: '',
    name: '',
    difficulty: "Легкий",
    muscleGroup: "Общее",
    items: null,
    instruction: '',
    media: null,
    usedIn: null
});

</script>
<template>
    <div class="w-full h-screen flex justify-center lg:mt-12">
        <Card class="w-full md:w-3/4 lg:w-[40vw] h-full lg:h-[85vh]" style="border: 1px solid #10b981">
            <template #title>
                <h2 class="text-center">Создать упражнение</h2>
            </template>
            <template #content>
                <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit"
                    class="flex flex-col items-center gap-4 w-full h-full mt-8">
                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="name" class="font-semibold text-lg mb-2">Укажите название</label>
                        <InputText id="name" name="name" type="text" placeholder="Название" class="w-full" />
                        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.name.error?.message }}
                        </Message>
                    </div>
                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="difficulty" class="font-semibold text-lg mb-2">Выберите сложность</label>
                        <Select id="difficulty" name="difficulty" :options="DIFFICULTIES" optionLabel="name" placeholder="Сложность"
                            class="w-full" />
                        <Message v-if="$form.difficulty?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.difficulty.error.message }}
                        </Message>
                    </div>
                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="muscleGroup" class="font-semibold text-lg mb-2">Выберите группу мышц</label>
                        <Select id="muscleGroup" name="muscleGroup" :options="MUSCLEGROUPS" optionLabel="name" placeholder="Часть тела"
                            class="w-full" />
                        <Message v-if="$form.muscleGroup?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.muscleGroup.error.message }}
                        </Message>
                    </div>
                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="items" class="font-semibold text-lg mb-2">Выберите инвентарь</label>
                        <MultiSelect id="items" name="items" :options="SPORT_EQUIPMENT" display="chip" optionLabel="name" filter
                            placeholder="Инвентарь" :maxSelectedLabels="5" :show-clear="true" class="w-full" />
                        <Message v-if="$form.items?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.items.error?.message }}
                        </Message>
                    </div>
                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="instruction" class="font-semibold text-lg mb-2">Введите описание (инструкцию)</label>
                        <Editor id="instruction" name="instruction" editorStyle="height: 320px">
                            <template v-slot:toolbar>
                                <span class="ql-formats">
                                    <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                                    <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                                    <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                                </span>
                            </template>
                        </Editor>
                    </div>
                    <div class="flex flex-col gap-1 w-2/3">
                        <label for="images" class="font-semibold text-lg mb-2">Перечислите ссылки на видео и фото</label>
                        <InputText id="images" name="images" type="text" placeholder="Перечислите через пробел" class="w-full" />
                        <Message v-if="$form.images?.invalid" severity="error" size="small" variant="simple">
                            {{ $form.images.error?.message }}
                        </Message>
                    </div>
                    <div class="w-2/3 lg:mt-2">
                        <Button type="submit" severity="secondary" label="Готово" class="w-full" />
                    </div>
                </Form>
            </template>
        </Card>
    </div>
</template>

<style></style>