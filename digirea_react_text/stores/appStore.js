// ============================================================================
// store
// ============================================================================

import EventEmitter from 'eventemitter3'

export default class Store extends EventEmitter {
    constructor(props){
        super(props);

        // store 自身が持つステート（内部変数・状態）
        this.value = '';//text欄のvalue
        this.memoList = [];
        this.delbuttonValue = "delete";
        //this.delNumber = 0;

        // 関数をバインド
        this.getValue = this.getValue.bind(this);
        this.getMemoList = this.getMemoList.bind(this);
        this.getDelbuttonValue = this.getDelbuttonValue.bind(this);

        // action で dispatch に与えられたオブジェクトが
        // ここで payload として取得されるので、store を
        // 更新したあと、ビューを更新するために Emit する
        this.dispatcher = props.dispatcher;
        this.dispatcher.register((payload)=>{
            // payload には action から渡されたオブジェクトが
            // 入っているので、action 側で「タイプ」を一緒に
            // 渡すようにし、ここではその値を見て処理を分岐している
            if(payload.actionType === 'update'){
                this.value = payload.value;
                this.emit(Store.UPDATE, null, this.value);
            }else if(payload.actionType === 'add_list'){
                this.memoList.push(new ListStruct({
                    id: "" + payload.id,
                    text: payload.text,
                }));
                this.value = '';
                this.emit(Store.UPDATE, null, '');
                this.emit(Store.UPDATE_LIST, null, this.memoList);
            }else if(payload.actionType === "delete_list"){
                //this.memoList.splice(payload.num,1);
                for(let i=0;i<this.memoList.length;i++){
                    if(this.memoList[i].id === "" + payload.id){
                        this.memoList.splice(i,1);
                    }
                }
                this.emit(Store.UPDATE_LIST, null,this.memoList)
            }
        });
    }

    getValue(){//テキスト欄のvalue
        return this.value;
    }
    getMemoList(){
        var dest = [];
        for(let list of this.memoList){
            dest.push({
                id: list.id,
                text: list.text,
            });
        }
        return dest;
    }
    getDelbuttonValue(){
        return this.delbuttonValue;
    }
}

// Emit する都合上、イベントの名前を定数で定義したほうが
// なにかと間違いが起こりにくいので、store で定義しておく
Store.UPDATE = 'update';
Store.UPDATE_LIST = 'update_list';

class ListStruct {
    constructor(props){
        this.id = props.id;
        this.text = props.text;
    }
}


