<script setup lang="ts">
import userDataStorage from '~/storage/userData';
import type { Achievement, UserAchievements } from '~/types/achievements/AchievementTypes';
import Empty from '../states/Empty.vue';

const achievements = ref<Array<Achievement> | null>([])

const loadAchievements = async () => {
    const statistics = await userDataStorage.getItem('statistics') as UserAchievements | null;
    if (statistics) {
        achievements.value = statistics.achievements;
    }
}

onMounted(loadAchievements)
</script>

<template>
    <div v-if="achievements && achievements.length > 0" class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="achievement in achievements" :key="achievement.id"
            class="flex items-center space-x-4 shadow p-4 rounded-lg">
            <div :class="achievement.icon">
                <img src="/assets/achievment.png" alt="Изображение ачивки" class="w-20 h-20" />
            </div>
            <div>
                <h3 class="font-semibold">{{ achievement.name }}</h3>
                <p class="text-sm autocolor">{{ achievement.description }}</p>
            </div>
        </div>
    </div>
    <Empty v-else />
</template>

<style scoped>
.autocolor {
    color: var(--p-text-muted-color);
}
</style>