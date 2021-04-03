const initialState = {
    tasks: []
};



export function reducer (state = initialState, action) {
    switch (action.type) {
        case 'LOAD_TASKS':
            {
                const {tasks} = action.payload;
                return {
                    ...state,
                    tasks: tasks
                }
            }
        case 'ADD_TASK':
            {
                const {task} = action.payload;
                const newTask = [...state.tasks, task]
                return {
                    ...state,
                    tasks: newTask
                }
            }
        case 'DELETE_TASK': 
        {
            const {id} = action.payload;
            const newTasks = state.tasks.filter(item => item.id !== id);
            return {
                ...state,
                tasks: newTasks
            }
        }
        case 'COMPLETE_TASK': {
            const {id} = action.payload;
            const task = state.tasks.find(item => item.id === id);
            const indexTask = state.tasks.findIndex(item => item.id === id)
            const updatedTasks = [...state.tasks]
            updatedTasks.splice(indexTask, 1 , {
                ...task,
                completed: !task.completed
            });
            return {
                ...state,
                tasks: updatedTasks
            }
        }
        case 'FAVORITE_TASK': {
            const {id} = action.payload;
            const task = state.tasks.find(item => item.id === id);
            const indexTask = state.tasks.findIndex(item => item.id === id)
            const updatedTasks = [...state.tasks]
            updatedTasks.splice(indexTask, 1 , {
                ...task,
                favorite: !task.favorite
            });
            return {
                ...state,
                tasks: updatedTasks
            }
        }
        case 'ALL_COMPLETED': {
            const completedTaks = state.tasks.map(item => {
                return {
                    ...item,
                    completed: true
                }
            });
            return {
                ...state,
                tasks: completedTaks
            }
        }
        case 'ALL_UNCOMPLETED': {
            const uncompletedTaks = state.tasks.map(item => {
                return {
                    ...item,
                    completed: false
                }
            });
            return {
                ...state,
                tasks: uncompletedTaks
            }
        }
        case 'EDIT_TASK': {
            const {id,text} = action.payload;
            const editableTask = state.tasks.find(task => task.id === id);
            const editableTaskIndex = state.tasks.findIndex(task => task.id === id);
            const newText = {
                ...editableTask,
                text: text
            }
            const updatedTasks = [...state.tasks];
            updatedTasks.splice(editableTaskIndex, 1, newText)
            return {
                ...state,
                tasks: updatedTasks
            }

        }
        default:
            return state;
    }
}