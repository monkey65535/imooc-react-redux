import React, {Component} from 'react';
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button,
    WhiteSpace,
    WingBlank
} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {update} from '../../redux/user.redux';
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector';

@connect(state=>state.user,{update})
class Bossinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar:''
        }
        this.handleChangeState = this.handleChangeState.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChangeState(key, value) {
        this.setState({[key]: value});
    }
    selectAvatar(text){
        this.setState({avatar:text})
    }
    handleUpdate(){
        this.props.update(this.state);
    }
    render() {
        // 如果redux传入的数据中有redirectTo，那么跳转页面
        const redirect = this.props.redirectTo;
        const pathname = this.props.location.pathname;
        return (
            <div>
            {redirect && redirect !== pathname ? <Redirect to={redirect}></Redirect> : null}
                <NavBar mode='dark'>完善BOSS信息</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={v => this.handleChangeState('title', v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.handleChangeState('company', v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChangeState('money', v)}>职位薪资</InputItem>
                <TextareaItem
                    rows={3}
                    autoHeight
                    title='职位要求'
                    onChange={v => this.handleChangeState('desc', v)}></TextareaItem>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <Button type='primary' onClick={this.handleUpdate}>保存</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Bossinfo;