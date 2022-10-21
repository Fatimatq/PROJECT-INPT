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
import axios from 'axios';

import Logo from './../assets/notif.png';

import { Formik, Form } from 'formik';
import { TextInput } from '../componants/FormLib';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUser, FiCalendar } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/users", {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate.push('/');

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
                    {/* <StyledTitle size={30}
                    color={colors.theme}>
                    Member Signup
                </StyledTitle> */}
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            confPassword: "",
                            name: "",
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required"),
                            password: Yup.string()
                                .min(8, "Password is too short")
                                .max(30, "Password is too long")
                                .required("Required"),
                            name: Yup.string().required("Required"),
                            confPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match"),

                        })}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <TextInput
                                    name="setName"
                                    type="text"
                                    label="Nom Complet"
                                    placeholder="Entre Votre Nom"
                                    icon={<FiUser />}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />


                                <TextInput
                                    name="setEmail"
                                    type="text"
                                    label="Email Address"
                                    placeholder="Exemple@gmail.com"
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

                                <TextInput
                                    name="setConfPassword"
                                    type="password"
                                    label="Repeat Password"
                                    placeholder="**********"
                                    icon={<FiLock />}
                                    onChange={(e) => {
                                        setConfPassword(e.target.value);

                                    }}
                                />

                                <ButtonGroup>
                                    {!isSubmitting && (
                                        <StyledFormButton onClick={Register} type="submit">
                                            S'inscrire
                                        </StyledFormButton>)}
                                    {isSubmitting && (
                                        <ThreeDots
                                            color={colors.theme}
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
                        Already have an account ? <TextLink to="/login"> Login</TextLink>
                    </ExtraText>
                </StyledFormArea>
                <CopyrightText>
                    All rights reserved &copy;2022
                </CopyrightText>
            </div >
        </StyledContainer >
    );
}



export default Register;