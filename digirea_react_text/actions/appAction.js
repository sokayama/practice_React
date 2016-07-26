// ============================================================================
// action
// ============================================================================

export default class Action {
    constructor(props){
        this.dispatcher = props.dispatcher;
    }

    // ここで dispatch メソッドに与えたオブジェクトが
    // store 側で register に登録された関数へ payload
    // として渡される
    update(value){
        this.dispatcher.dispatch({
            actionType: 'update',
            value: value
        });
    }
    addList(text,memoList){
        this.dispatcher.dispatch({
            id: Date.now(),
            actionType: 'add_list',
            text: text
        });
    }
    deleteList(id){
        this.dispatcher.dispatch({
            id: id,
            actionType: "delete_list"
        })
    }
}

