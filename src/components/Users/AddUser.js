import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';


const AddUser = (props) => {

    // const [enteredUserName, setEnteredUserName] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState('');

    const enteredUserNameRef = useRef();
    const enteredAgeRef = useRef();

    const addUserHandler = (event) => {
        event.preventDefault();
        
        const enteredUserName = enteredUserNameRef.current.value;
        const enteredAge = enteredAgeRef.current.value;

        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title:'Invalid input',
                message:'Please enter a valid name and age (non-empty values).'
            });
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title:'Invalid age',
                message:'Please enter a valid age (> 0).'
            });
            return;
        } 
        
        props.onAddUser(enteredUserName, enteredAge);
        enteredUserNameRef.current.value = '';
        enteredAgeRef.current.value = '';
    };

    // const userNamechangeHandler = (event) => {
    //     setEnteredUserName(event.target.value);
    // };

    // const ageChangeHandler = (event) => {
    //     setEnteredAge(event.target.value);
    // }

    const errorHandler = (event) => {
        setError(null);
    }

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" ref={enteredUserNameRef}/>
            <label htmlFor="age">Age (Years)</label>
            <input id="age" type="number" ref={enteredAgeRef} />
            <Button type="Submit">Add User</Button>
            </form>
            </Card>
        </>
    );
}

export default AddUser;