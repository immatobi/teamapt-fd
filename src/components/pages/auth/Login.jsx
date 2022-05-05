import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import storage from '../../helpers/storage'
import body from '../../helpers/body'

import Alert from '../../layouts/partials/Alert'
import Message from '../../layouts/partials/Message'

const Login = (props) => {

    const navigate = useNavigate()

    const [step, SetStep] = useState(0);
    const [timer, setTimer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [qLoading, setQLoading] = useState(false);
    const [pass, setPass] = useState('password');
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        code: ''
    });
    const [password, setPassword] = useState({
        new: '',
        confirm: ''
    });
    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    });

    useEffect(() => {
        SetStep(0)
    }, [])

    const showPass = (e) => {
        e.preventDefault();
        if(pass === 'password'){
            setPass('text');
        }else{
            setPass('password');
        }
    }

    const resetStep = (e) => {
        if(e) { e.preventDefault(); }
        SetStep(0)
    } 

    const toggleTimer = () => {

        setTimer(true);

        setTimeout(() => {
            setTimer(false)
        }, 1800000)

    } 

    const login = async (e) => {

        if(e) { e.preventDefault() }

        if(!loginData.email && !loginData.password){
            setAlert({...alert, type: "danger", show:true, message:'All fields are required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if(!loginData.email){
            setAlert({...alert, type: "danger", show:true, message:'Email is required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if(!loginData.password){
            setAlert({...alert, type: "danger", show:true, message:'Password is required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        } else{

            setLoading(true);

            await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/login`, {...loginData}, storage.getConfig())
            .then(async (resp) => {

                if(resp.data.error === false && resp.data.status === 200){

                    storage.saveCredentials(resp.data.token, resp.data.data._id);

                    if(resp.data.data.isUser && resp.data.data.isActive){

                        if(!resp.data.data.isSuper && !resp.data.data.isAdmin){

                            if(resp.data.data.passwordType === 'generated'){
                                SetStep(1);
                            }else{
                                navigate('/dashboard');
                            }
                            
                        }else{

                            setAlert({...alert, type: "danger", show:true, message:'Incorrect login details'})
                            setTimeout(()=> {
                                setAlert({...alert, show:false});
                            }, 5000)

                        }

                    }else{

                        setAlert({...alert, type: "danger", show:true, message:'Account currently inactive. Contact support'})
                        setTimeout(()=> {
                             setAlert({...alert, show:false});
                        }, 5000)

                    }
                    
                }

                if(resp.data.error === false && resp.data.status === 206){

                    if(resp.data.errors[0] === 'email verification is required'){

                        SetStep(3);
                        toggleTimer();

                    }

                }
 
                setLoading(false);

            }).catch((err) => {
            
                if(err.response.data.errors[0] === 'invalid credentials'){

                    setAlert({...alert, type: "danger", show:true, message:'Incorrect email or password'})
                    setTimeout(() => {
                        setAlert({...alert, show: false});
                    }, 5000)

                    setLoading(false);

                }else{

                    if(err.response.data.errors.length > 0){

                        setAlert({...alert, type: "danger", show:true, message:err.response.data.errors[0]})
                        setTimeout(()=> {
                            setAlert({...alert, show:false});
                        }, 5000)

                    }else{
                        setAlert({...alert, type: "danger", show:true, message:err.response.data.message})
                        setTimeout(()=> {
                            setAlert({...alert, show:false});
                        }, 5000)
                    }
                    
                }

                setLoading(false);
            
            });

        }
    }

    const loginWithCode = async (e) => {

        if(e) { e.preventDefault() }

        if(!loginData.code){
            setAlert({...alert, type: "danger", show:true, message:'Enter verification code'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else{

            setLoading(true);

            await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/login`, {...loginData}, storage.getConfig())
            .then(async (resp) => {

                if(resp.data.error === false && resp.data.status === 200){

                    storage.saveCredentials(resp.data.token, resp.data.data._id);

                    if(resp.data.data.isUser && resp.data.data.isActive){

                        if(!resp.data.data.isSuper && !resp.data.data.isAdmin){

                            if(resp.data.data.passwordType === 'generated'){
                                SetStep(1);
                            }else{
                                navigate('/dashboard');
                            }
                            
                        }else{

                            setAlert({...alert, type: "danger", show:true, message:'Incorrect login details'})
                            setTimeout(()=> {
                                setAlert({...alert, show:false});
                            }, 5000)

                        }

                    }else{

                        setAlert({...alert, type: "danger", show:true, message:'Account currently inactive. Contact support'})
                        setTimeout(()=> {
                             setAlert({...alert, show:false});
                        }, 5000)

                    }
                    
                }
 
                setLoading(false);

            }).catch((err) => {
            
                if(err.response.data.errors[0] === 'invalid credentials'){

                    setAlert({...alert, type: "danger", show:true, message:'Incorrect email or password'})
                    setTimeout(() => {
                        setAlert({...alert, show: false});
                    }, 5000)

                    setLoading(false);

                }else{

                    if(err.response.data.errors.length > 0){

                        setAlert({...alert, type: "danger", show:true, message:err.response.data.errors[0]})
                        setTimeout(()=> {
                            setAlert({...alert, show:false});
                        }, 5000)

                    }else{
                        setAlert({...alert, type: "danger", show:true, message:err.response.data.message})
                        setTimeout(()=> {
                            setAlert({...alert, show:false});
                        }, 5000)
                    }
                    
                }

                setLoading(false);
            
            });

        }
    }

    const changePassword = async (e) => {

        if(e) e.preventDefault();

        if(!password.new && !password.confirm){

            setAlert({...alert, type: "danger", show:true, message:'All fields are required'});
            setTimeout(()=> {
                setAlert({...alert, show:false});
            }, 5000)

        }else if(!password.new){

            setAlert({...alert, type: "danger", show:true, message:'Enter a new password'});
            setTimeout(()=> {
                setAlert({...alert, show:false});
            }, 5000)

        }else if(!password.confirm){

            setAlert({...alert, type: "danger", show:true, message:'Confirm your password'});
            setTimeout(()=> {
                setAlert({...alert, show:false});
            }, 5000)

        }else if(password.new !== password.confirm){

            setAlert({...alert, type: "danger", show:true, message:'Password does not match'});
            setTimeout(()=> {
                setAlert({...alert, show:false});
            }, 5000)

        }else{

            const data = {
                email: loginData.email,
                password: password.new
            }

            setLoading(true)
    
            await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/force-password`, {...data}, storage.getConfig())
            .then(async (resp) => {
                if(resp.data.error === false && resp.data.status === 200){
                    SetStep(2);
                }else{

                    setAlert({...alert, type: "danger", show:true, message:resp.data.errors[0]});
                    setTimeout(()=> {
                        setAlert({...alert, show:false});
                    }, 5000)
                    
                }

                setLoading(false)
        
            }).catch((err) => {
        
                if(err.response.data.errors.length > 0){

                    setAlert({...alert, type: "danger", show:true, message:err.response.data.errors[0]});
                    setTimeout(()=> {
                        setAlert({...alert, show:false});
                    }, 5000)

                }else{
                    setAlert({...alert, type: "danger", show:true, message:err.response.data.message});
                    setTimeout(()=> {
                        setAlert({...alert, show:false});
                    }, 5000)
                }

                setLoading(false);
        
            })


        }

    }

    const sendCode = async (e, type) => {

        if(e) e.preventDefault();

        const data = {
            email: loginData.email
        }

        setQLoading(true);

        await Axios.post(`${process.env.REACT_APP_AUTH_URL}/emails/send-${type}-code`, {...data}, storage.getConfig())
        .then(async (resp) => {

            if(resp.data.error === false && resp.data.status === 200){
                
                setAlert({...alert, type: "success", show:true, message: 'code sent successfully' });
                setTimeout(()=> {
                    setAlert({...alert, show:false});
                }, 5000)

                toggleTimer()

            }

            setQLoading(false)
    
        }).catch((err) => {
    
            if(err.response.data.errors.length > 0){

                setAlert({...alert, type: "danger", show:true, message:err.response.data.errors[0]});
                setTimeout(()=> {
                    setAlert({...alert, show:false});
                }, 5000)

            }else{
                setAlert({...alert, type: "danger", show:true, message:err.response.data.message});
                setTimeout(()=> {
                    setAlert({...alert, show:false});
                }, 5000)
            }

            setQLoading(false);
    
        })

    }

    return (
        <>
        
            <section className="hero hero-home ui-full-bg-norm bg-brandxp-dark" style={{ backgroundImage: 'url("../../images/assets/img@bg-01.svg")' }}>

                <div className="hero-inner lg top">

                    <div className='container'>

                        <div className='row'>

                            <div className='col-md-5 mx-auto'>

                                <form onSubmit={(e) => { e.preventDefault() }} className='auth-form form'>

                                    <div className="form-inner">

                                        <div className='form-box'>

                                            {
                                                step === 0 &&
                                                <>
                                                    <div className="auth-logo ui-text-center mrgb1">
                                                        <img className='ui-relative' style={{ left: '-11px' }} src="../../images/assets/logo-white.png" alt="logo" />
                                                    </div>

                                                    <p className='ui-text-center mrgb0 font-mattermedium brandxp-lp mrgb2 fs-18'>
                                                        Welcome back, login
                                                    </p>

                                                    <Alert type={alert.type} show={alert.show} message={alert.message} />

                                                    <div className='form-group form-row mrgb1'>

                                                        <div className='col'>
                                                            <input 
                                                            defaultValue={(e) => { setLoginData({ ...loginData, email: e.target.value }) }}
                                                            onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }}
                                                            type="email" className="form-control fs-14 lg on-black font-matterregular" 
                                                            placeholder="you@example.com" autoComplete='off' />
                                                        </div>

                                                    </div>

                                                    <div className='form-group form-row'>

                                                        <div className='col password-input lg'>
                                                            <Link onClick={(e) => showPass(e)} to="" className="eye shift">
                                                                <span className={`fe fe-${pass === 'password' ? 'eye' : 'x'} fs-22`} style={{ color: '#7863F2' }}></span>
                                                            </Link>
                                                            <input 
                                                            defaultValue={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}
                                                            onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}
                                                            type={pass} className="form-control fs-14 lg on-black font-matterregular" 
                                                            placeholder="Password" autoComplete='off' />
                                                        </div>

                                                    </div>

                                                    <div className='form-group mrgt2'>
                                                        <Link onClick={(e) => login(e)} to="/" className={`btn btn-block lg bg-brandxp-orange font-matterbold onwhite ${ loading ? 'disabled-lt' : '' }`}>
                                                            { loading ? <span className='xp-loader white sm'></span> : 'Log in' }
                                                        </Link>
                                                    </div>

                                                    <div className='ui-text-center mrgt1'>
                                                        <Link to="/forgot-password" className="font-mattermedium brandxp-teal fs-13">Can't login?</Link>
                                                    </div>

                                                    <div className='ui-text-center mrgt1 mrgb1'>
                                                        <Link to="/register" className="font-mattermedium brandxp-lp fs-13">New user? Create account</Link>
                                                    </div>
                                                </>
                                            }

                                            {
                                                step === 1 &&
                                                <>
                                                    <div className="auth-logo ui-text-center mrgb1">
                                                        <img className='ui-relative' style={{ left: '-11px' }} src="../../images/assets/logo-white.png" alt="logo" />
                                                    </div>

                                                    <p className='ui-text-center mrgb0 font-mattermedium brandxp-lp mrgb fs-18'>
                                                        Change your password
                                                    </p>

                                                    <p className='ui-text-center mrgb0 font-matterlight onwhite mrgb2 fs-15'>
                                                        You're required to change your password.
                                                    </p>

                                                    <Alert type={alert.type} show={alert.show} message={alert.message} />

                                                    <div className='form-group form-row mrgb1'>

                                                        <div className='col password-input lg'>
                                                            <Link onClick={(e) => showPass(e)} to="" className="eye shift">
                                                                <span className={`fe fe-${pass === 'password' ? 'eye' : 'x'} fs-22`} style={{ color: '#7863F2' }}></span>
                                                            </Link>
                                                            <input 
                                                            defaultValue={(e) => { setPassword({ ...password, new: e.target.value }) }}
                                                            onChange={(e) => { setPassword({ ...password, new: e.target.value }) }}
                                                            type={pass} className="form-control fs-14 lg on-black font-matterregular" 
                                                            placeholder="New password" autoComplete='off' />
                                                        </div>

                                                    </div>

                                                    <div className='form-group form-row'>

                                                        <div className='col password-input lg'>
                                                            <Link onClick={(e) => showPass(e)} to="" className="eye shift">
                                                                <span className={`fe fe-${pass === 'password' ? 'eye' : 'x'} fs-22`} style={{ color: '#7863F2' }}></span>
                                                            </Link>
                                                            <input 
                                                            defaultValue={(e) => { setPassword({ ...password, confirm: e.target.value }) }}
                                                            onChange={(e) => { setPassword({ ...password, confirm: e.target.value }) }}
                                                            type={pass} className="form-control fs-14 lg on-black font-matterregular" 
                                                            placeholder="Type password again" autoComplete='off' />
                                                        </div>

                                                    </div>

                                                    <div className='form-group mrgt2 mrgb2'>
                                                        <Link onClick={(e) => changePassword(e)} to="/" className={`btn btn-block lg bg-brandxp-orange font-matterbold onwhite ${ loading ? 'disabled-lt' : '' }`}>
                                                            { loading ? <span className='xp-loader white sm'></span> : 'Submit' }
                                                        </Link>
                                                    </div>
                                                </>
                                            }

                                            {
                                                step === 3 &&
                                                <>
                                                    <div className="auth-logo ui-text-center mrgb1">
                                                        <img className='ui-relative' style={{ left: '-11px' }} src="../../images/assets/logo-white.png" alt="logo" />
                                                    </div>

                                                    <p className='ui-text-center mrgb0 font-mattermedium brandxp-lp mrgb2 fs-18'>
                                                        Verify your account
                                                    </p>

                                                    <p className='ui-text-center mrgb0 font-matterlight onwhite mrgb2 fs-14'>
                                                        You're required to verify your email.
                                                    </p>

                                                    <Alert type={alert.type} show={alert.show} message={alert.message} />

                                                    <div className='form-group'>

                                                        <label className="font-matterregular brandxp-lp fs-13 mrgb0">Email code</label>

                                                        <div className='form-row'>

                                                            <div className='col-7'>
                                                                <input 
                                                                defaultValue={(e) => { setLoginData({ ...loginData, code: e.target.value }) }}
                                                                onChange={(e) => { setLoginData({ ...loginData, code: e.target.value }) }}
                                                                type="text" className="form-control fs-14 lg on-black font-matterregular" 
                                                                placeholder="0000" autoComplete='off' />
                                                            </div>

                                                            <div className='col-5'>
                                                                {
                                                                    qLoading &&
                                                                    <Link to="" className={`btn btn-block md ghost ghost-orange height-53 flexed font-matterregular disabled-lt`}>
                                                                        <span className='xp-loader sm white'></span>
                                                                    </Link>
                                                                }
                                                                {
                                                                    !qLoading &&
                                                                    <Link onClick={(e) => { sendCode(e, 'email') }} to="" className={`btn btn-block md ghost ghost-orange height-53 flexed font-matterregular ${ timer ? 'disabled-pt' : '' }`}>
                                                                        { timer ? <span id="timer" className='font-matterregular fs-14'>{ body.timer((60*30), "#timer") }</span> : "Send Code" }
                                                                    </Link>
                                                                }
                                                                
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className='form-group mrgt2 mrgb2'>
                                                        <Link onClick={(e) => loginWithCode(e)} to="/" className={`btn btn-block lg bg-brandxp-orange font-matterbold onwhite ${ loading ? 'disabled-lt' : '' }`}>
                                                            { loading ? <span className='xp-loader white sm'></span> : 'Verify Account' }
                                                        </Link>
                                                    </div>

                                                    <div className='ui-text-center mrgt1 mrgb2'>
                                                        <Link to="/login" className="font-mattermedium brandxp-lp fs-13">Try logging in again</Link>
                                                    </div>
                                                </>
                                            }

                                            {
                                                step === 2 &&
                                                <>

                                                    <Message 
                                                    title="Successful!" 
                                                    message="Your password has been changed successfully" 
                                                    action={resetStep}
                                                    status="success"
                                                    lottieSize={100}
                                                    loop={false}
                                                    actionType="action"
                                                    buttonText='Continue'
                                                    setBg={false}
                                                    />

                                                </>
                                            }

                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        
        </>
    )

}

export default Login;