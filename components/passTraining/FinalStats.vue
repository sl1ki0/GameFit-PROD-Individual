<template>
  <div class="relative">
    <div
      class="fixed inset-0 bg-black/70 animate-fade-in"
      style="z-index: 999;"
    />
    
    <div 
      v-if="showCounter" 
      class="z-[1001] fixed inset-0 flex justify-center items-center"
    >
      <div class="number-wrapper">
        <div class="number-slot">
          <div 
            class="number-scroll"
            :style="{ transform: `translateY(${-counterValue * 10}%)` }"
          >
            <div v-for="n in 11" :key="n-1" class="number-item">
              {{ n-1 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <Dialog 
      v-model:visible="showDialog"
      modal
      :closable="false"
      :pt="{
        root: { class: 'w-[90vw] max-w-[500px]' }
      }"
    >
      <template #header>
        <div class="w-full text-center">
          <h2 class="font-bold text-2xl">Тренировка завершена!</h2>
          <p class="opacity-75 mt-2 text-lg">
            Длительность: {{ formatTime(time) }}
          </p>
        </div>
      </template>

      <div class="py-4">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.metric"
          class="mb-6 animate-fade-in"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium">{{ stat.metric }}</span>
            <span class="font-bold text-primary text-2xl">{{ stat.count }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full h-full justify-between gap-4">
          <Button 
            label="Заново" 
            icon="pi pi-refresh"
            severity="secondary"
            @click="router.go(0)"
          />
          <Button 
            label="Завершить" 
            icon="pi pi-home"
            @click="router.push('/training/list')"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { formatTime } from '#imports';

const router = useRouter();

const props = defineProps<{
  stats: Array<{ metric: string, count: number }>,
  time: number
}>();

const showCounter = ref(true);
const showDialog = ref(false);
const counterValue = ref(0);
onMounted(() => {
  let current = 0;
  const interval = setInterval(() => {
    current += 1;
    counterValue.value = current;
    
    if (current >= 10) {
      clearInterval(interval);
      setTimeout(() => {
        showCounter.value = false;
        showDialog.value = true;
      }, 1000);
    }
  }, 700);
});
</script>

<style scoped>
.number-wrapper {
  font-size: 120px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.number-slot {
  height: 1.2em;
  overflow: hidden;
}

.number-scroll {
  transition: transform 0.7s ease-out;
}

.number-item {
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-progress {
  animation: progress 1s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes progress {
  from { width: 0; }
  to { width: 100%; }
}
</style>