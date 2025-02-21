import userDataStorage from '~/storage/userData';

export async function getUserPoints(): Promise<number> {
    try {
        const points = await userDataStorage.getItem('points');
        
        if (typeof points === 'number') {
            return points;
        }
        
        return 0;
    } catch (error) {
        console.error('Ошибка при получении points:', error);
        return 0;
    }
}

export async function updateUserPoints(newPoints: number): Promise<void> {
    try {
        await userDataStorage.setItem('points', newPoints);
    } catch (error) {
        console.error('Ошибка при обновлении points:', error);
    }
}
