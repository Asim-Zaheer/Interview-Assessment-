import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number()
        .typeError('Age must be a number')
        .min(18, 'You must be at least 18 years old')
        .required('Age is required'),
    role: yup.string().oneOf(['Admin', 'Editor', 'Viewer'], 'Invalid Role').required('Role is required'),
});
