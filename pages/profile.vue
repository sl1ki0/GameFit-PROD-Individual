<script setup lang="ts">
import { useToast } from '#imports';
import userDataStorage from '~/storage/userData';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import setUserHealhData from '~/utils/setUserHealthData';
import Achievments from '~/components/profile/Achievments.vue';
import Shop from '~/components/profile/Shop.vue';

const toast = useToast();

const initialValues = ref<any>({
    username: '',
    gender: '',
    age: null,
    weight: null,
    height: null,
    sportActivity: null
});

const formKey = ref(0);
const isLoading = ref<boolean>(false);

function transformProfileData(profile: any) {
    return {
        username: profile.username,
        gender: profile.gender === 'Male' ? 'Male' : 'Female',
        age: profile.age,
        weight: profile.weight,
        height: profile.height,
        sportActivity: String(profile.sportActivity)
    };
};

const imageUrl = ref<string | null>('')

async function initializeForm() {
    isLoading.value = true;
    try {
        const profile = await userDataStorage.getItem('user');
        imageUrl.value = await userDataStorage.getItem('photo');
        if (profile) {
            initialValues.value = transformProfileData(profile);
            formKey.value++;
        }
    } catch (err) {
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

onMounted(initializeForm);


const userInputsSchema = z.object({
    username: z.string().min(1, { message: 'Обязательно заполните имя' }),
    gender: z.string().min(1, { message: 'Обязательно выберите пол' }),
    age: z.number().min(5, { message: "Вы должны быть хотя-бы старше 5" }).max(180, { message: 'Введите настоящий возраст' }),
    weight: z.coerce.number().min(1, { message: 'Обязательно заполните вес' }),
    height: z.coerce.number().min(1, { message: 'Обязательно заполните рост' }),
    sportActivity: z.coerce.number().min(1, { message: 'Обязательно' }),
})

const resolver = zodResolver(userInputsSchema)

const handleSubmit = async (data: any) => {
    if (!data.valid) {
        return
    };

    try {
        await userDataStorage.setItem('user', {
            username: data.values.username,
            gender: data.values.gender,
            age: data.values.age,
            weight: data.values.weight,
            height: data.values.height,
            sportActivity: data.values.sportActivity,
        });
        await setUserHealhData(data.values.weight, data.values.height)

        toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Данные профиля обновлены',
            life: 2000,
        });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        toast.add({
            severity: 'error',
            summary: 'Произошла ошибка',
            detail: errorMessage,
            life: 3500,
        });
    } finally {
        initializeForm();
    }
}
</script>


<template>
    <Toast :success-icon="'pi pi-user'"></Toast>
    <div class="p-4 md:p-6 lg:p-8">
        <h1 class="mb-6 font-bold text-3xl">Личный профиль</h1>

        <TabView class="profile-tabs">
            <TabPanel header="Профиль" :value="'profile'">
                <div class="gap-6 grid grid-cols-1 md:grid-cols-2">

                    <div class="flex flex-col items-center shadow p-4 rounded-lg">
                        <div class="relative mb-4">
                            <img v-if="imageUrl" :src="imageUrl" class="rounded-full w-[512px] h-[512px] object-cover"
                                alt="Фото профиля" />
                        </div>
                        <h2 class="mb-2 font-semibold text-xl">{{ initialValues.username }}</h2>
                    </div>


                    <div class="shadow p-6 rounded-lg">
                        <Form :key="formKey" v-slot="$form" :initialValues="initialValues" :resolver="resolver"
                            @submit="handleSubmit" class="flex flex-col items-center gap-4 w-full h-full">
                            <div class="flex flex-col gap-1 w-full">
                                <label for="username" class="font-semibold text-lg">Укажите имя</label>
                                <InputText id="username" name="username" type="text" placeholder="Имя" fluid />
                                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.username.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-1 w-full">
                                <label for="age" class="font-semibold text-lg">Укажите ваш возраст</label>
                                <InputNumber id="age" name="age" placeholder="Возраст" fluid />
                                <Message v-if="$form.age?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.age.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-1 w-full">
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
                            <div class="flex flex-col gap-1 w-full">
                                <label for="weight" class="font-semibold text-lg">Укажите ваш вес</label>
                                <InputNumber id="weight" name="weight" suffix=" кг" :min="1" placeholder="Вес (кг)"
                                    fluid />
                                <Message v-if="$form.weight?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.weight.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-1 w-full">
                                <label for="height" class="font-semibold text-lg">Укажите ваш рост</label>
                                <InputNumber id="height" name="height" suffix=" см" :min="1" :max="300"
                                    placeholder="Рост (см)" fluid />
                                <Message v-if="$form.height?.invalid" severity="error" size="small" variant="simple">
                                    {{ $form.height.error?.message }}
                                </Message>
                            </div>

                            <div class="flex flex-col gap-2 w-full">
                                <p class="font-semibold text-lg">Оцените уровень своей спорт. подготовки</p>
                                <RadioButtonGroup id="sportActivity" name="sportActivity"
                                    class="flex flex-col flex-wrap gap-4">
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="beginner" value="1" />
                                        <label for="beginner">Начальный</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="medium" value="2" />
                                        <label for="medium">Средний</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <RadioButton inputId="advanced" value="3" />
                                        <label for="advanced">Продвинутый</label>
                                    </div>
                                </RadioButtonGroup>
                                <Message v-if="$form.sportActivity?.invalid" severity="error" size="small"
                                    variant="simple">
                                    {{ $form.sportActivity.error?.message }}
                                </Message>
                            </div>

                            <div class="flex justify-between">
                                <Button type="submit" severity="primary" label="Сохранить" icon="pi pi-check" />
                            </div>
                        </Form>
                    </div>
                </div>
            </TabPanel>

            <TabPanel header="Достижения" :value="'achievements'">
                <Achievments></Achievments>
            </TabPanel>

            <TabPanel header="Магазин" :value="'shop'">
                <Shop></Shop>
            </TabPanel>
        </TabView>
    </div>
</template>