<template>
    <div class="flex flex-wrap gap-3" :class="{'mt-4': isMobile }">
        <Button label="Автозаполнить" severity="secondary" icon="pi pi-filter" class="p-button-rounded" :class="{'w-full': isMobile}" @click="$emit('openAutoDialog')" />
        <Button label="Сбросить план" severity="secondary" icon="pi pi-refresh" class="p-button-warning p-button-rounded" :class="{'w-full': isMobile}"
            @click="$emit('reset')" />
        <Button label="Сохранить" icon="pi pi-check" class="p-button-success p-button-rounded" :class="{'w-full': isMobile}" @click="$emit('save')" />
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (event: 'openAutoDialog'): void,
  (event: 'reset'): void,
  (event: 'save'): void,
}>();

const props = defineProps({
    isMobile: Boolean
})
</script>
