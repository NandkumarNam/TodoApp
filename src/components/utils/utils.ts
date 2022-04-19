export const filterArray = (array:any, flag:boolean) => {
    return array.filter((item:any) => {
        return item.done === flag;
    })
}

export const resetTodoListStatus = (array:any, flag:boolean) => {
    return array.map((item:any) => {
        if(flag){
            item.styleClass = "completed";
        } else {
            item.styleClass = "";
        }
        item.done = flag;
        return item;
    })
}