import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DayPicker from './DayPicker'
import Tooltip from 'react-simple-tooltip'
// import { format } from 'date-fns';
// // import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';
// import {DatePicker} from 'dropdown-date-picker'


const RegisterForm = () => {

    const [userName, setUserName] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [isValidEmail, setValidEmail] = useState(true)
    const [account, setAccount] = useState('')
    const [uuid, setUuid] = useState('')
    const [dob, setDob] = useState('')

    const BASE_URL = 'https://api.moonboiii.com/api'

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("temp"))
        if(!profile) {
            window.location.href = 'https://moonboiii.com/account' 
        }
        setUserName(profile?.user?.userName)
        setFirstName(profile?.user?.first_name)
        setLastName(profile?.user?.last_name)
        setDob(profile?.user?.dob)
        setEmail(profile?.user?.email)
        setAccount(profile?.account)
        setUuid(profile?.xuuid)
    }, [])

    const handleEmailInput = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const handleSubmit = async () => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (email && email.match(regex)){
            setValidEmail(true);
        } else {
            setValidEmail(false);
            return;
        }
        if (account){
            const res = await axios.post(
                `${BASE_URL}/account/register`, 
                {
                    userName,
                    first_name,
                    last_name,
                    dob,
                    email, 
                    account
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Xumm-Uuid": uuid
                    }
                } 
            )

            if(res.status === 200) {
                

                document.getElementById('CustomerEmail').value = res?.data?.email
                document.getElementById('CustomerPassword').value = res?.data?.password
                document.getElementById('customer_login').submit()
                const profile = JSON.parse(localStorage.getItem("temp"))
                profile.user = res.data
                localStorage.setItem('temp', JSON.stringify(profile))

            } 

            else {
                alert("Profile creation failed!!")
            }
        } else {
            window.location.href = 'https://moonboiii.com/account/'
        }
    }

    
    return (
        <>
            <span>Username
                <Tooltip 
                    content="User's display name" 
                    placement='right' 
                    style={{whiteSpace: 'nowrap'}} 
                    padding={8} radius={3}
                >
                    <i className="fas fa-question-circle"></i>
                </Tooltip>
            </span> 
            <input type="text" placeholder='Username' value={userName} onChange={e => setUserName(e.target.value)}/>
            <span>First Name
                <Tooltip 
                    content="User's first name" 
                    placement='right' 
                    style={{whiteSpace: 'nowrap'}} 
                    padding={8} radius={3}
                >
                    <i className="fas fa-question-circle"></i>
                </Tooltip>
            </span> 
            <input type="text" placeholder='First Name' value={first_name} onChange={e => setFirstName(e.target.value)} />
            <span>Last Name
                <Tooltip 
                    content="User's last name" 
                    placement='right' 
                    style={{whiteSpace: 'nowrap'}} 
                    padding={8} radius={3}
                >
                    <i className="fas fa-question-circle"></i>
                </Tooltip>
            </span> 
            <input type="text" placeholder='Last Name' value={last_name} onChange={e => setLastName(e.target.value)}/>
            {/* <input type='date' placeholder="Date of birth" value={dob} onChange={e => setDob(e.target.value)} /> */}
            <span>Date of Birth
                <Tooltip 
                    content="This field is for age verification" 
                    placement='right' 
                    style={{whiteSpace: 'nowrap'}} 
                    padding={8} radius={3}
                >
                    <i className="fas fa-question-circle"></i>
                </Tooltip>
            </span> 
            <DayPicker dob={dob} setDob={setDob}/>
            <span>Email
                <Tooltip 
                    content="User's email address" 
                    placement='right' 
                    style={{whiteSpace: 'nowrap'}} 
                    padding={8} radius={3}
                >
                    <i className="fas fa-question-circle"></i>
                </Tooltip>
            </span> 
            <input 
                type="email"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="email"
                aria-required="true"
                placeholder="email address"
                aria-invalid="true" 
                value={email}
                onChange={handleEmailInput}
                />
            <span className="input-error-message" style={{visibility: isValidEmail? 'hidden' : 'visible'}}>
              <span>Please input valid email address.</span>
            </span>
            <p className="text-center">
              <button className="btn btn--full btn--primary btn--align-center " onClick={handleSubmit}><span>Submit</span></button>
            </p>

        </>
    )
}

export default RegisterForm