<template>
  <div class="relative">
    <div
      class="fixed inset-0 bg-black/70 animate-fade-in"
      style="z-index: 100;"
    />

    
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
          <p class="opacity-75 mt-2 text-lg">
            Заработано очков: {{ totalRoundedSum }}
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
        <div class="flex justify-between gap-4 w-full h-full">
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
import confetti from 'canvas-confetti';
import userDataStorage from '~/storage/userData';
import { getUserPoints, updateUserPoints } from '~/utils/achievements/userPointsUtil';

const router = useRouter();

const props = defineProps<{
  stats: Array<{ metric: string, count: number }>,
  time: number
}>();

const showDialog = ref(false);

const totalRoundedSum = computed(() => {
  return Math.ceil(props.stats.reduce((sum, stat) => sum + stat.count, 0) * 0.5);
});

async function updatePoints() {
  try {
    const currentPoints = (await getUserPoints()) || 0;
    const newPoints = currentPoints + totalRoundedSum.value;
    await updateUserPoints(newPoints);
  } catch (error) {
    console.error('Ошибка при обновлении очков:', error);
  }
}

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    zIndex: 200
  });
}

onMounted(async () => {
  await updatePoints();
  setTimeout(() => {
    showDialog.value = true;
    launchConfetti();
  }, 400);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>