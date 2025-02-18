<template>
    <div class="flex flex-col md:flex-row h-screen">
      <!-- Каталог упражнений -->
      <aside class="w-full md:w-1/3 p-4  overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">Каталог упражнений</h2>
  
        <!-- Поиск -->
        <div class="mb-4">
          <InputText
            v-model="searchQuery"
            placeholder="Поиск упражнений"
            class="w-full"
          />
        </div>
  
        <!-- Фильтр по части тела -->
        <div class="mb-4">
          <Dropdown
            v-model="selectedBodyPart"
            :options="MUSCLEGROUPS"
            optionLabel="name"
            optionValue="value"
            placeholder="Фильтр по части тела"
            class="w-full"
          />
        </div>
  
        <!-- Список упражнений -->
        <div class="space-y-3">
          <Card
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            class="hover:shadow-lg transition-shadow"
          >
            <template #title>
              <span class="font-bold text-lg">{{ exercise.name }}</span>
            </template>
            <template #content>
            <Accordion>
            <AccordionPanel value="0">
                <AccordionHeader>Инструкция</AccordionHeader>
                <AccordionContent>
                       <div class="m-0" v-html="exercise.instruction"></div>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
                <AccordionHeader>Экипировка</AccordionHeader>
                <AccordionContent>
                       <div class="m-0" v-html="exercise.items"></div>
                </AccordionContent>
            </AccordionPanel>
            </Accordion>
            <div class="mt-3 flex justify-between items-center">
              <span class="text-sm">{{ exercise.metric }}</span>
              <Button
                icon="pi pi-plus"
                class="p-button-outlined p-button-sm"
                @click="addExerciseToPlan(exercise)"
              />
            </div>                
            </template>
          </Card>
        </div>
      </aside>

      <Divider layout="vertical"><b class="pi pi-arrow-right"></b></Divider>
  
      <!-- Конструктор тренировки -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="flex flex-col md:flex-row items-center justify-between mb-6">
          <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            Конструктор тренировки
          </h2>
          <div class="flex flex-wrap gap-3">
            <Button
              label="Автозаполнить"
              icon="pi pi-filter"
              class="p-button-rounded"
              @click="openAutoSelectDialog"
            />
            <Button
              label="Сбросить план"
              icon="pi pi-refresh"
              class="p-button-warning p-button-rounded"
              @click="resetPlan"
            />
            <Button
              label="Сохранить"
              icon="pi pi-check"
              class="p-button-success p-button-rounded"
              @click="savePlan"
            />
          </div>
        </div>
  
        <div v-if="planExercises.length === 0" class="text-center text-gray-500">
          Вы не добавили упражнения.
        </div>
  
        <div v-else class="space-y-4">
          <Card
            v-for="(exercise, index) in planExercises"
            :key="index"
            class="p-4 shadow-md hover:shadow-lg transition-shadow"
          >
          <template #content>
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-xl">{{ exercise.exercise.name }}</h3>
              <Button
                icon="pi pi-times"
                class="p-button-text"
                severity="danger"
                @click="() => removeExerciseFromPlan(index)"
              />
            </div>
  
            <!-- Управление параметрами -->
            <div class="mt-3 flex flex-col gap-4 mb-2">
            <InputNumber class="w-1/6" v-model.number="exercise.count" />
              <Slider v-model="exercise.count" class="w-1/6" />
            </div>
            <span class="text-sm text-gray-500">
              {{ exercise.exercise.metric }}
            </span>
  
            <!-- Предупреждение о перегрузке -->
            <div
              v-if="isOverload(exercise)"
              class="mt-2 text-red-600 text-sm font-medium"
            >
              Предупреждение: слишком высокая нагрузка!
            </div>
          </template>
          </Card>
        </div>
      </main>
  
      <!-- Диалог автоподбора -->
      <Dialog
        header="Автоподбор упражнений"
        v-model:visible="autoSelectDialogVisible"
        :modal="true"
        :closable="true"
      >
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-1">Выберите часть тела</label>
            <Dropdown
              v-model="autoSelectedBodyPart"
              :options="MUSCLEGROUPS"
              optionLabel="name"
              optionValue="value"
              placeholder="Часть тела"
              class="w-full"
            />
          </div>
          <Button
            label="Подобрать упражнения"
            icon="pi pi-search"
            class="w-full"
            @click="applyAutoSelect"
          />
        </div>
      </Dialog>
    </div>
  </template>
  
  <script setup lang="ts">
import { MUSCLEGROUPS } from '~/constants/exerciseConstants';
import type Exercise from '~/types/trainings/ExerciseType';


  const { exercises } = useExercises();
  
  const planExercises = ref<any>([])

  const searchQuery = ref<string>('')
  const selectedBodyPart = ref<string | null>(null)
  
  const filteredExercises = computed(() =>
    exercises.value.filter((ex) => {
      const matchesQuery = ex.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesBodyPart = selectedBodyPart.value ? ex.muscleGroup === selectedBodyPart.value : true
      return matchesQuery && matchesBodyPart
    })
  )
  
  const addExerciseToPlan = (exercise: Exercise) => {
    planExercises.value.push({
        exercise,
        count: 0
    })
  }
  
  const removeExerciseFromPlan = (index: number) => {
    planExercises.value.splice(index, 1)
  }
  
  const resetPlan = () => {
    planExercises.value = []
  }
  
  const isOverload = (exercise: Exercise): boolean => {
    return true // Костылек для проверки верстки, нагуглю формулы и сделаю
  }
  
  // Автоподбор через диалог (нужно доделать)
  const autoSelectDialogVisible = ref<boolean>(false)
  const autoSelectedBodyPart = ref<string | null>(null)
  const autoSelectedType = ref<string | null>(null)
  
  const openAutoSelectDialog = () => {
    autoSelectDialogVisible.value = true
  }
  
  const applyAutoSelect = () => {
    return
  }
  
  const savePlan = () => {
    console.log('Сохранённый план:', planExercises.value);
  }
  </script>