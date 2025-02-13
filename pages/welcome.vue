<template>
    <div
        class="min-h-screen bg-gradient-to-br from-black to-green-900 flex flex-col items-center justify-center text-white relative overflow-hidden">

        <Hexagon size="sm" speed="slow" />
        <Hexagon size="[90vw]" height="[90vh]" speed="slow" />
        <Hexagon size="1/2" speed="fast" dash-pattern="10"/>

        <img src="/assets/dumbell.png" alt="Изображение гантели на фоне"
            class="absolute top-0 left-0 w-1/5 dumbellRotated25 z-10 fade-in" />

        <img src="/assets/dumbell.png" alt="Изображение гантели на фоне"
            class="absolute top-[35vh] right-[10vw] w-1/5 dumbellRotated45 z-10 fade-in" />

        <img src="/assets/dumbell.png" alt="Изображение гантели на фоне"
            class="absolute bottom-[15vh] left-[20vw] w-1/5 dumbellRotated45 z-10 fade-in" />

        <div class="absolute inset-0 bg-cover bg-center z-0 opacity-10"
            style="background-image: url('/placeholder.svg?height=1080&width=1920')"></div>
        <div class="z-10 fade-in">
            <article class="text-center mb-12">
                <h1 class="text-4xl md:text-6xl font-bold mb-4">Nuxt Fitness</h1>
                <p class="text-xl md:text-2xl text-gray-300">Your Ultimate Fitness Companion</p>
            </article>
            <div class="text-center">
                <Button @click="handleClick()" label="Get Started" class="p-button-rounded p-button-lg custom-button"
                    aria-label="Get started with FitTrack Pro" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Hexagon from './components/geometry/Hexagon.vue';

const handleClick = () => {
    console.log('clicked')
}
</script>

<style>
.fade-in {
    animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.custom-button {
    background: linear-gradient(135deg, #4CAF50, #2196F3) !important;
    border: none !important;
    font-size: 1.25rem !important;
    padding: 1rem 2rem !important;
    transition: all 0.3s ease !important;
}

.custom-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
}
.dumbellRotated25 {
    transition: all 1s;
    rotate: 25deg;
}

.dumbellRotated25:hover {
    transform: translateX(30px) translateY(30px);
}

.dumbellRotated45 {
    transition: all 1s;
    rotate: -45deg;
}

.dumbellRotated45:hover {
    transform: translateX(30px) translateY(30px);
}
</style>