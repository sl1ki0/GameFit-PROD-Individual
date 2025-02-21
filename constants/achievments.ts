export const ACHIEVEMENT_THRESHOLDS = {
    TRAININGS: [5, 10, 25, 50, 100],
    WEIGHT: [10, 15, 30, 60, 100],
    REPS: [10, 20, 30, 40, 50, 100],
    TIME: [30, 60, 120, 3600, 7200, 18000, 36000],
    DISTANCE: [100, 500, 1000, 2500, 5000],
};

export const typeTranslations: Record<string, { category: string, name: string }> = {
    'WEIGHT': {
        category: 'веса',
        name: 'кг'
    },
    'REPS': {
        category: 'повторений',
        name: 'раз'
    },
    'TIME': {
        category: 'времени',
        name: 'сек'
    },
    'DISTANCE': {
        category: 'дистанции',
        name: 'м'
    },
    'TRAININGS': {
        category: 'тренировок',
        name: 'раз'
    }
};