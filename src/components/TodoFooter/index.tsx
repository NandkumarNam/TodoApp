import * as React from "react";
import { useState } from "react";

const TodoFooter = (props: any) => {
    const { count, sortTodoList, clearCompletedTodo, showClearBtn } = props;
    const [filterType, setFilterType] = useState('');

    const findPathName = (val: string) => {
        sortTodoList(val);
        setFilterType(val);
    }

    return (
        <footer className="footer">
            <span className="todo-count"><strong>{count}</strong> item left</span>
            <ul className="filters">
                <li>
                    <a className={filterType === "all" ? "selected" : ""} href="#/" onClick={() => findPathName("all")}>All</a>
                </li>
                <li>
                    <a className={filterType === "active" ? "selected" : ""} href="#/active" onClick={() => findPathName("active")}>Active</a>
                </li>
                <li>
                    <a className={filterType === "completed" ? "selected" : ""} href="#/completed" onClick={() => findPathName("completed")}>Completed</a>
                </li>
            </ul>
            { showClearBtn &&
                <button className="clear-completed" onClick={clearCompletedTodo}>Clear completed</button>}
        </footer>
    )
}

export default TodoFooter;