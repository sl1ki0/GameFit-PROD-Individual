<template>
  <Toast position="top-left"></Toast>
  <div class="flex md:flex-row flex-col h-screen">

    <ExercisesCatalog @add-to-plan="addExerciseToPlan" />

    <div class="hidden md:block">
      <Divider layout="vertical"><b class="pi-arrow-right pi"></b></Divider>
    </div>


    <DesktopExerciseConstructor :plan-exercises="planExercises" @open-auto-dialog="openAutoSelectDialog"
      @reset="resetPlan" @save="savePlan" @remove-ex="removeExerciseFromPlan" />


    <MobileExerciseContructor :is-expanded="mobileWorkoutExpanded" :plan-exercises="planExercises"
      @open-auto-dialog="openAutoSelectDialog" @reset="resetPlan" @save="savePlan" @remove-ex="removeExerciseFromPlan"
      @toggle="toggleMobileWorkout" />


    <Dialog header="Автоподбор упражнений" v-model:visible="autoSelectDialogVisible" :modal="true" :closable="true">
      <Form v-slot="$form" :initialValues="autoFilterValues" :resolver="autoFilterResolver" @submit="applyAutoSelect"
        class="flex flex-col items-center gap-4 w-full h-full">
        <div class="space-y-4">
          <div>
            <label class="block mb-2">Выберите часть тела</label>
            <Dropdown id="autoMuscleGroup" name="autoMuscleGroup" v-model="autoFilterValues.autoMuscleGroup"
              :options="MUSCLEGROUPS" optionLabel="name" optionValue="value" placeholder="Часть тела" class="w-full" />
            <Message v-if="$form.autoMuscleGroup?.invalid" severity="error" size="small" variant="simple">
              {{ $form.autoMuscleGroup.error?.message }}
            </Message>
          </div>
          <div>
            <label class="block mb-2">Введите количество упражнений</label>
            <InputNumber id="autoAmount" name="autoAmount" v-model="autoFilterValues.autoAmount"
              inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1" :min="1"
              :max="exercises.length" fluid>
              <template #incrementbuttonicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
            <Message v-if="$form.autoAmount?.invalid" severity="error" size="small" variant="simple">
              {{ $form.autoAmount.error?.message }}
            </Message>
          </div>
          <Button label="Подобрать упражнения" icon="pi pi-search" class="w-full" type="submit" />
        </div>
      </Form>
    </Dialog>


    <Dialog class="w-full lg:w-1/4 h-full lg:h-1/2" header="Сохранить тренировку" v-model:visible="saveDialog"
      :modal="true" :closable="true">
      <Form v-slot="$form" :initialValues="saveDialogValues" :resolver="saveDialogResolver" @submit="onSaveDialogSubmit"
        class="flex flex-col items-center gap-4 lg:gap-8 w-full h-full">
        <div class="flex flex-col gap-1 w-2/3">
          <label for="name" class="mb-2 font-semibold text-lg">Укажите название</label>
          <InputText v-model="saveDialogValues.name" id="name" name="name" type="text" placeholder="Название"
            class="w-full" />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
            {{ $form.name?.error?.message }}
          </Message>
        </div>
        <div class="flex flex-col gap-1 w-2/3">
          <label for="description" class="mb-2 font-semibold text-lg">Укажите описание</label>
          <Textarea :max="45" v-model="saveDialogValues.description" id="description" name="description" rows="5"
            cols="30" style="resize: none" />
          <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
            {{ $form.description?.error?.message }}
          </Message>
        </div>
        <div class="lg:mt-2 w-2/3">
          <Button type="submit" severity="primary" label="Готово" class="w-full" />
        </div>
      </Form>
    </Dialog>
  </div>
  <Loading v-if="isLoading"></Loading>
</template>

