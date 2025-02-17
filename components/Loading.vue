<script setup lang="ts">
defineProps({
    isLoading: Boolean
})
</script>
<template>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <ProgressSpinner aria-label="Loading" />
    </div>
</template>