import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../layouts/partials/Navbar'

const Login = (props) => {



    useEffect(() => {
        


    }, [])


    return (
        <>

            <Navbar isFixed={true} />
        
            <section className="hero hero-home ui-full-bg-norm" style={{ backgroundImage: 'url("../../images/assets/img@bg-02.jpg")' }}>

                <div className="hero-inner lg top ui-relative ui-text-center ui-hidden-y">

                    <img src="../../../images/assets/img@top-stars.png" alt="top-stars" className='top-stars' />

                    <img src="../../../images/assets/img@splash-light2.png" alt="splash-light" className='splash-light rotate' />

                    <div className='coin-box ui-text-center'>
                        <img src="../../../images/assets/img@coin-pot.png" alt="coin-pot"/>
                    </div>
                    
                    <img src="../../../images/assets/img@shiny.png" alt="shiny" className='shiny' />

                    <img src="../../../images/assets/icon@coin-left.svg" alt="coin-left" className='coin-left animated fastest fadeInUp bounce-fx delay' />
                    <img src="../../../images/assets/icon@coin-right.svg" alt="coin-right" className='coin-right animated fastest fadeInUp bounce-tx delay' />

                    

                    <div className='container'>

                        <div className='row'>

                            <div className='col-md-8 mx-auto ui-relative'>

                                <div className='ui-text-center mrgb1 caption-box'>

                                    <h1 className='ui-line-height-small mrgb animated fastest fadeInUp ui-hide-mobile-only'>
                                        <p className='mrgb0 onwhite font-poppinslight caption'>Unlock to</p>
                                        <p className='mrgb0 onwhite font-poppinsbold caption'>Power your dreams!</p>
                                    </h1>

                                    <h1 className='ui-line-height-small mrgb animated fastest fadeInUp ui-show-mobile-only'>
                                        <span className='mrgb0 onwhite font-poppinslight caption'>Unlock to </span>
                                        <span className='mrgb0 onwhite font-poppinsbold caption'>Power your dreams!</span>
                                    </h1>

                                    <div className='ui-line-height-large subcap-text animated fastest fadeInUp ui-hide-mobile-only'>
                                        <p className='mrgb0 onwhite font-inter fs-30'>Stand a chance to win</p>
                                        <p className='mrgb0 onwhite'>
                                            <span className='fs-30 font-interbold'>&#8358;3,000,000 </span>
                                            <span className='fs-30 font-inter'>everyday for the next 5 days</span>
                                        </p>
                                    </div>

                                    <div className='ui-line-height-large subcap-text animated fastest fadeInUp ui-show-mobile-only'>
                                        <span className='mrgb0 onwhite font-inter fs-31'>Stand a chance to win </span>
                                        <span className='fs-31 font-interbold onwhite'>&#8358;3,000,000 </span>
                                        <span className='fs-31 font-inter onwhite'> everyday for the next 5 days</span>
                                    </div>

                                </div>

                                <div className='row mrgb2'>
                                    <div className='col-md-6 mx-auto'>

                                        <div className='white-blob animated fastest fadeInUp'>

                                            <p className='font-interbold fs-16 mrgb1 mrgt onwhite ui-text-center'>🚀 How To Play</p>

                                                <div className='ui-line-height-x ui-text-left'>
                                                    <p className='font-inter fs-13 mrgb0 onwhite'>1. Guess the right combination of numbers</p>
                                                    <p className='mrgb0 onwhite'>
                                                        <span className='font-inter fs-13'>2. Win </span>
                                                        <span className='font-interbold fs-13'>N3,000,000 </span>
                                                        <span className='font-inter fs-13'>instantly</span>
                                                    </p>
                                                </div>

                                                <p className='font-inter fs-13 mrgb0 onwhite ui-text-left ui-line-height'>Sounds unbelievable? Well, guess right & see for yourself!</p>

                                                <div className='black-box mrgt1'>
                                                    <p className='fs-16 mrgb0'>💡</p>
                                                    <p className='font-inter fs-12 mrgb1 onwhite pdl ui-line-height-x mrgt ui-text-left'>Think well before you guess. You have only 2 attempts per day and even after you wi, you can come back the next day to try for another jackpot!</p>
                                                </div>
                                            
                                        </div>



                                    </div>
                                </div>

                                <div className='ui-text-center mrgt3 ui-relative'>

                                    <Link to="" className='btn lg hero-btn onwhite fixed animated fastest fadeInUp'>
                                        <span className='font-interbold onwhite fs-15 pdr2 pdl1'>Play The Game</span>
                                        <span className='fe fe-chevron-right onwhite fs-24 ui-relative' style={{ top: '5px' }}></span>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        
        </>
    )

}

export default Login;