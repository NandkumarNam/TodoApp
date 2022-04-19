import * as React from "react";
import { useEffect, useState } from "react";
import { TodoListDetails } from '../interfaces';

const TodoList = (props: any) => {
	const { todoItems, removeTodoItem, markTodoDone, onEdit, onBlur, editText, toggleAll, addDeleteIcon } = props;
	const [fieldValue, setFieldValue] = useState("");

	useEffect(() => {
		setFieldValue(editText);
	}, [editText]);

	const handleEdit = (e: object, idx: number) => {
		onEdit(idx);
	}

	const handleSubmit = (e: object, idx: number) => {
		onBlur(idx, fieldValue);
	}

	const handleMouseOver = (e:object, flag:boolean, idx: number) => {
		addDeleteIcon(flag, idx);
	}

	const renderTodoList = () => {
		return (
			todoItems.map((item: TodoListDetails, idx: number) => {
				return (
					<li className={item?.styleClass} key={item?.index} 
						onMouseEnter={(e) => handleMouseOver(e, true, item?.index)}
						onMouseLeave={(e) => handleMouseOver(e, false, item?.index)}>
						<div className="view">
							<input className="toggle" onClick={() => markTodoDone(idx)} type="checkbox" checked={item.done ? true : false} />
							<label onDoubleClick={e => handleEdit(e, item.index)}>{item.value}</label>
							<button className="destroy" onClick={() => removeTodoItem(idx)}>{item.destroy}</button>
						</div>
						<input className="edit" value={fieldValue} onChange={e => setFieldValue(e.target.value)} onBlur={(e) => handleSubmit(e, item.index)} />
					</li>
				)
			})
		)
	}
	return (
		<section className="main">
			<input id="toggle-all" className="toggle-all" type="checkbox" />
			<label onClick={() => toggleAll()}>Mark all as complete</label>
			<ul className="todo-list">
				{renderTodoList()}
			</ul>
		</section>
	)

}

export default TodoList;