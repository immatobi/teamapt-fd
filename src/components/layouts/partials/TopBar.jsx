import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'

import storage from '../../helpers/storage'
import UserContext from '../../../context/user/userContext'
import Toast from '../../layouts/partials/Toast'

const TopBar = ({ isFixed, pageTitle, showBack, barType, collapsed, barCollapsed, expandFunc }) => {

    const history = useNavigate();

    const userContext = useContext(UserContext)

    const [showPanel, setShowPanel] = useState(false);
    const [icon, setIcon] = useState('menu')

    const [toast, setToast] = useState({
        type: 'success',
        show: false,
        message: '',
        title: '',
        position: 'top-right'
    })

    useEffect(() => {

    }, [])

    const toggleToast = (e) => {
        if(e) e.preventDefault();
        setToast({ ...toast, show: !toast.show });
    }

    const config = {
        headers: {
            ContentType: 'application/json',
            lg: "en",
            ch: "web"
        }
            
    }

    const togglePanel = (e) => {
        if(e) e.preventDefault();
        setShowPanel(!showPanel);
    }

    const back = (e) => {
        if(e) e.preventDefault();
        history.goBack();
    }

    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        history.push('/');

        await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/logout`,{}, config);
    }

    const openSidebar = (e) => {
        e.preventDefault();
        const sd = document.querySelector('.ui-sidebar');
        
        if(sd){
            if(sd.classList.contains('pull-icons')){
                sd.classList.remove('pull-icons');
                setIcon('menu')
            }else{
                sd.classList.add('pull-icons');
                setIcon('x')
            }
        }

      }

      const expandSideBar = (e) => {

        if(e) { e.preventDefault() }
        expandFunc(e);

    }

    return (

        <>

            <Toast 
            show={toast.show} 
            title={toast.title} 
            message={toast.message} 
            position={toast.position}
            type={toast.type}
            close={toggleToast} />

            <div id="ui-dashboard-topbar" className={`ui-dashboard-topbar ${ collapsed && collapsed === true ? 'sdbr--cllps' : 'sdbr--open' } ${ isFixed ? 'stick' : '' }`}>

                {
                    collapsed && collapsed === true &&
                    <div className='ui-hide-mobile-only pdr2'>
                        {
                            barCollapsed &&
                            <Link to="" onClick={(e) => expandSideBar(e)} className="">
                                <span style={{ position: 'relative', top: '3px' }} className="fe fe-menu fs-18 brandcc-purple"></span>
                            </Link>
                        }
                        {
                            !barCollapsed &&
                            <Link to="" onClick={(e) => expandSideBar(e)} className="">
                                <span style={{ position: 'relative', top: '3px' }} className="fe fe-x fs-18 brandcc-red"></span>
                            </Link>
                        }
                        
                    </div>
                }

                {
                    showBack && 
                    <Link to="" className="pdr2" onClick={(e) => back(e)}>
                        <span style={{ position: 'relative', top: '3px' }} className="fe fe-chevron-left fs-18 brandcc-lblue"></span>
                    </Link>
                }

                <h1 className="page-title font-matterbold onblack">{ pageTitle ? pageTitle : 'Home'}</h1>

                <div className="options">

                
                    <ul className="ui-topbar-nav">

                        <li className='pdr2'>
                            <Link to="/dashboard/talents/search-talents">
                                <span style={{position: 'relative', left: '0', top: '3px', color: '#0222C1'}} className='tma-search '>
                                    <span className='path1 fs-16'></span>
                                    <span className='path2 fs-16'></span>
                                </span>
                            </Link>
                        </li>

                        <li className='ui-hide-mobile-only'>
                            <Link to="" className="topbar-dp">
                                {
                                    !userContext.loading && userContext.user.dp &&
                                    <img src={userContext.user.dp} alt="dp"/>
                                }
                                {
                                    !userContext.loading && userContext.user.dp && userContext.user.dp === '' &&
                                    <img src="../../../images/assets/avatar.svg" alt="dp"/>
                                }
                                {
                                    !userContext.loading && !userContext.user.dp &&
                                    <img src="../../../images/assets/avatar.svg" alt="dp"/>
                                }
                                {
                                    userContext.loading &&
                                    <img src="../../../images/assets/avatar.svg" alt="dp"/>
                                }

                            </Link>

                            <div className="ui-topbar-drop">

                                <ul>
                                    <li>
                                        {/* <Link to={`/dashboard/${userContext.user.isSuper ? 'account' : 'manager/account'}`} className="font-matterregular fs-14">Account</Link> */}
                                    </li>

                                    <li>
                                        <Link to="" onClick={(e) => logout(e)} className="font-matterregular fs-14">Logout</Link>
                                    </li>
                                </ul>

                            </div>
                        </li>

                        <li className="pdl1 ui-show-mobile-only">
                            <Link to="" onClick={(e) => openSidebar(e)} className="sd-menu brandcc-red" style={{position: 'relative', top: '5px'}}><span className={`fe fe-${icon} fs-23`}></span></Link>
                        </li>

                    </ul>

                </div>

            </div>
        

        </>

    )

}

export default TopBar;