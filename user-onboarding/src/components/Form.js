import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className='user-form'>
            <Form>
            <Field type='text' name='name' placeholder='Full name' />
            {touched.name && errors.name && (
                <p className='errors'>{errors.name}</p>
            )}
            <Field type='text' name='email' placeholder='Email' />
            {touched.email && errors.email && (
                <p className='errors'>{errors.email}</p>
            )}
            <Field type='password' name='password' placeholder='Password' />
            {touched.password && errors.password && (
                <p className='errors'>{errors.password}</p>
            )}
            <label className='checkbox-wrapper'>
                Terms Of Service
                <Field type='checkbox' name='TOS' checked={values.TOS} />
                <span className='checkmark' />
            </label>
            <button type='submit'>Register</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, TOS}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            TOS: TOS || false
        };
    },
    validateYupSchema: Yup.object().shape({
        name: Yup.string().required('We need your name bro it\'s not like we are the CIA'),
        email: Yup.string().required('How else we pose to get a hold of you dawg'),
        password: Yup.string().required('Gott keep that stuff under lock homie')
}),
handleSubmit(values, {setUsers}) {
    axios
    .post('https://reqres.in/api/users', values)
    .then(response => {
        setUsers(response.data);
        console.log(response);
    })
    .catch(err => console.log(err.response));
}
})(UserForm);

export default FormikUserForm;

console.log('This is the HOC', FormikUserForm);