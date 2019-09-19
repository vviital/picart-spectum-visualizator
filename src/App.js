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
import * as Yup from 'yup'

const SignInSchema =Yup.object().shape({
    email:Yup.string()
        .email('Invalid')
        .required('Required'),
    password:Yup.string()
        .password(6,'Invalid')
        .required('Required')
});
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
                    validationSchema={SignInSchema}
                    onSubmit={() => {axios({
                        method:'post',
                        url:'https://9bh21qott4.execute-api.us-east-1.amazonaws.com/dev/user/token',
                        data:{
                            email: 'email',
                            password: 'password'
                        },
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    });
                    }}
                    className={classes.form}
                >
                    {(Props) => {
                        const {
                            handleSubmit,
                            fields,
                            onChange,
                            onSubmit,
                            onValidate,
                            submitting,
                            valid
                        } = props;
                        const {email, password} =fields;
                        const { data } = this.state;
                        const buttonCopy = submitting ? 'Submitting...' : 'Submit';
                        console.log(props);
                        return (
                            <form onSubmit={onSubmit(this.handleSubmit.bind(this))}>
                                <Field
                                    name="email"
                                    omChange={onChange}
                                    onValidate={onValidate}
                                    component={CustomInputEmail}
                                    placeholder="Email" />
                                <Field
                                    name="password"
                                    onChange={onChange}
                                    onValidate={onValidate}
                                    component={CustomInputPassword}
                                    placeholder="Password"/>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={submitting || !valid}
                                    className={classes.submit}
                                    onClick={handleSubmit}>
                                    Войти
                                </Button>
                            </form>
                        )}}
                </Formik>
            </div>
        </Container>
    );
}
function mapDispatchToProps(dispatch, ownProps) {
    return {

        // We'll have each field call the `onChange` handler with its own
        // field name and new value
        onChange: (field, value) => dispatch(changeValue(field, value)),

        // Each field will call the `onValidate` prop whenever it wants to
        // validate.  This will let the fields decide how and when they want to
        // validate themselves.
        onValidate: (field, validation) => dispatch(validate(field, validation)),

        // This is a curried function that takes the final submit function that
        // the component wants to call _after_ the fields have been validated
        onSubmit: handler => e => {
            e.preventDefault();

            return dispatch(submit(validations, handler));
        }
    };
}

// For this example, just connect the Root component to the entire state
export default connect(state => state, mapDispatchToProps)(Root);
