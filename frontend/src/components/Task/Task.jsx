import './Task.css'
import cn from 'classnames';
import React from "react";

export class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            text: props.text
        }
        this.onEdit = this.onEdit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.inputDOM = React.createRef();    
    }
    onEdit() {
        this.setState({disabled: false});
        this.inputDOM.current.focus();
    }
    onChange(e) {
        const value = e.target.value;
        this.setState({text: value})
    }
    onBlur() {
        this.props.editHandler(this.props.id, this.state.text);
    }
   render() {
    const {
        isCompleted,
        isFavorite,
        completedHandler,
        favoriteHandler,
        removeHandler
    } = this.props;
   
    const taskClass = cn('task', { 'completed': isCompleted });
    const contentClass = cn('content', { 'completed': isCompleted });
    const checkboxClass = cn('checkbox', { 'selected': isCompleted });
    const starClass = cn('star', { 'selected': isFavorite });

    return (
        <li className={taskClass}>
            <div className={contentClass}>
                <button className={checkboxClass} onClick={completedHandler}></button>
                <input
                    type="text"
                    disabled={this.state.disabled}
                    value={this.state.text} 
                    className="task-input"
                    ref={this.inputDOM}
                    onChange={this.onChange}
                    onBlur = {this.onBlur}
                />
            </div>
            <div className="actions">
                <button className={starClass} onClick={favoriteHandler}></button>
                <button className='edit' onClick={this.onEdit}></button>
                <button className='remove' onClick={removeHandler}></button>
            </div>
        </li>
    )
   }
}