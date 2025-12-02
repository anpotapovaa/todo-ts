import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) { //универсальная функция T, означает, что она может работать с любым типом даных
  const [value, setValue] = useState<T>(() => { //создаём состояние
    const json = localStorage.getItem(key);
    if (json == null) return initialValue;
    return JSON.parse(json);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue] as [T, typeof setValue];
}
