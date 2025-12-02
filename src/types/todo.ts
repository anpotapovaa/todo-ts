export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // определяем типы данных, вынесли в отдельнный файл, чтобы нам было удобнее
};
