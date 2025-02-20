import { z } from 'zod';
import extractValue from '~/utils/extractValue';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Укажите название' }).max(35, {message: 'Максимум 35 символов'}),
    difficulty: z.preprocess(
      extractValue,
      z.enum(["Легкий", "Средний", "Высокий"], { message: "Выберите сложность" })
    ),
    muscleGroup: z.preprocess(
      extractValue,
      z.enum(["Грудь", "Руки", "Спина", "Ноги", "Общее"], { message: "Выберите группу мышц" })
    ),
    items: z.preprocess(
      (val) => Array.isArray(val) ? val.map(extractValue) : val,
      z.array(z.string()).min(1, { message: 'Выберите хотя бы один элемент инвентаря' })
    ),
    instruction: z.string().min(1, { message: 'Введите инструкцию' }).max(400, {message: "Не более 400 символов"}),
    media:  z.string().min(1, { message: 'Введите ссылки на видео и фото' }),
    metric: z.preprocess(
      extractValue,
      z.enum(["Вес (кг)", "Число повторений", "Время (сек)", "Дистанция (м)"], { message: "Выберите единицу измерения" })
    )
  });

  export default formSchema;