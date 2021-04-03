import './TaskManager.css';
import React from "react";
import {Header} from '../Header/Header.jsx';
import {Footer} from '../Footer/Footer.jsx';
import {Task} from '../Task/Task.jsx';
import { connect } from 'react-redux';
import { loadTasks, addTask, deleteTask, completeTask, favoriteTask, markAllTasks, editTask } from '../../store/middleware';


class TaskManagerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    areAllTasksCompleted = (items) => {
        for(let i=0; i<items.length; i++) {
            if(items[i].completed === false) {
                return false;
            }
            
        }
        return true;
    }
   
    componentDidMount() {
        this.props.loadTasks();
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({text: value})
    }
    handleSubmit = () => {
        if(this.state.text.length === 0) {
            return;
        }
        this.props.addTask(this.state.text);
    }
    
    render() {
        return <div className='products-list-wrapper'>
            <main className='products-list-main'>
                <Header/>
                <form className="create-list-form" onSubmit={this.handleSubmit}>
                        <input
                            className="create-list"
                            maxLength = '50'
                            placeholder = 'Введите наименование продукта'
                            type = 'text'
                            name = "list"
                            value={this.state.text}
                            onChange = {this.handleChange}
                        />
                        <button className="button-add-list" type="submit">Добавить в список</button>
                </form>
                <div className="overlay">
                        <ul className="list">
                            {this.props.tasks.map(task => 
                                <Task
                                    id={task.id}
                                    key={task.id}
                                    text={task.text}
                                    isCompleted = {task.completed}
                                    isFavorite={task.favorite}
                                    removeHandler = {() => this.props.deleteTask(task.id)}
                                    completedHandler = {() => this.props.completeTask(task.id,!task.completed)}
                                    favoriteHandler = {() => this.props.favoriteTask(task.id,!task.favorite)}
                                    editHandler = {this.props.editTask}
                                />
                            )}
                        </ul>
                    </div>
                <Footer 
                markAllTasks={this.areAllTasksCompleted(this.props.tasks)}  
                allCompletedHandler={() => this.props.markAllTasks()}/>
            </main>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = {
    loadTasks: loadTasks,
    addTask: addTask,
    deleteTask: deleteTask,
    completeTask: completeTask,
    favoriteTask: favoriteTask,
    markAllTasks: markAllTasks,
    editTask: editTask
}

const TaskManager = connect(mapStateToProps, mapDispatchToProps)(TaskManagerComponent);
export {TaskManager};