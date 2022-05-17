import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({ isFixed, backgroundColor, doScroll }) => {


    useEffect(() => {

    }, []);



    // this: used in pushing
    return (
        <>
         
            <header id="header" className={`header header-nav ${isFixed && isFixed === true ? 'stick' : 'bg-white blocked flat'}`} style={{ backgroundColor: backgroundColor ? backgroundColor : '' }}>
                
                <div className="nav-body">
                
                    <div className="navigation bg-brandcox-firefly">
                        <div className="container-fluid">

                            <nav className="main-nav navbar navbar-right navbar-expand-md">

                                <Link to="/" className="navbar-brand logo"><img src="../../../images/assets/img@logo.svg" alt="" /></Link>
                            
                                <div className="ml-auto d-flex align-items-center ui-show-mobile-only">
                                    {/* <Link to="" className="sd-menu md-menu onblack"><span className={`fe fe-menu fs-30`}></span></Link> */}
                                    <Link to="" className="nav-cld">
                                        <div className='cld-icon ui-text-center'>
                                            <img src="../../../images/assets/icon@cld.svg" alt="cld-icon" />
                                        </div>
                                        <div className='cld-text ui-line-height-small pdl mrgl'>
                                            <p className='onwhite font-interbold fs-17'>Day 1</p>
                                            <span className='text-muted font-inter fs-13'>of 5</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                                    <span className="menu_toggle">
                                    <span className="hamburger">
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                    <span className="hamburger-cross">
                                        <span />
                                        <span />
                                    </span>
                                    </span>
                                </button> */}
                            
                            <div id="navbar-collapse" className="navbar-collapse collapse">

                                {/* Right */}
                                <ul class="nav navbar-nav right-nav ml-auto ui-hide-mobile-only">
                                    <li className="nav-item link">
                                        <Link to="" className="nav-cld">
                                            <div className='cld-icon ui-text-center'>
                                                <img src="../../../images/assets/icon@cld.svg" alt="cld-icon" />
                                            </div>
                                            <div className='cld-text ui-line-height-small pdl mrgl'>
                                                <p className='onwhite font-interbold fs-17'>Day 1</p>
                                                <span className='text-muted font-inter fs-13'>of 5</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                                
                            </div>
                            </nav>
                        </div>
                    </div>
                    
                </div>

                {/* {
                    !isFixed &&
                    <div className="ui-line bg-silverlight"></div>
                } */}
            
            </header>
            
        </>
    )
}

export default TopBar;