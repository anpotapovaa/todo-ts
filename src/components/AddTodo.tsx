import { useState } from "react";

interface AddTodoProps {
    onAdd: (text:string) => void; //пропс, компанент ожидает функции onAdd, которая принимает тексты задачи
}

export function AddTodo({onAdd}: AddTodoProps) {
    const [text, setText] = useState(''); //хранит текущий текст из инпута
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //чтобы страница не перезагружалась
        if(!text.trim()) return;//проверка, чтобы не отправлять пустую строку
        onAdd(text);//передаём текст вверх
        setText('')//очищаем поле вода
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type={text} onChange={(e) => setText(e.target.value)} placeholder="Введите задачу..."/>
            <button type="submit">Add</button>
        </form>
    )
}