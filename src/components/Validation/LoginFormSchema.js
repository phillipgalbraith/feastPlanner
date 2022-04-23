import * as yup from 'yup';

const formSchema = yup.object().shape({
    username: yup
    .string()
    .trim()
    .required('Enter valid username')
    .min(4, 'username must be at least 4 characters'),

    password: yup
    .string()
    .required('Enter your password')
})

export default formSchema;