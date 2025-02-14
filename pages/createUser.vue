<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import type FirstFormSubmitArgs from '~/types/createUser/firstFormSubmitArgs';
import type SecondFormSubmitArgs from '~/types/createUser/SecondFormSubmitArgs';
import userDataStorage from '~/storage/userData';
import type { FirstFormValues, SecondFormValues, UserData } from '~/types/createUser/UserDataTypes';
import { useToast } from 'primevue/usetoast';


const firstFormValues = ref<FirstFormValues>({
    username: '',
    gender: ''
});

const firstStepSchema = z.object({
    username: z.string().min(1, { message: 'Обязательно заполните имя' }),
    gender: z.string().min(1, { message: 'Обязательно выберите пол' }),
});

const firstStepResolver = ref(zodResolver(firstStepSchema));


const secondFormValues = ref<SecondFormValues>({
    weight: null,
    height: null,
    sportActivity: null
});


const secondStepSchema = z.object({
    weight: z.coerce.number().min(1, { message: 'Обязательно заполните вес' }),
    height: z.coerce.number().min(1, { message: 'Обязательно заполните рост' }),
    sportActivity: z.coerce.number().min(1, { message: 'Обязательно' }),
});

const secondStepResolver = ref(zodResolver(secondStepSchema));

const nextStep = (data: FirstFormSubmitArgs, activateCallback: (step: string) => void): void => {
    if (data.valid) {
        firstFormValues.value = data.values
        activateCallback('2');
    }
};

const toast = useToast();

const finishForm = async (data: SecondFormSubmitArgs): Promise<void> => {
  if (!data.valid) return;

  secondFormValues.value = data.values;

  try {
    await userDataStorage.setItem('user', {
      username: firstFormValues.value.username,
      gender: firstFormValues.value.gender,
      weight: secondFormValues.value.weight,
      height: secondFormValues.value.height,
      sportActivity: secondFormValues.value.sportActivity,
    });

    localStorage.setItem('isVisited', 'true');
    navigateTo('/dashboard');
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    toast.add({
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: errorMessage,
      life: 3500,
    });
  }
};

</script>

<template>
    <Toast />
    <div class="card flex justify-center">
        <Stepper value="1" linear class="basis-[50rem]">
            <StepList>
                <Step value="1">Основное</Step>
                <Step value="2">Параметры</Step>
            </StepList>
            <StepPanels>
                <!-- Шаг 1 -->
                <StepPanel v-slot="{ activateCallback }" value="1" class="flex flex-col justify-center items-center">
                    <div class="flex flex-col h-48">
                        <Form v-slot="$form" :initialValues="firstFormValues" :resolver="firstStepResolver"
                            @submit="(data: FirstFormSubmitArgs) => nextStep(data, activateCallback)"
                            class="flex flex-col gap-8 w-full sm:w-56">
                            <div class="flex flex-col gap-1">
                                <label for="username" class="font-semibold text-lg">Укажите имя</label>
                                <InputText id="username" name="username" type="text" placeholder="Имя" fluid />
                                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.username.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-2">
                                <p class="font-semibold text-lg">Укажите пол</p>
                                <RadioButtonGroup id="gender" name="gender" class="flex flex-wrap gap-4">
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="male" value="Male" />
                                        <label for="male">Мужчина</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="female" value="Female" />
                                        <label for="female">Женщина</label>
                                    </div>
                                </RadioButtonGroup>
                                <Message v-if="$form.gender?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.gender.error?.message }}
                                </Message>
                            </div>

                            <Button type="submit" severity="secondary" label="Далее" icon="pi pi-arrow-right" />
                        </Form>
                    </div>
                </StepPanel>

                <!-- Шаг 2 -->
                <StepPanel v-slot="{ activateCallback }" value="2" class="flex flex-col justify-center items-center">
                    <div class="flex flex-col h-48">
                        <Form v-slot="$form" :initialValues="secondFormValues" :resolver="secondStepResolver"
                            @submit="(data: SecondFormSubmitArgs) => finishForm(data)"
                            class="flex flex-col gap-8 w-full sm:w-full">
                            <div class="flex flex-col gap-1">
                                <label for="weight" class="font-semibold text-lg">Укажите ваш вес</label>
                                <InputNumber id="weight" name="weight" suffix=" кг" :min="1" placeholder="Вес (кг)"
                                    fluid />
                                <Message v-if="$form.weight?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.weight.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-1">
                                <label for="height" class="font-semibold text-lg">Укажите ваш рост</label>
                                <InputNumber id="height" name="height" suffix=" см" :min="1" :max="300"
                                    placeholder="Рост (см)" fluid />
                                <Message v-if="$form.height?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.height.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-2">
                                <p class="font-semibold text-lg">Как часто вы занимаетесь спортом?</p>
                                <RadioButtonGroup id="sportActivity" name="sportActivity"
                                    class="flex flex-col flex-wrap gap-4">
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="1timeaweeek" value="1" />
                                        <label for="1timeaweeek">Менее 1 раза в неделю</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="2timeaweeek" value="2" />
                                        <label for="2timeaweeek">1-2 раза в неделю</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="3timeaweek" value="3" />
                                        <label for="3timeaweek">3 и более раз в неделю</label>
                                    </div>
                                </RadioButtonGroup>
                                <Message v-if="$form.sportActivity?.invalid" severity="error" size="small"
                                    variant="simple">
                                    {{ $form.sportActivity.error?.message }}
                                </Message>
                            </div>

                            <div class="flex justify-between">
                                <Button type="button" severity="secondary" label="Назад" icon="pi pi-arrow-left"
                                    @click="activateCallback('1')" />
                                <Button type="submit" severity="primary" label="Готово" icon="pi pi-check" />
                            </div>
                        </Form>
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>
    </div>
</template>

<style>
:root {
    --p-stepper-steppanel-background: none !important;
}
</style>
