<template>
  <div class="flex flex-col items-center gap-4">
    <div class="mb-2 text-gray-600 text-xl">Rest Time</div>
    <div class="relative flex flex-col justify-center items-center bg-white/80 shadow-lg backdrop-blur-sm p-6 rounded-lg">
      <svg class="progress-ring" width="160" height="160">
        <circle class="progress-ring__background" cx="80" cy="80" r="70" stroke-width="10" />
        <circle 
          class="progress-ring__progress" 
          cx="80" 
          cy="80" 
          r="70" 
          stroke-width="10" 
          stroke-linecap="round" 
          :stroke-dasharray="circumference" 
          :stroke-dashoffset="progressOffset"
        />
      </svg>
      <div class="absolute font-semibold text-2xl animated-time">
        {{ formattedTime }}
      </div>
    </div>
    
    <div class="flex items-center gap-4 mt-2">
      <Button 
        icon="pi pi-minus" 
        @click="adjustTime(-5)"
        class="p-button-text p-button-rounded" 
        :disabled="remainingTime <= 5"
      />
      <Button 
        label="Skip" 
        @click="skipRest"
        class="p-button-secondary" 
      />
      <Button 
        icon="pi pi-plus" 
        @click="adjustTime(5)"
        class="p-button-text p-button-rounded" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  initialDuration: { 
    type: Number, 
    default: 10 
  }
})

const emit = defineEmits<{
  (event: 'complete'): void,
  (event: 'update:duration', value: number): void
}>();

const remainingTime = ref(props.initialDuration)
const progress = ref(0)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)
const radius = 70
const circumference = 2 * Math.PI * radius

const progressOffset = computed(() => {
  const totalProgress = progress.value / props.initialDuration
  return circumference - totalProgress * circumference
})

const formattedTime = computed(() => {
  const timeInSeconds = Math.max(0, Math.floor(remainingTime.value))
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0')
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
})

const startTimer = () => {
  if (timerId.value) return
  progress.value = 0
  timerId.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
      progress.value++
    } else {
      stopTimer()
      emit('complete')
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerId.value) {
    clearInterval(timerId.value)
    timerId.value = null
  }
}

const adjustTime = (seconds: number) => {
  const newTime = remainingTime.value + seconds
  if (newTime >= 5) {
    remainingTime.value = newTime
    emit('update:duration', newTime)
  }
}

const skipRest = () => {
  stopTimer()
  emit('complete')
}

watch(progress, () => {
  const element = document.querySelector('.animated-time')
  if (!element) return
  
  element.classList.add('pulse')
  setTimeout(() => {
    element.classList.remove('pulse')
  }, 500)
})

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<style scoped>
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.animated-time.pulse {
  animation: pulse 0.5s ease-in-out;
}

.progress-ring__background {
  fill: none;
  stroke: #e0e0e0;
}

.progress-ring__progress {
  fill: none;
  stroke: #64748b; /* Different color for rest timer */
  transition: stroke-dashoffset 0.5s ease-out;
}

/* Add a subtle glow effect */
.progress-ring__progress {
  filter: drop-shadow(0 0 2px rgba(100, 116, 139, 0.5));
}
</style> 