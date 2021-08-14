// @ts-nocheck
import {useCallback, useEffect, useRef, useState} from "react";
import {
    ButtonAsLinkStyled,
    ButtonStyled,
    Container,
    H1Styled,
    InputFeedback,
    InputStyled,
    LabelAsButton,
} from '../common/StylesComponent';
import {
    PropChange,
    PropertiesContainer,
    PropName,
    SettingsContainer,
    RowContainer,
    TextAreaStyled,
} from './style/SettingsComponentStyle';

import {
    validateName,
    validateDescription,
    validatePassword,
    validateImage,
} from '../../validator/validator';

import {toast, ToastPosition} from "react-toastify";
import { MESSAGES, ROUTES, TOAST_SETTINGS, USER_FIELDS } from '../common/constants';


import {useDispatch} from "react-redux";
import {Formik} from "formik";
import PropTypes from "prop-types";

const ChangeComponent = ({ value, valueName, setChangeField, type, area = false }) => {
    console.log({ value, valueName, setChangeField, type })
    //const { profile, auth } = useReduxState();

    const localFieldChange = (fieldName, data) => {
        if (fieldName === USER_FIELDS.firstName) {
            const out = profile?.name?.first;
            dispatcher(profileActions.setProfile({ ...profile, name: { ...profile.name, first: data } }));
            return out;
        }
        if (fieldName === USER_FIELDS.lastName) {
            const out = profile?.name?.last;
            dispatcher(profileActions.setProfile({ ...profile, name: { ...profile.name, last: data } }));
            return out;
        }
        if (fieldName === USER_FIELDS.desc) {
            const out = profile?.desc;
            dispatcher(profileActions.setProfile({ ...profile, desc: data }));
            return out;
        }
        return null;
    };

    const remoteFieldChange = ()=>{};/*async (fieldName, data) => {
        const response = await SendData(
            ROUTES.CHANGE_ACC,
            { id: profile._id, field: fieldName, value: data },
            auth,
            logOut,
        );
        return response;
    };*/
    return (
        <Formik
            initialValues={{ data: value, secondData: '' }}
            validate={(values) => {
                let validator;
                switch (valueName) {
                    case USER_FIELDS.firstName:
                    case USER_FIELDS.lastName: {
                        validator = validateName;
                        break;
                    }
                    case USER_FIELDS.desc: {
                        validator = validateDescription;
                        break;
                    }
                    case USER_FIELDS.password: {
                        validator = validatePassword;
                        break;
                    }
                    default:
                        validator = () => true;
                        throw new Error('NO VALIDATOR');
                }
                const errors = {};
                if (!values.data) {
                    errors.data = 'Required';
                } else if (!validator(values.data)) {
                    errors.data = 'Invalid data';
                }
                if (valueName === USER_FIELDS.password) {
                    if (!values.secondData) {
                        errors.secondData = 'Required';
                    } else if (values.secondData !== values.data) {
                        errors.secondData = 'Invalid data';
                    }
                }
                return errors;
            }}
            onSubmit={(values) => {
                const oldValue = localFieldChange(valueName, values.data);

                remoteFieldChange(valueName, values.data).then((response) => {
                    ServerMessageHandler(response, null, (err) => {
                        if (err !== MESSAGES.ERROR.AUTH) localFieldChange(valueName, oldValue);
                    });
                });
                setChangeField({});
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Container vertical>
                    {area && (
                        <>
                            <TextAreaStyled
                                value={values.data}
                                onChange={handleChange}
                                name="data"
                                type="text"
                                cols={20}
                                onBlur={handleBlur}
                                className={errors.data && touched.data && 'error'}
                            />
                            {errors.data && touched.data && <InputFeedback>{errors.data}</InputFeedback>}
                        </>
                    )}
                    {type === 'password' && (
                        <Container vertical gap="5px">
                            <InputStyled
                                type="password"
                                name="data"
                                value={values.data}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.data && touched.data && 'error'}
                                placeholder="Enter new password..."
                            />
                            {errors.data && touched.data && <InputFeedback>{errors.data}</InputFeedback>}
                            <InputStyled
                                type="password"
                                name="secondData"
                                value={values.secondData}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.secondData && touched.secondData && 'error'}
                                placeholder="Repeat new password..."
                            />
                            {errors.secondData && touched.secondData && (
                                <InputFeedback>{errors.secondData}</InputFeedback>
                            )}
                        </Container>
                    )}
                    {!type && !area && (
                        <>
                            <InputStyled
                                type={type || 'text'}
                                value={values.data}
                                onChange={handleChange}
                                name="data"
                                onBlur={handleBlur}
                                className={errors.data && touched.data && 'error'}
                            />
                            {errors.data && touched.data && <InputFeedback>{errors.data}</InputFeedback>}
                        </>
                    )}

                    <Container justifyContent="space-around" gap="5px" margin="10px 0 0 0">
                        <ButtonStyled tiny onClick={handleSubmit}>
                            Save
                        </ButtonStyled>
                        <ButtonStyled
                            margin="5px"
                            tiny
                            onClick={() => {
                                setChangeField({});
                            }}
                        >
                            Cancel
                        </ButtonStyled>
                    </Container>
                </Container>
            )}
        </Formik>
    );
};

