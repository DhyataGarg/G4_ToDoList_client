import { useRef, useState } from 'react';
import axios from 'axios';
import styles from './card.module.css';

const Card = (props) => {
    // const titleRef = useRef(props.title);
    // titleRef.current.value = props.title;
    const [isEditting, setIsEditting] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const deleteItemHandler = () => {
        const apiUrl = `http://localhost:5000/delete-item?id=${props.id}`
        axios.delete(apiUrl).then((response) => {
            console.log(response);
            props.refreshList();
        }).catch((error) => { console.log(error); });
    }

    const itemCompletionHandler = () => {
        var apiUrl = `http://localhost:5000/update-item-completion?id=${props.id}`;
        axios.put(apiUrl, {}).then(i => {
            console.log(i.data);
            props.refreshList();
        }).catch(err => {
            console.log(err);
        });
    }

    const updateItemHandler = (e) => {
        e.preventDefault();
        var apiUrl = `http://localhost:5000/update-item?id=${props.id}`;
        axios.put(apiUrl, { title, description }).then(i => {
            console.log(i.data);
            props.refreshList();
            setIsEditting(false);
        }).catch(err => {
            console.log(err);
        });
    }

    const startEditting = (e) => {
        e.preventDefault();
        setIsEditting(true);
    }

    return <div className={styles.card}>
        {!isEditting ? <h3><center>{props.title}</center></h3> :
            <input className={styles.input} type="text" id="title" value={title} onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
            }} />}
        <hr />
        <div className={styles.desc}>
            {!isEditting ? <p>{props.description}</p> :
                <textarea className={styles.textarea} type="text" id="description" value={description} onChange={(e) => {
                    e.preventDefault();
                    setDescription(e.target.value);
                }} />}
            <div className={styles.buttons}>
                <button onClick={itemCompletionHandler} className='btn' disabled={props.isCompleted}>Completed</button>
                {!isEditting ? <button onClick={startEditting} className='btn'>Edit</button> :
                    <button onClick={updateItemHandler} className='btn'>Save</button>}
                <button onClick={deleteItemHandler} className='btn'>Delete</button>
            </div>
        </div>
    </div>
}

export default Card;