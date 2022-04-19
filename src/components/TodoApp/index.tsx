import * as React from "react";
import {useState, useEffect} from "react";
import TodoHeader from "../TodoHeader";
import TodoList from "../TodoList";
import TodoFooter from "../TodoFooter";
import {filterArray, resetTodoListStatus} from '../utils/utils';
import "./todoStyle.css"

const completeTodoList = [
    { index: 1, value: "learn react", done: false, styleClass:"", destroy:"" },
    { index: 2, value: "Go shopping", done: true, styleClass:"completed", destroy:"" }
]
const TodoApp = () => {
    const [todoList, setTodoList] = useState(completeTodoList);
    const [backUpTodoList, setBackUpTodoList] = useState(completeTodoList);
    const [editText, setEditText] = useState("");
    const [activeItemCount, setActiveItemCount] = useState(0);
    const [filterStatus, setFilterStatus] = useState(false);
    const [showClearComp, setShowClearComp] = useState(false);

    useEffect(() => {
        countActiveTodoItem();
    }, [todoList]);

    const countActiveTodoItem = () => {
        const count = filterArray(backUpTodoList, false).length;
        setActiveItemCount(count);
    }

    const addItem = (todoItem:any) => {
        let tempObj = {
            index: todoList.length + 1,
            value: todoItem,
            done: false,
            styleClass: "",
            destroy:""
        };
        setTodoList([...todoList, tempObj])
        setBackUpTodoList([...todoList, tempObj]);
    }

    const markTodoDone = (itemIdx:number) => {
        const updateList = [...todoList];
        updateList[itemIdx].done = !updateList[itemIdx].done;
        updateList[itemIdx].styleClass = "completed";

        setTodoList(updateList);
        setBackUpTodoList(updateList);
    }

    const removeTodoItem = (itemIdx:number) => {
        const updateList = [...todoList];
        updateList.splice(itemIdx, 1);
        setTodoList(updateList);
        setBackUpTodoList(updateList);
    }

    const filterTodoList = (filterType:string) => {
        let updateList = [...backUpTodoList];

        switch(filterType){
            case "all":
                break;
            case "active":
                updateList = filterArray(updateList, false);
                break;
            case "completed":
                updateList = filterArray(updateList, true);
                break;
        }
        let result = [updateList.find(element => element.done === true)];
        let status = result.length > 0 && result[0] !== undefined;
        setShowClearComp(status);
        setTodoList(updateList);
    }

    const clearCompletedTodo = () => {
        let updateList = [...backUpTodoList];
        updateList = filterArray(updateList, false);

        setShowClearComp(false);
        setTodoList(updateList);
        setBackUpTodoList(updateList);
    }

    const onEdit = (idx:number) => {
        let updateList = [...backUpTodoList];
        updateList = updateList.map((item) => {
            if(item.index === idx){
                item.styleClass = item.done ? "completed editing" : "editing";
                setEditText(item.value);
            }
            return item;
        })

        setTodoList(updateList);
        setBackUpTodoList(updateList);
    }

    const onBlur = (idx:number, newVal:string) => {
        let updateList = [...backUpTodoList];
        updateList = updateList.map((item) => {
            if(item.index === idx){
                item.styleClass = item.done ? "completed" : "";
                item.value = newVal;
            }
            return item;
        })

        setTodoList(updateList);
        setBackUpTodoList(updateList);
    }

    const toggleAll = () => {
        let updateList = [...backUpTodoList];
        setFilterStatus(!filterStatus);
        updateList = resetTodoListStatus(updateList, filterStatus);
        setTodoList(updateList);
        setBackUpTodoList(updateList);
    }

    const addDeleteIcon = (flag:boolean, idx:number) => {
        let updateList = [...backUpTodoList];
        updateList = updateList.map((item) => {
            if(item.index === idx){
                item.destroy = flag ? "x" : "";
            }
            return item;
        })

        setTodoList(updateList);
        setBackUpTodoList(updateList);
    }

    return (
        <div className="todo-app">
            <TodoHeader addItem={addItem} />
            <TodoList
                markTodoDone={markTodoDone}
                todoItems={todoList}
                removeTodoItem={removeTodoItem}
                onEdit={onEdit}
                onBlur={onBlur}
                editText={editText}
                toggleAll={toggleAll}
                addDeleteIcon={addDeleteIcon}/>
            <TodoFooter 
                count={activeItemCount}
                sortTodoList={filterTodoList}
                clearCompletedTodo={clearCompletedTodo}
                showClearBtn={showClearComp}/>
        </div>
    )
}

export default TodoApp;