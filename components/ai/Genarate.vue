<template>
  <div class="flex items-center justify-center min-h-[400px] w-full p-4">
    <Card class="w-full max-w-md">
      <template #content>
        <div class="relative h-48 mb-6">
          <div class="absolute inset-0 flex flex-col justify-between overflow-hidden">
            <div v-for="i in 5" :key="i" class="binary-stream flex space-x-2 text-lg opacity-80" :style="{
              'animation-delay': `${i * -2}s`,
              'color': 'var(--primary-color)'
            }">
              <template v-for="j in 30" :key="j">
                <span class="binary-digit" :style="{
                  'animation-delay': `${j * 0.1}s`,
                  'opacity': Math.random() * 0.7 + 0.3
                }">
                  {{ Math.random() > 0.5 ? '1' : '0' }}
                </span>
              </template>
            </div>
          </div>

          <div class="absolute inset-0 glow-overlay"></div>
        </div>

        <div class="space-y-6">
          <h3 class="text-2xl font-semibold text-center" style="color: var(--primary-color)">
            Генерируем изображение
          </h3>

          <ProgressBar mode="indeterminate" class="h-3" />

          <p class="text-sm text-center" style="color: var(--text-color-secondary)">
            Немного магии и ваш персонаж будет готов...
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import OpenAI from 'openai';
import { PROMPTS } from '~/constants/prompts';
import { AI_TUNNEL_KEY } from '~/constants/keys';
import userDataStorage from '~/storage/userData';

const props = defineProps({
  prompt: { type: String, required: true },
  redirectPage: { type: String, required: true },
  reload: { type: String}
})

const client = new OpenAI({
  apiKey: AI_TUNNEL_KEY,
  baseURL: 'https://api.aitunnel.ru/v1/',
  dangerouslyAllowBrowser: true
});

const saveImage = async (url: string) => {
  await userDataStorage.setItem('photo', url)
};

const handleStartGeneration = async () => {
  try {
    const imageRes = await client.images.generate({
    model: 'dall-e-2',
    size: '512x512',
    quality: 'standard',
    prompt: PROMPTS.basic + props.prompt,
  });
  const imageUrl = imageRes.data[0].url;

  if (imageUrl) {
    await saveImage(imageUrl);
    if (props.reload != 'true') {
      navigateTo(props.redirectPage)
      return
    }
    window.location.reload();
  }
  } catch (error) {
    console.error(String(error));
  }
};

onMounted(handleStartGeneration);
</script>

<style scoped>
.binary-stream {
  animation: scroll 15s linear infinite;
  font-family: monospace;
  letter-spacing: 0.5em;
}

.binary-digit {
  animation: pulse 2s infinite;
  display: inline-block;
  transform: translateZ(0);
}

.glow-overlay {
  background: linear-gradient(to bottom,
      transparent,
      var(--surface-ground) 90%);
  pointer-events: none;
}

@keyframes scroll {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 1;
  }
}

:deep(.p-progressbar) {
  background: var(--surface-200);
  border-radius: 1rem;
  overflow: hidden;
}

:deep(.p-progressbar-indeterminate) {
  background: linear-gradient(to right,
      var(--primary-color) 30%,
      var(--primary-300) 50%,
      var(--primary-color) 70%);
  background-size: 200% 100%;
  animation: progressGradient 2s linear infinite;
}

@keyframes progressGradient {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>