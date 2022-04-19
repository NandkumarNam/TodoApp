import * as React from "react";
import {useRef} from "react";

const TodoHeader = (props:any) => {
    const {addItem} = props;
    const form = useRef(null);
    const inputField = useRef(null);

    const onSubmit = (evt:any) => {
        evt.preventDefault();
        var todoItem = inputField.current.value;

        if(todoItem) {
          addItem(todoItem);
          evt.target.reset();
        }
    }
    return (
        <header className="header">
            <h1>todos</h1>

            <form ref={form} onSubmit={onSubmit} className="form-inline">
                <input ref={inputField} className="new-todo" placeholder="What needs to be done?" />
            </form>
        </header>
    )
}

export default TodoHeader;