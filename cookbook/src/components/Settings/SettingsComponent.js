import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {
    ButtonAsLinkStyled,
    ButtonStyled,
    Container,
    H1Styled,
    InputStyled,
    LabelAsButton,
    LinkStyled,

} from '../common/StylesComponent';
import {
    PropChange,
    PropertiesContainer,
    PropName,
    SettingsContainer,
    ButtonsContainer, RowContainer, TextAreaStyled
} from './style/SettingsComponentStyle';
import {SendData, SendFile} from "../../Connectors/dataProvider";
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {useDispatch} from "react-redux";
import {profileActions} from "../../Redux/Profile";
import {ROUTES, USER_FIELDS} from "../../constants";

const ChangeComponent = ({value, valueName, setChangeField, type, area = false}) => {
    const [data, setData] = useState(value);
    const [secondPassword, setSecondPassword] = useState(value);
    const {profile, auth} = useReduxState()
    const dispatcher = useDispatch()
    const localFieldChange = (fieldName, value) => {
        if (fieldName === USER_FIELDS.firstName) {
            const out = profile?.name?.first
            dispatcher(profileActions.setProfile({...profile, name: {...profile.name, first: value}}))
            return out
        }
        if (fieldName === USER_FIELDS.lastName) {
            const out = profile?.name?.last
            dispatcher(profileActions.setProfile({...profile, name: {...profile.name, last: value}}))
            return out
        }
        if (fieldName === USER_FIELDS.desc) {
            const out = profile?.desc
            dispatcher(profileActions.setProfile({...profile, desc: value}))
            return out
        }
    }
    const remoteFieldChange = async (fieldName, value) => {
        const response = await SendData(ROUTES.CHANGE_ACC,
            {id: profile._id, field: fieldName, value: value}, auth);
        if (!response.success) {
            alert("Smth went wrong")
        }
        return response
    }
    return (<Container vertical>
        {
            area &&
            <TextAreaStyled
                value={data}
                onChange={(e) => {
                    setData(e.target.value)
                }}
                cols={20}
            />
        }
        {
            type === "password"
            &&
            <Container vertical gap={"5px"}>
                <InputStyled type={type || "text"} placeholder={"Enter new password..."} value={data} onChange={(e) => {
                    setData(e.target.value)
                }}/>
                <InputStyled type={type || "text"} placeholder={"Repeat new password..."} value={secondPassword}
                             onChange={(e) => {
                                 setSecondPassword(e.target.value)
                             }}/>
            </Container>
        }
        {!type && !area &&
        <InputStyled type={type || "text"} value={data} onChange={(e) => {
            setData(e.target.value)
        }}/>
        }

        <Container justifyContent={"space-around"} gap={"5px"} margin={"10px 0 0 0"}>
            <ButtonStyled tiny onClick={() => {
                const oldValue = localFieldChange(valueName, data)
                remoteFieldChange(valueName, data).then(response => {
                    if (!response.success) {
                        localFieldChange(valueName, oldValue)
                    }
                })
                setChangeField({})
            }}>Save</ButtonStyled>
            <ButtonStyled margin={"5px"} tiny onClick={() => {
                setChangeField({})
            }}>Cancel</ButtonStyled>
        </Container>
    </Container>)
}


ChangeComponent.propTypes =
    {
        children: PropTypes.node
    }
