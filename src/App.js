import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Formik, Field} from 'formik';
import axios  from 'axios'


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },


    paper: {
        marginTop: theme.spacing(25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        borderRadius: 10,
    },
}));

const CustomInputEmail = ({
                                  field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  ...props
                              }) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Ваша e-mail почта"
            autoComplete="email"
            autoFocus
            type="text"
            className={`form-control ${(errors.email && touched.email?'is-invalid':'')}`}
            onChange={field.onChange}
        />
      )
};
const CustomInputPassword = ({
                                 field, // { name, value, onChange, onBlur }
                                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                 ...props
                             }) => {
    return (
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Введите пароль"
        type="password"
        className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
        onChange={field.onChange}
    />
    )
};
axios({
    method:'post',
    url:'https://9bh21qott4.execute-api.us-east-1.amazonaws.com/dev/user/token',
    data:{
        email: 'email',
        password: 'password'
    },
    headers:{
        'Content-Type': 'application/json',
    }
});
export default function SignIn() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    PicArt
                </Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password:''
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                    className={classes.form}
                >
                    {(formikProps) => {
                        const {handleSubmit} = formikProps;
                        console.log(formikProps);
                    return (
                        <>
                            <Field
                                name="email"
                                component={CustomInputEmail}
                                placeholder="Email" />
                            <Field
                                name="password"
                                component={CustomInputPassword}
                                placeholder="Password"/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}>
                        Войти
                    </Button>
                    </>
                    )}}
                </Formik>
            </div>
        </Container>
    );
}
