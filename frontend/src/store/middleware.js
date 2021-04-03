import {
    loadTasksActionCreator,
    addTaskActionCreator,
    deleteTaskActionCreator,
    completeTaskActionCreator,
    favoriteTaskActionCreator,
    markAllAsCompletedActionCreator,
    markAllAsUncompletedActionCreator,
    editTaskActionCreator
} from './actions';

const url = 'http://localhost:3030/todos';
const defaultCompleted = false;
const defaultFavorite = false;

function isValueCompleted(items) {
    for(let i=0; i<items.length; i++) {
        if(items[i].completed === false) {
            return true;
        }
    }
    return false;
}


export function loadTasks() {
    return function (dispatch) {
        fetch(url)
        .then(data => {
            if(data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
        .then((data) => data.json())
        .then((data) => {
            dispatch(loadTasksActionCreator(data))
        })
        .catch(e => console.error(e))
    }
}

export function addTask(task) {
    return function (dispatch) {
        const body = {
            text: task,
            completed: defaultCompleted,
            favorite: defaultFavorite
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(url,options)
        .then(data => {
            if(data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
        .then(data => data.json())
        .then(data => {
            dispatch(addTaskActionCreator(data))
        })
        .catch(e => console.error(e))
    }
}

export function deleteTask(id) {
    return function (dispatch) {
        const option = {
            method: 'DELETE'
        }
        fetch(`${url}/${id}`, option)
        .then(data => {
            if(data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
        .then(() => {
            dispatch(deleteTaskActionCreator(id));
        })
        .catch(e => console.error(e))
    }
}

export function completeTask(id,value) {
    return function (dispatch) {
        const body = {
            completed: value
        }
        const option = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`${url}/${id}`, option)
        .then(data => {
            if(data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
        .then(() => {
            dispatch(completeTaskActionCreator(id));
        })
        .catch(e => console.error(e))
    }
}

export function favoriteTask(id,value) {
    return function (dispatch) {
        const body = {
            favorite: value
        }
        const option = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`${url}/${id}`, option)
        .then(data => {
            if(data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
        .then(() => {
            dispatch(favoriteTaskActionCreator(id));
        })
        .catch(e => console.error(e))
    }
}

export function markAllTasks() {
    return function (dispatch, getState) {
        const { tasks } = getState();
        let completed = isValueCompleted(tasks);
        
        
        const body = {
            completed: completed
        }
        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const urls = tasks.map(task => `${url}/${task.id}`);
        const requests = [];
        for (let i = 0; i < urls.length; i++) {
            requests.push(fetch(urls[i], options))
        }
        Promise.all(requests)
        .then(data => {
            if (data.find(response => response.status !== 200)) {
                throw new Error("something went wrong :( ");
            }
        })
        .then(() => {
            if(body.completed === false) {
                return dispatch(markAllAsUncompletedActionCreator())
            }
            dispatch(markAllAsCompletedActionCreator())
            
        })
        .catch(e => console.error(e))
    }
}

export function editTask(id,text) {
    return function (dispatch) {
        const body = {
            text: text
        }
        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(`${url}/${id}`,options)
        .then(data => {
            if(data.status === 200) {
                return data;
            }
            throw new Error(data.status);
        })
        .then(() => {
            dispatch(editTaskActionCreator(id,text));
        })
        .catch(e => console.error(e))
    }
}

