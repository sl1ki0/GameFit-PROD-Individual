<template>
  <div class="flex flex-col justify-center items-center p-6">
    <!-- Вдохновлено, источник: https://codepen.io/kirtivernekar/pen/PoJOMbb -->
    <div class="relative w-[160px] h-[160px]">
      <svg class="progress-ring" width="160" height="160">
        <circle class="progress-ring__background" cx="80" cy="80" r="70" stroke-width="10" />
        <circle class="progress-ring__progress" cx="80" cy="80" r="70" stroke-width="10" stroke-linecap="round"
          :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset" />
      </svg>

      <div class="absolute inset-0 flex justify-center items-center font-semibold text-2xl animated-time" :class="{'pulse': isPulse}">
        {{ formattedTime }}
      </div>
    </div>

    <div v-if="isRest" class="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center px-4">
      <Button label="10" severity="secondary" icon="pi pi-minus"
        class="flex-1 py-3 px-6 text-lg md:py-4 md:px-8 md:text-xl" @click="minus10" />
      <Button label="10" severity="info" icon="pi pi-plus" class="flex-1 py-3 px-6 text-lg md:py-4 md:px-8 md:text-xl"
        @click="plus10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from '#imports';

const props = defineProps({
  duration: { type: Number, required: true },
  isRest: { type: Boolean }
})
const emit = defineEmits<{
  (event: 'complete'): void,
}>()

const remainingTime = ref(props.duration)
const progress = ref(0)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)
const totalDuration = ref(props.duration)

const radius = 70
const circumference = 2 * Math.PI * radius

const progressOffset = computed(() => {
  return circumference - (progress.value / totalDuration.value) * circumference
})

const formattedTime = computed((): string => {
  return formatTime(remainingTime.value);
})

const startTimer = () => {
  if (timerId.value) return
  timerId.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
      progress.value++
    } else {
      if (timerId.value) clearInterval(timerId.value)
      timerId.value = null
      emit('complete')
    }
  }, 1000)
}

const minus10 = () => {
  if (remainingTime.value >= 10 && totalDuration.value >= 10) {
    remainingTime.value -= 10
    totalDuration.value -= 10
  }
}

const plus10 = () => {
  remainingTime.value += 10
  totalDuration.value += 10
}

const isPulse = ref(false)

watch(progress, () => {
  isPulse.value = true
  setTimeout(() => {
    isPulse.value = false
  }, 500)
})

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  if (timerId.value) clearInterval(timerId.value)
})
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animated-time.pulse {
  animation: pulse 0.5s ease-in-out;
}

.progress-ring__background {
  fill: none;
}

.progress-ring__progress {
  fill: none;
  stroke: #34d399;
  transition: stroke-dashoffset 0.5s ease-out;
}
</style>
