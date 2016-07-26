// ============================================================================
// コンポーネント定義
// ============================================================================

import React  from 'react';
import Flux   from 'flux';
import Action from '../actions/appAction.js';
import Store  from '../stores/appStore.js';

import ListComponent from './ListComponent.jsx';

export default class TodoApp extends React.Component {
    // コンストラクタ
    constructor(props){
        super(props);

        // dispatcher と action、さらに store のインスタンスを生成
        var dispatcher = new Flux.Dispatcher;
        this.action    = new Action({dispatcher: dispatcher, props: props});
        this.store     = new Store ({dispatcher: dispatcher, props: props});

        // 自分自身の state を定義する
        // このとき store から初期値を取るのがポイント
        this.state = {  //ここのstateはREACT(VIEW)的に必要なデータ
            value: this.store.getValue(),
            memoList: this.store.getMemoList(),
            delbuttonValue: this.store.getDelbuttonValue(),
        };

        // store が emit してくるイベントを listen
        this.store.on(Store.UPDATE, function(err, storeValue){
            this.setState({value: storeValue});
        }.bind(this));
        this.store.on(Store.UPDATE_LIST, function(err, storeMemoList){
            this.setState({memoList: storeMemoList});
        }.bind(this));

        // 関数のバインド
        this.textChange = this.textChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    // 独自コンポーネントのスタイルを外部ファイルに依存させず
    // カプセル化して定義する（あとで JSX 内で使う）
    styles(){
        return {
            contena: {
                textAlign: 'center',
                width: '100%',
                height: '100%'
            },
            board: {
                backgroundColor: 'rgba(64, 64, 64, 1.0)',
                width: '100%',
                height: '100%',
                overflow: 'auto'
            },
            header: {
                backgroundColor: 'rgba(0, 0, 0, 1.0)',
                lineHeight: '50px',
                width: '100%',
                height: '50px',
            },
            // list: {
            //     backgroundColor: 'rgba(255, 255, 255, 1.0)',
            //     color: '#333',
            //     textAlign: 'left',
            //     margin: '20px 4%',
            //     padding: '1% 5px',
            //     width: '90%',
            //     height: '50px',
            //     overflow: 'hidden'
            // },
            textbox: {
                fontSize: 'large',
                padding: '5px 0px',
                width: '100%',
                position: 'fixed',
                left: '0px',
                bottom: '0px'
            },
            button: {
                display: 'none'
            },
            // delbutton: {
            //     right: "10px",
            //     width: "20px",
            //     height: "20px",
            //     padding: "20px 20px"
            // }
        };
    }

    // private な method たち
    // このなかで、action を呼んでる
    textChange(eve){
        this.action.update(eve.currentTarget.value);
    }
    formSubmit(eve){
        eve.preventDefault();
        this.action.addList(this.state.value,this.state.memoList);
    }
    // JSX から DOM を構築する render
    render(){
        // これが上記で定義したスタイルの一覧になる
        const style = this.styles();

        // 以下のように `(arg)=>{}` という書き方をすると即時関数が
        // 生成される ※ES5風に書くと `function(arg){}`
        var generator = (value)=>{
            return (
                //<div style={style.list} key={value.id}>{value.text}<input type="button" style={style.delbutton} onClick={this.delbuttonClick.bind(this)} value={this.state.delbuttonValue} id={value.id} /></div>
                <ListComponent action={this.action} store={this.store} key={value.id} id={value.id} text={value.text}></ListComponent>
            );
        }

        // javascript のなかに突如出てくる HTML のような構文を持つ
        // 文章が JSX と呼ばれるもの
        // JSX では中括弧で JS を展開できる
        return (
            <div id="contena" style={style.contena}>
                <div style={style.board}>
                    <div style={style.header}>todo sample</div>
                    {this.state.memoList.map(generator)}
                </div>
                <form onSubmit={this.formSubmit.bind(this)}>
                    <input type="text" style={style.textbox} onChange={this.textChange.bind(this)} value={this.state.value} />
                    <input type="submit" style={style.button} />
                </form>
           </div>
        );
    }
}

