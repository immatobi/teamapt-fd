import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import storage from '../../helpers/storage'

import Alert from '../../layouts/partials/Alert'
import Message from '../../layouts/partials/Message'
import DropDown from '../../layouts/partials/DropDown';

import ResourceContext from '../../../context/resource/resourceContext';

const Login = (props) => {

    const resourceContext = useContext(ResourceContext)

    const [step, SetStep] = useState(0);
    const [loading, setLoading] = useState();
    const [pass, setPass] = useState('password');
    const [selected, setSelected] = useState(false);
    const [regData, setRegData] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        phoneCode: '+234',
        callback: `${process.env.REACT_APP_BASE_URL}`,

    })
    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    });

    useEffect(() => {

        SetStep(0);

        resourceContext.getIpAddress();
        resourceContext.getCountries(9999);

    }, [])

    const getOptions = () => {

        const formatted = resourceContext.countries.filter((i) => (i.phoneCode !== undefined && i.flag !== undefined))

        const cp = formatted.map((i) => {
            let c = {
                value: i._id,
                label: i.name,
                left:  i.phoneCode,
                image: i.flag ? i.flag : '../../../../images/assets/c-avatar.svg'
            }
            return c;
        })
       
        return cp;
       
    }

    const setDefault = (code) => {

            if(!resourceContext.loading && resourceContext.countries.length > 0){

                const ct = resourceContext.countries.find((i) => i.code2 === code);
                const fm = {
                    value: ct._id,
                    label: ct.name,
                    left:  ct.phoneCode,
                    image: ct.flag ? ct.flag : '../../../images/assets/c-avatar.svg'
                }

                if(fm){
                    return fm;
                }else{
                    return 1
                }

            }else{
                return 1;
            }

            
    }
    
    const getSelected = (val) => {

       setRegData({...regData, phoneCode: val.left})
       setSelected(true);

    }

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

    const register = async (e) => {
        if(e) e.preventDefault()
        

        // set to the defaut config
        if(!selected){
            
            const cty = setDefault('NG');

            if(cty){
                regData.phoneCode = cty.left;
            } else{
                regData.phoneCode = '+234'
            }

        }

        if(!regData.phoneNumber && !regData.phoneCode && !regData.email && !regData.password){
            setAlert({...alert, type: "danger", show:true, message:'All fields are required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if (!regData.email) {
            setAlert({...alert, type: "danger", show:true, message:'Please enter your email'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else if (!regData.phoneNumber) {
            setAlert({...alert, type: "danger", show:true, message:'Phone number is required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        }else  if (!regData.phoneCode) {
            setAlert({...alert, type: "danger", show:true, message:'Phone code is required'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        } else  if (!regData.password) {
            setAlert({...alert, type: "danger", show:true, message:'Choose a password'})
            setTimeout(()=> {
                 setAlert({...alert, show:false});
            }, 5000)
        } else {
            setLoading(true);

            await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/register`,{...regData},  storage.getConfig())
            .then((resp) => {
                if(resp.data.error === false && resp.data.status === 200){

                    SetStep(1);
                }
                setLoading(false);
            }).catch((err) => {

                if(err.response.data.errors[0] === 'phone number already exist'){
                    setAlert({...alert, type: "danger", show:true, message:'Phone number is already rgistered'})
                    setTimeout(()=> {
                        setAlert({...alert, show:false});
                    }, 5000) 
                }else if(err.response.data.errors[0] === 'password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number'){
                    setAlert({...alert, type: "danger", show:true, message:'Password must have 8 charaters, 1 lowercase and 1 uppercase letters, 1 number and 1 special character'})
                    setTimeout(()=> {
                        setAlert({...alert, show:false});
                    }, 5000)
                } else {
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
            })
        }
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
                                                        Create account
                                                    </p>

                                                    <Alert type={alert.type} show={alert.show} message={alert.message} />

                                                    <div className='form-group form-row mrgb1'>

                                                        <div className='col'>
                                                            <input 
                                                            defaultValue={(e) => { setRegData({ ...regData, email: e.target.value }) }}
                                                            onChange={(e) => { setRegData({ ...regData, email: e.target.value }) }}
                                                            type="email" className="form-control fs-14 lg on-black font-matterregular" 
                                                            placeholder="Your email" autoComplete='off' />
                                                        </div>

                                                    </div>

                                                    <div className='form-row mrgb1'>

                                                        <div className='col'>
                                                            <input 
                                                            defaultValue={(e) => { setRegData({ ...regData, phoneNumber: e.target.value }) }}
                                                            onChange={(e) => { setRegData({ ...regData, phoneNumber: e.target.value }) }}
                                                            type="text" className="form-control fs-14 lg on-black font-matterregular" 
                                                            placeholder="Phone number" autoComplete='off' />
                                                        </div>

                                                        <div className='col-4'>
                                                            <DropDown 
                                                            options={getOptions} 
                                                            selected={getSelected} 
                                                            className="auth-drop font-matterregular"
                                                            placeholder={``} 
                                                            search={true}
                                                            displayImage={true}
                                                            displayControlLeft={false}
                                                            displayOptionLeft={false}
                                                            displayOptionLabel={true}
                                                            displayLabel={false}
                                                            defaultValue={setDefault('NG')}
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className='form-group form-row'>

                                                        <div className='col password-input lg'>
                                                            <Link onClick={(e) => showPass(e)} to="" className="eye shift">
                                                                <span className={`fe fe-${pass === 'password' ? 'eye' : 'x'} fs-22`} style={{ color: '#7863F2' }}></span>
                                                            </Link>
                                                            <input 
                                                            defaultValue={(e) => { setRegData({ ...regData, password: e.target.value }) }}
                                                            onChange={(e) => { setRegData({ ...regData, password: e.target.value }) }}
                                                            type={pass} className="form-control fs-14 lg on-black font-matterregular" 
                                                            placeholder="Password" autoComplete='off' />
                                                        </div>

                                                    </div>

                                                    <div className='form-group mrgt2'>
                                                        <Link onClick={(e) => register(e)} to="/" className={`btn btn-block lg bg-brandxp-orange font-matterbold onwhite ${ loading ? 'disabled-lt' : '' }`}>
                                                            { loading ? <span className='xp-loader white sm'></span> : 'Register' }
                                                        </Link>
                                                    </div>

                                                    <div className='ui-text-center mrgt1 mrgb1'>
                                                        <Link to="/login" className="font-mattermedium brandxp-lp fs-13">Login to your account</Link>
                                                    </div>
                                                </>
                                            }

                                            {
                                                step === 1 &&
                                                <>

                                                    <Message 
                                                    title="Successful!" 
                                                    message="Your account has been created successfully" 
                                                    action={'/login'}
                                                    status="success"
                                                    lottieSize={130}
                                                    loop={false}
                                                    actionType="url"
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