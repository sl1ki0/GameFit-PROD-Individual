export const calculateBMI = (weight: number, height: number) =>
    weight / ((height / 100) ** 2);

 export const getBaseGoal = (bmi: number) => {
    if (bmi >= 25) return 'weight_loss';
    if (bmi < 18.5) return 'mass_gain';
    return 'maintenance';
};