<script setup lang="ts">
import { MUSCLEGROUPS } from '~/constants/exerciseConstants';
import type Exercise from '~/types/trainings/ExerciseType';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from '#imports';
import ExercisesCatalog from '~/components/contructor/ExercisesCatalog.vue';
import type PlanExercise from '~/types/trainings/PlanExercise';
import DesktopExerciseConstructor from '~/components/contructor/DesktopExerciseConstructor.vue';
import MobileExerciseContructor from '~/components/contructor/MobileExerciseContructor.vue';
import trainingDataStorage from '~/storage/trainingData';
import type Training from '~/types/trainings/TrainingType';
import { nanoid } from 'nanoid';
import { transformPlanExercises } from '#imports';
import Loading from '~/components/states/Loading.vue';
import { updateExercisesUsedIn } from '#imports';

const toast = useToast();



const { exercises } = useExercises();



const planExercises = ref<Array<PlanExercise>>([]);
const addExerciseToPlan = (exercise: Exercise) => {
  planExercises.value.push({
    exercise,
    count: 1
  });

  toast.add({
    severity: 'success',
    summary: 'Успешно!',
    detail: "Упражнение добавлено",
    life: 1000,
  })
};
const removeExerciseFromPlan = (index: number) => {
  planExercises.value.splice(index, 1);
};
const resetPlan = () => {
  planExercises.value = [];
};

const mobileWorkoutExpanded = ref(false);
const toggleMobileWorkout = () => {
  mobileWorkoutExpanded.value = !mobileWorkoutExpanded.value;
};


const autoSelectDialogVisible = ref<boolean>(false);
const autoFilterValues = ref({
  autoMuscleGroup: null,
  autoAmount: 1
});
const autoFilterSchema = z.object({
  autoMuscleGroup: z.preprocess(
    extractValue,
    z.enum(["Грудь", "Руки", "Спина", "Ноги", "Общее"], { message: "Выберите группу мышц" })
  ),
  autoAmount: z.number()
});
const autoFilterResolver = zodResolver(autoFilterSchema);
const openAutoSelectDialog = () => {
  autoSelectDialogVisible.value = true;
};
const applyAutoSelect = (data: { valid: boolean }) => {
  if (!data.valid) {
    return;
  }
  const filteredExercises = exercises.value.filter((exercise: Exercise) =>
    exercise.muscleGroup === autoFilterValues.value.autoMuscleGroup
  );
  for (let i = 0; i < filteredExercises.length; i++) {
    if (planExercises.value.length == autoFilterValues.value.autoAmount) break;
    const item = filteredExercises[i];
    planExercises.value.push({
      exercise: item,
      count: 1
    });
  }
  autoSelectDialogVisible.value = false;
};


const saveDialog = ref<boolean>(false);
const saveDialogValues = ref({
  name: '',
  description: ''
});

const saveDialogSchema = z.object({
  name: z.string().min(1, { message: "Введите название" }),
  description: z.string().min(1, { message: "Введите описание" }).max(45, { message: "Должно быть не более 45 символов" })
})

const saveDialogResolver = zodResolver(saveDialogSchema);

const savePlan = () => {
  if (planExercises.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Внимание!',
      detail: "Добавьте минимум 1 упражнение",
      life: 2000,
    })
    return
  };

  saveDialog.value = true
};

const isLoading = ref<boolean>(false)

const onSaveDialogSubmit = async (data: { valid: boolean }) => {
  if (!data.valid) {
    return;
  }

  isLoading.value = true;

  const { transformedArray, mostCommonMuscleGroup, mostCommonDifficulty, uniqueItems } = transformPlanExercises(planExercises.value);

  const finalTraining: Training = {
    id: nanoid(),
    name: saveDialogValues.value.name,
    description: saveDialogValues.value.description,
    muscleGroup: mostCommonMuscleGroup,
    difficulty: mostCommonDifficulty,
    exercises: transformedArray,
    equipment: uniqueItems
  };

  let success = false;

  try {
    await trainingDataStorage.setItem<Training>(finalTraining.id, finalTraining);
    await updateExercisesUsedIn(planExercises.value, finalTraining.id);
    success = true; 
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    toast.add({
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: errorMessage,
      life: 3500,
    });

    await trainingDataStorage.removeItem(finalTraining.id);
  } finally {
    saveDialog.value = false;
    isLoading.value = false;

    if (success) {
      navigateTo('/training/list');
    }
  }
};

</script>


<style scoped>
.autoBg {
  background-color: var(--p-content-background);
}
</style>