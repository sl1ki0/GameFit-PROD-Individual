<template>
    <div class="relative flex flex-col justify-center items-center p-6">
      <svg class="progress-ring" width="160" height="160">
        <circle class="progress-ring__background" cx="80" cy="80" r="70" stroke-width="10" />
        <circle class="progress-ring__progress" cx="80" cy="80" r="70" stroke-width="10" stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset"/>
      </svg>
      <div class="absolute font-semibold text-2xl animated-time">
        {{ formattedTime }}
      </div>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps({ duration: { type: Number, required: true } }) 

const emit = defineEmits<{
    (event: 'complete'): void,
}>();
  
  const remainingTime = ref(props.duration)
  const progress = ref(0)
  const timerId = ref<ReturnType<typeof setInterval> | null>(null)
  const radius = 70
  const circumference = 2 * Math.PI * radius
  
  const progressOffset = computed(() => {
    return circumference - (progress.value / props.duration) * circumference
  })
  
  const formattedTime = computed(() => {
    const timeInSeconds = Math.max(0, Math.floor(remainingTime.value))
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0')
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
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
        console.log('Таймер завершен!')
      }
    }, 1000)
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
    if (timerId.value) clearInterval(timerId.value)
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
  }
  
  .progress-ring__progress {
    fill: none;
    stroke: #34d399;
    transition: stroke-dashoffset 0.5s ease-out;
  }
  </style>
  