;
const Settings = (
    {
        setUser
    }
    ) => {
        const {auth, profile} = useReduxState()
        const [file, setFile] = useState();

        const [changeField, setChangeField] = useState({});

        const {name, desc} = profile;

        const fileChanges = (e) => {
            e.preventDefault();
            setFile(e.target.files[0])
        }

        const onFileSubmit = useCallback((e) => {
            e.preventDefault();
            if (!auth) {
                alert("You are not authorizated")
                return;
            }
            if (!file) {
                alert("You didn't select any file")
                return;
            }

            const formData = new FormData();
            formData.append('avatar', file);
            formData.append('id', profile._id);

            SendFile('/profile', formData, auth)
                .then((response) => {
                    setUser(s => ({...s, image: response.img}))
                }).catch((error) => {
                console.log("err", error)
            });
            setFile(null)
        }, [file])

        return (
            <>
                <SettingsContainer>
                    <H1Styled>Personal information</H1Styled>
                    <PropertiesContainer>
                        <RowContainer>
                            <PropName>First name</PropName>
                            <PropChange>
                                {changeField?.[USER_FIELDS.firstName]
                                    ?
                                    <ChangeComponent setChangeField={setChangeField} value={name.first}
                                                     valueName={USER_FIELDS.firstName}/>
                                    :
                                    <>
                                        <b>{name?.first}&nbsp;</b>
                                        <ButtonAsLinkStyled onClick={() => {
                                            setChangeField({[USER_FIELDS.firstName]: true})
                                        }}>change</ButtonAsLinkStyled>
                                    </>
                                }

                            </PropChange>
                        </RowContainer>
                        <RowContainer>
                            <PropName>Last name</PropName>
                            <PropChange>
                                {changeField?.[USER_FIELDS.lastName]
                                    ?
                                    <ChangeComponent setChangeField={setChangeField} value={name.last}
                                                     valueName={USER_FIELDS.lastName}/>
                                    :
                                    <>
                                        <b>{name?.last}&nbsp;</b>
                                        <ButtonAsLinkStyled onClick={() => {
                                            setChangeField({[USER_FIELDS.lastName]: true})
                                        }}>change</ButtonAsLinkStyled>
                                    </>
                                }
                            </PropChange>
                        </RowContainer>
                        <RowContainer>
                            <PropName>Description</PropName>
                            <PropChange>
                                {changeField?.[USER_FIELDS.desc]
                                    ?
                                    <ChangeComponent setChangeField={setChangeField} area value={desc}
                                                     valueName={USER_FIELDS.desc}/>
                                    :
                                    <>
                                        <b>*Description*&nbsp;</b>
                                        <ButtonAsLinkStyled onClick={() => {
                                            setChangeField({[USER_FIELDS.desc]: true})
                                        }}>change</ButtonAsLinkStyled>
                                    </>
                                }
                            </PropChange>
                        </RowContainer>
                        <RowContainer>
                            <PropName>Password</PropName>
                            <PropChange>
                                {
                                    changeField?.[USER_FIELDS.password]
                                        ?
                                        <ChangeComponent
                                            type="password"
                                            setChangeField={setChangeField}
                                            valueName={USER_FIELDS.password}/>
                                        :
                                        <>
                                            <ButtonStyled
                                                medium
                                                secondary
                                                onClick={() => {
                                                    setChangeField({[USER_FIELDS.password]: true})
                                                }}>
                                                Change Password
                                            </ButtonStyled>
                                        </>
                                }
                            </PropChange>
                        </RowContainer>
                        <RowContainer>
                            <PropName>Image</PropName>
                            {!file &&
                            <>
                                <LabelAsButton htmlFor={"image"} medium light>
                                    Upload
                                </LabelAsButton>
                                <InputStyled hide type="file" id={"image"} name="avatar" onChange={fileChanges}/>
                            </>}
                            {file &&
                            <ButtonsContainer>
                                <ButtonStyled small light onClick={onFileSubmit}>
                                    Send
                                </ButtonStyled>
                                <ButtonStyled small light onClick={() => {
                                    setFile(null)
                                }}>
                                    Clear
                                </ButtonStyled>
                            </ButtonsContainer>
                            }

                        </RowContainer>
                    </PropertiesContainer>
                </SettingsContainer>
            </>
        );
    }
;
Settings.propTypes =
    {
        name: PropTypes.string,
        email
:
PropTypes.string,
}
;
Settings.defaultProps =
    {
        name: 'John Doe',
        email
:
'test@test.com',
}
;

export default Settings;
