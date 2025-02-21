<script setup lang="ts">
import { getUserPoints } from '~/utils/achievements/userPointsUtil';
import { SHOP_ITEMS } from '~/constants/shopItems';
import Genarate from '../ai/Genarate.vue';

const points = ref<number>(0)

onMounted(async () => {
    points.value = await getUserPoints();
});

const startGeneration = ref(false);
const textPrompt = ref('')

const handleBuy = (description: string) => {
    startGeneration.value = true;
    textPrompt.value = description
}
</script>

<template>
    <Genarate v-if="startGeneration" :prompt="`in ${textPrompt}`" :redirect-page="'/profile'" :reload="'true'"  />

    <div v-if="!startGeneration">
        <div class="mb-4">
        <Message severity="info" class="inline-block">
            <span class="font-bold">Ваши очки: {{ points }} 💎</span>
        </Message>
    </div>

    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
        <Card v-for="(item, index) in SHOP_ITEMS" :key="index" class="shop-card">
            <template #header>
                <div class="flex justify-center items-center bg-primary/10 p-6 rounded-t-lg">
                    <i :class="[item.icon, 'text-6xl text-primary']"></i>
                </div>
            </template>
            <template #title>
                <h3 class="mt-4 font-semibold text-lg text-center">{{ item.name }}</h3>
            </template>
            <template #content>
                <p class="mb-4 text-color-secondary text-sm text-center">{{ item.description }}</p>
                <div class="flex justify-center">
                    <Tag :value="`${item.price} 💎`" severity="info" class="text-lg" />
                </div>
            </template>
            <template #footer>
                <div class="flex justify-center mt-4">
                    <Button 
                        :label="points >= item.price ? 'Купить' : 'Недостаточно 💎'" 
                        :disabled="points < item.price"
                        severity="primary"
                        rounded
                        class="w-full"
                        @click="handleBuy(item.description)"
                    />
                </div>
            </template>
        </Card>
    </div>
    </div>
</template>

<style scoped>
.shop-card {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
}

.shop-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
</style>