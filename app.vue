<template>
  <div class="text-2xl size-60 bg-sky-500/50 rounded-xl flex justify-center items-center">
	{{ item }}
  </div>
</template>

<script setup>
	const localForage = useLocalForage()
	await localForage.setItem('shjsd', 'Tested IndexedDB')
	const item = await localForage.getItem('shjsd')
</script>