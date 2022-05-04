import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import {Modal} from 'react-bootstrap';

import UserContext from '../../../context/user/userContext'

const SettingsModal = ({isShow, closeModal, modalTitle, flattened, stretch, slim}) => {

    const userContext = useContext(UserContext)

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        setStep(0)
    }, []);

    // functions
    const closeX = (e) => {
        if(e) e.preventDefault();
        setStep(0)
        closeModal();
    }

   
    return (

        <>

            <Modal show={isShow} 
                onHide={closeX} 
                size="sm"
                fade={false}
                keyboard={false}
                aria-labelledby="medium-modal"
                centered
                className={`custom-modal ${slim ? slim : ''} ${stretch ? 'stretched' : ''} ${flattened ? 'flat' : ''} lg`}
            >

                <Modal.Body>

                     <div className="d-flex">

                        <div className="dm--dbx ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/img@add-m.jpg")'}}>
                            <div className="dm--d">
                                <div>
                                    {/* <img src="../../../images/assets/i" alt="icon" /> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="dm--body ui-full-bg-norm" style={{backgroundImage: 'url("../../../images/assets/foopat.svg")'}}> */}
                        <div className="dm--body">

                            <div className="d-flex align-items-center mrgb1">
                                <h2 className="brandcc-purple mrgb0 font-matterbold fs-18">
                                    { modalTitle }
                                </h2>
                                <div className="ml-auto">
                                    <Link onClick={(e) => closeX(e)}  className="dot-link md ui-icon-animate">
                                        <span className="fe fe-x fs-12"></span>
                                    </Link>
                                </div>
                            </div> 

                            <div className="dm--ct mrgt2">

                                {
                                    step === 0 &&
                                    <></>

                                }

                            </div>                                  
                        </div>
                    </div> 
                     
                </Modal.Body>

            </Modal>
        
        
        </>

    )

}

export default SettingsModal;