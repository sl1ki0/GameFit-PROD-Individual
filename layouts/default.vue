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
                    <div class="flex items-center gap-2">
                        <Avatar style="cursor: pointer;" @click="navigateTo('/profile')"
                            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    </div>
                </template>
            </Menubar>
        </div>
    </nav>
    <slot />
</template>

<script setup>
const items = ref([
    {
        label: 'Расписание',
        icon: 'pi pi-calendar',
        command: () => {
            return navigateTo('/')
        }
    },
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
    }
]);
</script>
