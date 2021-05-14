import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {ButtonStyled, Container, H1Styled, InputStyled, LinkStyled} from '../common/StylesComponent';
import {
    PropChange,
    PropertiesContainer,
    PropName,
    SettingsContainer,
} from './style/SettingsComponentStyle';
import {FaImage} from "react-icons/all";
import {SendData, SendFile} from "../../Connectors/dataProvider";
import {useReduxState} from "../MultyUsed/CustomHooks/useReduxState";
import {useDispatch} from "react-redux";
import {profileActions} from "../../Redux/Profile";
import {ROUTES, USER_FIELDS} from "../../constants";

const ChangeComponent = ({value, valueName, setChangeField, area = false}) => {
    const [data, setData] = useState(value);
    const {profile, auth} = useReduxState()
    const dispatcher = useDispatch()
    const localFieldChange = (fieldName, value) => {
        console.log({...profile, name: {...profile.name, first: value}})
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
    return (<>
        {
            area
                ?
                <textarea value={data} onChange={(e) => {
                    setData(e.target.value)
                }}/>
                :
                <InputStyled value={data} onChange={(e) => {
                    setData(e.target.value)
                }}/>
        }
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
    </>)
}

const Settings = ({setUser}) => {
    const {auth, profile} = useReduxState()
    const [file, setFile] = useState();

    const [changeField, setChangeField] = useState({});

    const {name, desc} = profile;

    const fileChanges = (e) => {
        e.preventDefault();
        console.log(e.target.files[0])
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
                console.log(response)
                setUser(s => ({...s, image: response.img}))
                alert("The file is successfully uploaded");
            }).catch((error) => {
            console.log("err", error)
        });
    }, [file])

    return (
        <>
            <SettingsContainer>
                <H1Styled>Personal information</H1Styled>
                <PropertiesContainer>
                    <Container>
                        <PropName>First name</PropName>
                        <PropChange>
                            {changeField?.[USER_FIELDS.firstName]
                                ?
                                <ChangeComponent setChangeField={setChangeField} value={name.first}
                                                 valueName={USER_FIELDS.firstName}/>
                                :
                                <>
                                    <b>{name?.first}&nbsp;</b>
                                    <LinkStyled onClick={() => {
                                        setChangeField({[USER_FIELDS.firstName]: true})
                                    }}>change</LinkStyled>
                                </>
                            }

                        </PropChange>
                    </Container>
                    <Container>
                        <PropName>Last name</PropName>
                        <PropChange>
                            {changeField?.[USER_FIELDS.lastName]
                                ?
                                <ChangeComponent setChangeField={setChangeField} value={name.last}
                                                 valueName={USER_FIELDS.lastName}/>
                                :
                                <>
                                    <b>{name?.last}&nbsp;</b>
                                    <LinkStyled onClick={() => {
                                        setChangeField({[USER_FIELDS.lastName]: true})
                                    }}>change</LinkStyled>
                                </>
                            }
                        </PropChange>
                    </Container>
                    <Container>
                        <PropName>Description</PropName>
                        <PropChange wide>
                            {changeField?.[USER_FIELDS.desc]
                                ?
                                <ChangeComponent setChangeField={setChangeField} area value={desc}
                                                 valueName={USER_FIELDS.desc}/>
                                :
                                <>
                                    <b>Description&nbsp;</b>
                                    <LinkStyled onClick={() => {
                                        setChangeField({[USER_FIELDS.desc]: true})
                                    }}>change</LinkStyled>
                                </>
                            }
                        </PropChange>
                    </Container>
                    <Container>
                        <PropName>Password</PropName>
                        <PropChange>
                            {
                                changeField?.[USER_FIELDS.password]
                                    ?
                                    <ChangeComponent setChangeField={setChangeField}
                                                     valueName={USER_FIELDS.password}/>
                                    :
                                    <>
                                        <ButtonStyled secondary onClick={() => {
                                            setChangeField({[USER_FIELDS.password]: true})
                                        }}>Change Password</ButtonStyled>
                                    </>
                            }
                        </PropChange>
                    </Container>
                    <Container>
                        <PropName>Image</PropName>
                        <form onSubmit={onFileSubmit}>
                            <input type="file" name="avatar" onChange={fileChanges}/>
                            <InputStyled type={"submit"}/>
                        </form>
                    </Container>
                </PropertiesContainer>
            </SettingsContainer>
        </>
    );
};
Settings.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
};
Settings.defaultProps = {
    name: 'John Doe',
    email: 'test@test.com',
};

export default Settings;
