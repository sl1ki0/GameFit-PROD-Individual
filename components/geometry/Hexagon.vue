<script setup lang="ts">
const props = defineProps({
    size: {
        type: String,
        default: 'sm'
    },
    speed: {
        type: String,
        default: 'animate-spin-slow'
    },
    dashPattern: {
        type: String,
        default: '0'
    },
    height: {
        type: String,
        default: null
    }
})

const center = 200;
const radius = 180;
const angles = [0, 60, 120, 180, 240, 300];

// Метод постройки шестиугольника взят с ChatGPT
const hexagonPoints = angles
    .map(angle => {
        const rad = (angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
</script>

<template>
    <svg  :class="[`animate-spin-${speed}`, `w-${size}`, `h-${height ? height : size}`]" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon :points="hexagonPoints" stroke="#4F46E5" stroke-width="4" :stroke-dasharray="dashPattern" fill="none" />
    </svg>
</template>

<style>
.animate-spin-slow {
    animation: spinSlow 120s linear infinite;
    position: absolute;
    z-index: 0;
}

@keyframes spinSlow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-fast {
    animation: spinFast 60s linear infinite;
    position: absolute;
    z-index: 0;
}

@keyframes spinFast {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

</style>