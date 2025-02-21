import userDataStorage from '~/storage/userData';
import type { Achievement, UserAchievements, AchievementCategory, Stats } from '~/types/achievements/AchievementTypes';
import { nanoid } from 'nanoid';
import { ACHIEVEMENT_THRESHOLDS, typeTranslations } from '~/constants/achievments';

const METRIC_MAPPING: Record<string, keyof Omit<Stats, 'trainings'>> = {
  'Вес (кг)': 'weight',
  'Число повторений': 'reps',
  'Время (сек)': 'time',
  'Дистанция (м)': 'distance',
};

function getDefaultAchievements(): UserAchievements {
  return {
    achievements: [],
    stats: {
      trainings: 0,
      weight: { total: 0, max: 0 },
      reps: { total: 0, max: 0 },
      time: { total: 0, max: 0 },
      distance: { total: 0, max: 0 },
    },
    achievedThresholds: {
      weight: [],
      reps: [],
      time: [],
      distance: [],
      trainings: []
    },
  };
}


function processMetrics(
  metrics: Array<{ metric: string; count: number }>,
  stats: Stats,
  newAchievements: Achievement[],
  achievedThresholds: UserAchievements['achievedThresholds']
): void {
  metrics.forEach(({ metric, count }) => {
    const key = METRIC_MAPPING[metric];
    if (!key) return;
    stats[key].total += count;
    if (count > stats[key].max) {
      stats[key].max = count;
      checkThresholds(
        key.toUpperCase() as keyof typeof ACHIEVEMENT_THRESHOLDS,
        count,
        newAchievements,
        achievedThresholds
      );
    }
  });
}


function checkThresholds(
  type: keyof typeof ACHIEVEMENT_THRESHOLDS,
  value: number,
  newAchievements: Achievement[],
  achievedThresholds: UserAchievements['achievedThresholds']
): void {
  const thresholds = ACHIEVEMENT_THRESHOLDS[type];
  const key = type.toLowerCase() as keyof typeof achievedThresholds;
  const alreadyAchieved = achievedThresholds[key];
  thresholds.forEach((threshold) => {
    if (value >= threshold && !alreadyAchieved.includes(threshold)) {
      newAchievements.push(
        createAchievement({
          name: `Получена ачивка!`,
          description: `${threshold} ${typeTranslations[type].name} в категории ${typeTranslations[type].category}`,
          category: 'training' as AchievementCategory,
          icon: 'pi pi-trophy',
        })
      );
      alreadyAchieved.push(threshold);
    }
  });
}

function createAchievement(template: Omit<Achievement, 'id' | 'dateEarned'>): Achievement {
  return { ...template, id: nanoid(10), dateEarned: new Date() };
}

export async function processStatistics(
  metrics: Array<{ metric: string; count: number }>
): Promise<Achievement[]> {
  try {
    const userAchievements: UserAchievements =
      (await userDataStorage.getItem('statistics')) || getDefaultAchievements();
      
    userAchievements.stats.trainings++;
    const newAchievements: Achievement[] = [];
    
    processMetrics(metrics, userAchievements.stats, newAchievements, userAchievements.achievedThresholds);
    
    checkThresholds(
      'TRAININGS',
      userAchievements.stats.trainings,
      newAchievements,
      userAchievements.achievedThresholds
    );
    
    userAchievements.achievements.push(...newAchievements);
    
    await userDataStorage.setItem('statistics', userAchievements);
    return newAchievements;
  } catch (error) {
    console.error('Ошибка при обработке ачивок:', error);
    throw error;
  }
}
