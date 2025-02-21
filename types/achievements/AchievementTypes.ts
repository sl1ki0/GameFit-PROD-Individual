export type AchievementCategory = 'training' | 'weight' | 'reps' | 'time' | 'distance';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    category: AchievementCategory;
    icon: string;
    dateEarned: Date;
}


type Metric = {
    total: number;
    max: number;
};

export type Stats = {
    trainings: number;
    weight: Metric;
    reps: Metric;
    time: Metric;
    distance: Metric;
};

export type UserAchievements = {
    achievements: Achievement[];
    stats: Stats;
    achievedThresholds: {
        weight: number[];
        reps: number[];
        time: number[];
        distance: number[];
        trainings: number[];
    };
};