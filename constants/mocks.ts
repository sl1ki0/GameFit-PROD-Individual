import type Training from "~/types/trainings/TrainingType";
import type Exercise from "~/types/trainings/ExerciseType";

export const mockExercises: Exercise[] = [
    {
        id: "ex1",
        name: "Отжимания",
        difficulty: "Легкий",
        muscleGroup: "Грудь",
        items: ["Нет"],
        instruction: "<p>Лягте на пол лицом вниз, руки на ширине плеч. Поднимайте тело, выпрямляя руки, затем опускайтесь вниз.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc=", "https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr1", "tr3"],
        metric: "Число повторений"
    },
    {
        id: "ex2",
        name: "Приседания",
        difficulty: "Средний",
        muscleGroup: "Ноги",
        items: ["Нет"],
        instruction: "<p>Встаньте, ноги на ширине плеч. Опускайтесь, сгибая колени, держите спину прямо, затем поднимайтесь.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr2"],
        metric: "Число повторений"
    },
    {
        id: "ex3",
        name: "Планка",
        difficulty: "Средний",
        muscleGroup: "Общее",
        items: ["Коврик для йоги"],
        instruction: "<p>Опирайтесь на предплечья и носки, держите тело прямым, напрягая пресс, удерживайте позицию.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr3", "tr4"],
        metric: "Время (сек)"
    },
    {
        id: "ex4",
        name: "Скакалка",
        difficulty: "Легкий",
        muscleGroup: "Ноги",
        items: ["Скакалка"],
        instruction: "<p>Прыгайте через скакалку, держа её за ручки, сохраняйте ровное дыхание и мягкое приземление.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr4"],
        metric: "Время (сек)"
    },
    {
        id: "ex5",
        name: "Подтягивания",
        difficulty: "Высокий",
        muscleGroup: "Руки",
        items: ["Турник"],
        instruction: "<p>Повисните на турнике, подтягивайтесь до подбородка выше перекладины, затем медленно опускайтесь.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr1"],
        metric: "Число повторений"
    },
    {
        id: "ex6",
        name: "Жим гантелей",
        difficulty: "Средний",
        muscleGroup: "Грудь",
        items: ["Гантели"],
        instruction: "<p>Лягте на скамью, поднимите гантели от груди вверх, выпрямляя руки, затем опустите обратно.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr1"],
        metric: "Вес (кг)"
    },
    {
        id: "ex7",
        name: "Скручивания",
        difficulty: "Легкий",
        muscleGroup: "Общее",
        items: ["Коврик для йоги"],
        instruction: "<p>Лягте на спину, согните колени, поднимайте плечи к коленям, напрягая пресс, затем опускайтесь.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr3"],
        metric: "Число повторений"
    },
    {
        id: "ex8",
        name: "Тяга эспандера",
        difficulty: "Средний",
        muscleGroup: "Спина",
        items: ["Эспандер"],
        instruction: "<p>Закрепите эспандер, тяните его к себе, сводя лопатки, затем медленно отпускайте назад.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr2"],
        metric: "Число повторений"
    },
    {
        id: "ex9",
        name: "Выпады с медболом",
        difficulty: "Средний",
        muscleGroup: "Ноги",
        items: ["Медбол"],
        instruction: "<p>Держите медбол, шагайте вперёд, опуская заднее колено к полу, затем возвращайтесь назад.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr2"],
        metric: "Число повторений"
    },
    {
        id: "ex10",
        name: "Берпи",
        difficulty: "Высокий",
        muscleGroup: "Общее",
        items: ["Нет"],
        instruction: "<p>Присядьте, отпрыгните в планку, отожмитесь, вернитесь в присед и прыгните вверх.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr4"],
        metric: "Число повторений"
    },
    {
        id: "ex11",
        name: "Подъёмы на бицепс",
        difficulty: "Средний",
        muscleGroup: "Руки",
        items: ["Гантели"],
        instruction: "<p>Встаньте, держите гантели, сгибайте руки в локтях, поднимая их к плечам, затем опускайте.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr1"],
        metric: "Вес (кг)"
    },
    {
        id: "ex12",
        name: "Подъёмы ног",
        difficulty: "Легкий",
        muscleGroup: "Общее",
        items: ["Коврик для йоги"],
        instruction: "<p>Лягте на спину, поднимайте прямые ноги до угла 90 градусов, затем медленно опускайте.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr3"],
        metric: "Число повторений"
    },
    {
        id: "ex13",
        name: "Отжимания на брусьях",
        difficulty: "Высокий",
        muscleGroup: "Грудь",
        items: ["Брусья"],
        instruction: "<p>Повисните на брусьях, сгибайте руки в локтях, опуская тело, затем поднимайтесь вверх.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr1"],
        metric: "Число повторений"
    },
    {
        id: "ex14",
        name: "Прыжки с резинкой",
        difficulty: "Средний",
        muscleGroup: "Ноги",
        items: ["Резинка для фитнеса"],
        instruction: "<p>Наденьте резинку на ноги, прыгайте вверх, отталкиваясь обеими ногами, затем мягко приземляйтесь.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr4"],
        metric: "Число повторений"
    },
    {
        id: "ex15",
        name: "Мостик на фитболе",
        difficulty: "Легкий",
        muscleGroup: "Спина",
        items: ["Фитбол"],
        instruction: "<p>Лягте спиной на фитбол, поднимайте таз вверх, напрягая ягодицы, затем опускайтесь.</p>",
        media: ["https://imgproxy.cdn-tinkoff.ru/zoom_05:compressed95/aHR0cHM6Ly9jZG4udGJhbmsucnUvc3RhdGljL3BhZ2VzL2ZpbGVzL2VkMGE4YTUzLWU4NGMtNGYzNy05YTNlLTRkOTRkMGU4NDhmYi5wbmc="],
        usedIn: ["tr2"],
        metric: "Число повторений"
    }
];

