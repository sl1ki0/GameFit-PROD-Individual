<template>
    <nav>
        <div class="card">
            <Menubar :model="items">
                <template #item="{ item, props, hasSubmenu }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span>{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                    </a>
                </template>
                <template #end>
                    <div class="flex items-center gap-4">
                        <Avatar v-if="url" style="cursor: pointer;" @click="navigateTo('/profile')"
                            :image="url" shape="circle" />
                    </div>
                </template>
            </Menubar>
        </div>
    </nav>
    <slot />
</template>

<script setup>
import userDataStorage from '~/storage/userData';

const url = ref('');
const points = ref(0)

const items = ref([
    {
        label: 'Тренировки',
        icon: 'pi pi-wave-pulse',
        command: () => {
            return navigateTo('/training/list')
        }
    },
    {
        label: 'Каталог упражнений',
        icon: 'pi pi-book',
        command: () => {
            return navigateTo('/exercise/list')
        }
    },
    {
        label: 'Профиль',
        icon: 'pi pi-user',
        command: () => {
            return navigateTo('/profile')
        }
    },
]);

onMounted(async () => {
    try {
        url.value = await userDataStorage.getItem('photo');
    } catch (error) {
        console.error(String(error))
    }
})
</script>
