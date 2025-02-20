<template>
    <div class="relative flex flex-col justify-center items-center p-6">
      <svg class="progress-ring" width="160" height="160">
        <circle class="progress-ring__background" cx="80" cy="80" r="70" stroke-width="10" />
        <circle class="progress-ring__progress" cx="80" cy="80" r="70" stroke-width="10" stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset"/>
      </svg>
      <div class="absolute font-semibold text-2xl animated-time">
        {{ formattedTime }}
      </div>

      <div v-if="isRest" class="flex justify-evenly w-full h-full">
        <Button label="10" severity="secondary" icon="pi pi-minus" class="w-full" @click="minus10" />
        <Button label="10" severity="info" icon="pi pi-plus" class="w-full" @click="plus10" />
      </div>
    </div>
</template>
  
<script setup lang="ts">
const props = defineProps({ duration: { type: Number, required: true }, isRest: {type: Boolean} }) 

const emit = defineEmits<{
    (event: 'complete'): void,
}>();
  
  const remainingTime = ref(props.duration)
  const progress = ref<number>(0)
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
        emit('complete')
      }
    }, 1000)
  };

  const minus10 =  () => {
    remainingTime.value = remainingTime.value - 10;
    progress.value = progress.value + 10;
  };

  const plus10 = () => {
    remainingTime.value = remainingTime.value + 10;
    if (progress.value >= 10) {
      progress.value = progress.value - 10;
    } else{
      progress.value = 0
    }
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
  