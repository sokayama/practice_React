// ============================================================================
// コンポーネント定義
// ============================================================================

import React  from 'react';

export default class ListComponent extends React.Component {
    // コンストラクタ
    constructor(props){
        super(props);
        // action、 store のインスタンスをapp.jsxからもらう
        this.store = props.store;
        this.action = props.action;

        this.key = props.key,
        this.id =  props.id,
        this.text = props.text      

        this.delbuttonValue = this.store.getDelbuttonValue();

       // 関数のバインド
        this.delbuttonClick = this.delbuttonClick.bind(this);

    }

    // 独自コンポーネントのスタイルを外部ファイルに依存させず
    // カプセル化して定義する（あとで JSX 内で使う）
    styles(){
        return {
            list: {
                backgroundColor: 'rgba(255, 255, 255, 1.0)',
                color: '#333',
                textAlign: 'left',
                margin: '20px 4%',
                padding: '1% 5px',
                width: '90%',
                height: '50px',
                overflow: 'hidden'
            },
            delbutton: {
                right: "10px",
                width: "20px",
                height: "20px",
                padding: "20px 20px"
            }
        };
    }


    delbuttonClick(eve){
        this.action.deleteList(eve.currentTarget.id);
    }


    // JSX から DOM を構築する render
    render(){
        // これが上記で定義したスタイルの一覧になる
        const style = this.styles();
        return (
            <div style={style.list} key={this.id}>{this.text}<input type="button" style={style.delbutton} onClick={this.delbuttonClick.bind(this)} value={this.delbuttonValue} id={this.id} /></div>
        );
    }
}

