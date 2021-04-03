import cn from 'classnames';
import './Footer.css';

export function Footer(props) {
    const {markAllTasks,allCompletedHandler} = props;
    const btnClass = cn('footer-checkbox',{
        'selected': markAllTasks
    });

    return <footer className='footer'>
                <button className={btnClass} onClick={allCompletedHandler}></button>
                <span className='footer-text'>Все задачи выполнены</span>
            </footer>
}