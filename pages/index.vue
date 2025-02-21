<template>
    <p>Default url</p>
</template>

<script setup lang="ts">

// Только в последний момент понял, что не успеваю сделать экстрафичу на этой страничке, так что она будет редиректить, извините пожалуйста за такой косяк

onMounted(() => {
    return navigateTo('/exercise/list')
})
</script>