export const mockTrainings: Training[] = [
    {
        id: "tr1",
        name: "Сила верхней части",
        description: "Тренировка для груди, рук и спины с использованием оборудования.",
        exercises: [
            { exId: "ex1", count: 15 }, 
            { exId: "ex5", count: 8 },  
            { exId: "ex6", count: 10 }, 
            { exId: "ex11", count: 12 }, 
            { exId: "ex13", count: 10 } 
        ],
        muscleGroup: "Грудь, Руки",
        difficulty: "Средний",
        equipment: ["Нет", "Турник", "Гантели", "Брусья"]
    },
    {
        id: "tr2",
        name: "Ноги и спина",
        description: "Укрепление ног и спины с минимальным оборудованием.",
        exercises: [
            { exId: "ex2", count: 20 }, 
            { exId: "ex8", count: 15 }, 
            { exId: "ex9", count: 12 }, 
            { exId: "ex15", count: 15 } 
        ],
        muscleGroup: "Ноги, Спина",
        difficulty: "Средний",
        equipment: ["Нет", "Эспандер", "Медбол", "Фитбол"]
    },
    {
        id: "tr3",
        name: "Ядро и выносливость",
        description: "Упражнения для всего тела и укрепления кора.",
        exercises: [
            { exId: "ex1", count: 12 }, 
            { exId: "ex3", count: 30 }, 
            { exId: "ex7", count: 20 }, 
            { exId: "ex12", count: 15 }
        ],
        muscleGroup: "Общее",
        difficulty: "Легкий",
        equipment: ["Нет", "Коврик для йоги"]
    },
    {
        id: "tr4",
        name: "Кардио и HIIT",
        description: "Интенсивная тренировка для выносливости и силы.",
        exercises: [
            { exId: "ex4", count: 60 }, 
            { exId: "ex10", count: 10 },
            { exId: "ex3", count: 45 },
            { exId: "ex14", count: 20 }
        ],
        muscleGroup: "Общее",
        difficulty: "Высокий",
        equipment: ["Скакалка", "Коврик для йоги", "Резинка для фитнеса"]
    }
];