ChangeComponent.propTypes = {
    area: PropTypes.bool,
    children: PropTypes.node,
    setChangeField: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    valueName: PropTypes.string,
};


const Settings = () => {

    const inputRef = useRef();
    /*useEffect(() => {
        const closedRef = imageRef;
        const imageFunction = () => {
            inputRef?.current.click();
        };
        closedRef?.current.addEventListener('click', imageFunction);
        closedRef.current.classList.add('changeImage');
        return () => {
            closedRef?.current?.removeEventListener('click', imageFunction);
            closedRef?.current?.classList.remove('changeImage');
        };
    }, [imageRef]);*/


    //const { auth, profile } = useReduxState();
    //const [file, setFile] = useState();
    const profile = {_id:1}

    const [changeField, setChangeField]: [changeField:any, setChangeField:any] = useState({});

    const name: {first?: string, last?: string} = {first:"Ivan", last: "Skorodumov"};
    const desc: string = "fuck";


    const onFileSubmit = useCallback((file) => {
        /*if (!auth) {
            toast.error(MESSAGES.ERROR.AUTH, TOAST_SETTINGS);
            return;
        }*/
        if (!file) {
            toast.error(MESSAGES.ERROR.NO_FILE_CHOSEN, TOAST_SETTINGS);
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('id', profile._id+"");

        /*SendFile(ROUTES.CHANGE_ACC_IMAGE, formData, auth, logOut)
            .then((response) => {
                ServerMessageHandler(response, () => {
                    setUser((s) => ({ ...s, image: response.img }));
                });
            })
            .catch(() => {
                toast.error(MESSAGES.ERROR.UNKNOWN, TOAST_SETTINGS);
            });*/
    }, []);

    const fileChanges = (e: any) => {
        const image = e?.target?.files?.[0];
        if (validateImage(image)) onFileSubmit(image);
        else toast.error('Invalid image format!', TOAST_SETTINGS);
    };

    return (<div style={{width:"95%", height:"50%"}}>
        <SettingsContainer>
            <H1Styled>Personal information</H1Styled>
            <PropertiesContainer>
                <RowContainer>
                    <PropName>First name</PropName>
                    <PropChange>
                       {changeField?.[USER_FIELDS.firstName] ? (
                            <ChangeComponent
                                setChangeField={setChangeField}
                                value={name.first}
                                valueName={USER_FIELDS.firstName}
                            />
                        ) : (
                            <>
                                <b>{name?.first}&nbsp;</b>
                                <ButtonAsLinkStyled
                                    onClick={() => {
                                        setChangeField({ [USER_FIELDS.firstName]: true });
                                    }}
                                >
                                    change
                                </ButtonAsLinkStyled>
                            </>
                        )}
                    </PropChange>
                </RowContainer>
                <RowContainer>
                    <PropName>Last name</PropName>
                    <PropChange>
                        {changeField?.[USER_FIELDS.lastName] ? (
                            <ChangeComponent
                                setChangeField={setChangeField}
                                value={name.last}
                                valueName={USER_FIELDS.lastName}
                            />
                        ) : (
                            <>
                                <b>{name?.last}&nbsp;</b>
                                <ButtonAsLinkStyled
                                    onClick={() => {
                                        setChangeField({ [USER_FIELDS.lastName]: true });
                                    }}
                                >
                                    change
                                </ButtonAsLinkStyled>
                            </>
                        )}
                    </PropChange>
                </RowContainer>
                <RowContainer>
                    <PropName>Description</PropName>
                    <PropChange>
                        {changeField?.[USER_FIELDS.desc] ? (
                            <ChangeComponent
                                setChangeField={setChangeField}
                                area
                                value={desc}
                                valueName={USER_FIELDS.desc}
                            />
                        ) : (
                            <>
                                <b>*Description*&nbsp;</b>
                                <ButtonAsLinkStyled
                                    onClick={() => {
                                        setChangeField({ [USER_FIELDS.desc]: true });
                                    }}
                                >
                                    change
                                </ButtonAsLinkStyled>
                            </>
                        )}
                    </PropChange>
                </RowContainer>
                <RowContainer>
                    <PropName>Password</PropName>
                    <PropChange>
                        {changeField?.[USER_FIELDS.password] ? (
                            <ChangeComponent
                                type="password"
                                setChangeField={setChangeField}
                                valueName={USER_FIELDS.password}
                            />
                        ) : (
                            <>
                                <ButtonStyled
                                    medium
                                    onClick={() => {
                                        setChangeField({ [USER_FIELDS.password]: true });
                                    }}
                                >
                                    Change Password
                                </ButtonStyled>
                            </>
                        )}
                    </PropChange>
                </RowContainer>
                <RowContainer >
                    <PropName>Image</PropName>
                    <>
                        <LabelAsButton htmlFor="image" medium>
                            Upload
                        </LabelAsButton>
                        <InputStyled
                            style={{display:"none"}}
                            ref={inputRef}
                            type="file"
                            id="image"
                            name="avatar"
                            accept=".jpg, .png"
                            onChange={fileChanges}
                        />
                    </>
                </RowContainer>
            </PropertiesContainer>
        </SettingsContainer>
    </div>)
}

export default Settings