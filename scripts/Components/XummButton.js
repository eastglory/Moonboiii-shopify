import React, {useState, useEffect} from 'react'
import LoginDialog from './LoginDialog'
import GridLoader from 'react-spinners/GridLoader'
import axios from 'axios'
import Qrcode from './QRCodeSvg'
import Cookies from 'js-cookie'


const XummButton = () => {
    const BASE_URL = 'https://api.moonboiii.com/api'
    const [loading, setLoading] = useState(false)
    const [uuid, setUuid] = useState(null);
    const [qrUrl, setQrUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [openLogin, setOpenLogin] = useState(false)
    const [open, setOpen] = useState(false)   


    // const profile = Cookies.get('wallet13')? JSON.parse(Cookies.get('wallet13')): null
    const profile = localStorage.getItem('wallet13')? JSON.parse(localStorage.getItem('wallet13')): null
    
   
    useEffect(() => {
        let timer = null 
        let isRunning = false
        let counter = 150  
        if(openLogin) {
            timer = setInterval(async () => {
                if(isRunning) return 
                isRunning = true
                try {
                    const res = await axios.get(`${BASE_URL}/account/login/${uuid}`)
                    const ret = res?.data;
                    if(ret?.profile) { 
                        const profile = ret.profile
                        setOpenLogin(false)
                        localStorage.setItem('temp',JSON.stringify({
                            status: true,
                            ...profile
                        }))
                        if(profile?.user){
                            document.getElementById('CustomerEmail').value = profile?.user.email
                            document.getElementById('CustomerPassword').value = profile?.user.password
                            document.getElementById('customer_login').submit()
                        } 
                        else {
                            window.location.href='https://moonboiii.com/account/register'
                        }

                        return
                    }
                } catch(e){
                    alert(e)
                }
                setLoading(false)

                isRunning = false
                counter--
                if(counter <= 0) {
                    setLoading(false)
                    setOpenLogin(false)
                }

            }, 2000)
        }
        return () => {
            if (timer) {
                clearInterval(timer)
            }
        }
    }, [openLogin, uuid])

    const handleLogin = async () => {

        if(!profile?.status) {

            setLoading(true)
            try{
                const res = await axios.post(`${BASE_URL}/account/login`)
                if(res.status === 200) {
                    const uuid = res.data.data.uuid
                    const qrLink = res.data.data.qrUrl
                    const nextLink = res.data.data.next
    
                    setUuid(uuid)
                    setQrUrl(qrLink)
                    setNextUrl(nextLink)
                    setOpenLogin(true)
    
                }
            } catch(e) {
                alert(e)
                setLoading(false)
            }
        }
        else {
            setOpen(!open)
        }
    }

    const handleLogOut = async () => {
        setLoading(true);
        try {
            const res = await axios.delete(`${BASE_URL}/account/logout/${profile?.account}/${profile?.xuuid}`, {headers: {'x-access-token': profile?.token}});
            if (res.status === 200) {
                localStorage.removeItem('temp')
                window.location.href='https://moonboiii.com/account/logout'
            }
        } catch(err) {
        }
        setOpen(false)

        setLoading(false);
    }

    const handleLoginClose = async () => { 
        setLoading(false) 
        setOpenLogin(false)
        try {
            const res = await axios.delete(`${BASE_URL}/account/cancellogin/${uuid}`)
            if(res.status === 200) {
                setUuid(null);
            }
        } catch(e) {
            alert(e)
        }

        setUuid(null)
    }

    const handleAccount  = () => {
        window.location.href = 'https://moonboiii.com/account/'
    }

    const handleRewardButton = () => {
        window.location.href = 'https://moonboiii.com/pages/holder-hub/'
    }
    
    return (
        <div style={{
            position: 'relative',
            display: 'inline-block',
            
        }}>
            <button 
                type="button" 
                onClick={handleLogin}
                style={{
                    backgroundColor: '#fd5b2a',
                    border: '3px solid white',
                    borderRadius: '22px',
                    padding: '10px'
                }}
            >
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }} 
                >
                {
                    loading ? (
                        <GridLoader 
                            loading={true}
                            color='white'
                            size={7}
                            cssOverride={{
                                marginRight: '8px'
                            }}
                        />
                    ) : ( profile?.status?
                            <i 
                                className="fas fa-circle-user"
                                style={{
                                    color: 'white',
                                    fontSize: '35px',
                                    marginRight: '8px'
                                }}
                            ></i> :
                            <Qrcode  />

                        
                    )
                }
                {profile?.status ? 
                    (
                        <span 
                        style={{
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >MY ACCOUNT</span>
                    ) : (
                        <div  
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <span 
                                style={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginBottom: '-3px'
                                }}
                            >Sign In with</span>
                            <span 
                                className="login-title text-white"
                                style={{
                                    fontSize: '17px',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}
                            >XUMM</span>
                        </div>
                    )
                }
                
                </div>
            </button>
            {
                open ? (
                    <div 
                        style={{
                            backgroundColor:'#fd5b2a',
                            borderRadius: '13px',
                            padding:'10px 20px 10px 20px',
                            position: 'absolute',
                            right: '0px',
                            zIndex: 100,
                        }}
                    >
                        <ul>
                            <li>
                                <span style={{color: 'white',}}>{profile?.account.slice(0,20) + '...'}</span>
                            </li>
                            <li>
                                <button
                                    style={{
                                        backgroundColor: 'white',
                                        borderColor: 'white',
                                        borderRadius: '12px',
                                        margin: '3px',
                                        width: '175px',
                                    }}
                                    onClick={handleAccount}
                                >  
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: '0px 10px'
                                        }}
                                    >
                                        <i 
                                            className="fas fa-address-card"
                                            style={{
                                                color: '#fd5b2a',
                                                fontSize: '30px',
                                                marginRight: '8px'
                                            }}
                                        ></i>
                                        <span 
                                            style={{
                                                fontSize: '13px', 
                                                color: 'black',
                                                whiteSpace: 'nowrap',
                                                textAlign: 'center',
                                                flexGrow: 1
                                            }}
                                        >MY PROFILE</span>
                                    </div>

                                </button>
                            </li>
                            <li>
                                <button
                                    style={{
                                        backgroundColor: 'white',
                                        borderColor: 'white',
                                        borderRadius: '12px',
                                        margin: '3px',
                                        width: '175px',
                                    }}
                                    onClick={handleRewardButton}
                                >  
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: '0px 10px'
                                        }}
                                    >
                                        <i 
                                            className="fas fa-gift"
                                            style={{
                                                color: '#fd5b2a',
                                                fontSize: '30px',
                                                marginRight: '8px'
                                            }}
                                        ></i>
                                        <span 
                                            style={{
                                                fontSize: '13px', 
                                                color: 'black',
                                                whiteSpace: 'nowrap',
                                                textAlign: 'center',
                                                flexGrow: 1
                                            }}
                                        >MY REWARD</span>
                                    </div>

                                </button>
                            </li>
                            <li>
                                <button
                                    style={{
                                        backgroundColor: 'red',
                                        borderColor: 'red',
                                        borderRadius: '12px',
                                        margin: '3px',
                                        width: '175px',
                                    }}
                                    onClick={handleLogOut}
                                >  
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: '0px 10px'
                                        }}
                                    >
                                        <i 
                                            className="fas fa-right-from-bracket"
                                            style={{
                                                color: 'white',
                                                fontSize: '30px',
                                                marginRight: '8px'
                                            }}
                                        ></i>
                                        <span 
                                            style={{
                                                fontSize: '13px', 
                                                color: 'white',
                                                whiteSpace: 'nowrap',
                                                textAlign: 'center',
                                                flexGrow: 1
                                            }}
                                        >LOGOUT</span>
                                    </div>

                                </button>
                            </li>
                        </ul>
                    </div>
                ) : <></>
            }
            <LoginDialog
                open={openLogin}
                handleClose={handleLoginClose}
                qrUrl={qrUrl}
                nextUrl={nextUrl}  
            />
        </div>
    )
}

export default XummButton