
/**
 * 
 * @param {string} task 
 */
export function loadTasksActionCreator(tasks) {
    return {
        type: 'LOAD_TASKS',
        payload: { 
            tasks: tasks
        }
    }
}

/**
 * 
 * @param {string} task 
 */

export function addTaskActionCreator(task) {
    return {
        type: 'ADD_TASK',
        payload: {
            task: task
        }
    }
}


/**
 * 
 * @param {number} id 
 */
export function deleteTaskActionCreator(id) {
    return {
        type: 'DELETE_TASK',
        payload: {
            id: id
        }
    }
}

/**
 * 
 * @param {number} id 
 */

export function completeTaskActionCreator(id) {
    return {
        type: 'COMPLETE_TASK',
        payload: {
            id: id
        }
    }
}

/**
 * 
 * @param {number} id 
 */

 export function favoriteTaskActionCreator(id) {
    return {
        type: 'FAVORITE_TASK',
        payload: {
            id: id
        }
    }
}

export function markAllAsCompletedActionCreator() {
    return {
        type: 'ALL_COMPLETED',  
    }
}

export function markAllAsUncompletedActionCreator() {
    return {
        type: 'ALL_UNCOMPLETED',
    }
}

/**
 * 
 * @param {number} id 
 * @param {string} text 
 * @returns 
 */

export function editTaskActionCreator(id,text) {
    return {
        type: 'EDIT_TASK',
        payload: {
            id: id,
            text: text
        }
    }
}

