import {
    StyledTextInput,
    StyledFormArea,
    StyledFormButton,
    StyledLabel,
    Avatar,
    StyledTitle,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    CopyrightText,
    StyledContainer
} from './../componants/Styles'
import Logo from './../assets/notif.png';
import { Formik, Form } from 'formik';
import { TextInput } from '../componants/FormLib';
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate.push("/acceuil");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <StyledContainer>
            <div>
                <StyledFormArea>
                    <Avatar image={Logo}></Avatar>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required"),
                            password: Yup.string()
                                .min(8, "Password is too short")
                                .max(30, "Password is too long")
                                .required("Required"),
                        })}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <TextInput
                                    name="setEmail"
                                    type="text"
                                    label="Email Address"
                                    placeholder="....@gmail.com"
                                    icon={<FiMail />}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <TextInput
                                    name="setPassword"
                                    type="password"
                                    label="Password"
                                    placeholder="**********"
                                    icon={<FiLock />}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                {msg && <StyledTitle size={15}
                                    color={colors.red}>
                                    {msg}
                                </StyledTitle>}
                                <ButtonGroup>
                                    {!isSubmitting && (
                                        <StyledFormButton type="submit" onClick={Auth} to="/acceuil">
                                            Connexion
                                        </StyledFormButton>)}
                                    {isSubmitting && (
                                        <ThreeDots
                                            color="CEE5D0"
                                            height={40}
                                            width={50}
                                        />
                                    )}
                                </ButtonGroup>
                            </Form>
                        )
                        }
                    </Formik>
                    <ExtraText>
                        New here ? <TextLink to="/signup" > Sing up</TextLink>
                    </ExtraText>
                </StyledFormArea>
                <CopyrightText>
                    All rights reserved &copy;2022
                </CopyrightText>
            </div>
        </StyledContainer>
    )
}

export default Login;