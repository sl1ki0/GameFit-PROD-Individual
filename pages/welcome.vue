<template>
    <div
        class="relative flex flex-col justify-center items-center bg-gradient-to-br from-black to-green-900 min-h-screen overflow-hidden text-white">

        <Hexagon size="sm" speed="slow" />
        <Hexagon size="[90vw]" height="[90vh]" speed="slow" />
        <Hexagon size="1/2" speed="fast" dash-pattern="10"/>

        <img src="/assets/dumbell.png" alt="Изображение гантели на фоне"
            class="top-0 left-0 z-10 absolute w-1/5 dumbellRotated25 fade-in" />

        <img src="/assets/dumbell.png" alt="Изображение гантели на фоне"
            class="top-[35vh] right-[10vw] z-10 absolute w-1/5 dumbellRotated45 fade-in" />

        <img src="/assets/dumbell.png" alt="Изображение гантели на фоне"
            class="bottom-[15vh] left-[20vw] z-10 absolute w-1/5 dumbellRotated45 fade-in" />

        <div class="z-0 absolute inset-0 bg-cover bg-center opacity-10"
            style="background-image: url('/placeholder.svg?height=1080&width=1920')"></div>
        <div class="z-10 fade-in">
            <article class="mb-12 text-center">
                <h1 class="mb-4 font-bold text-4xl md:text-6xl">Nuxt Fitness</h1>
                <p class="text-gray-300 text-xl md:text-2xl">Your Ultimate Fitness Companion</p>
            </article>
            <div class="text-center">
                <Button @click="handleClick()" label="Get Started" class="custom-button p-button-lg p-button-rounded"
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