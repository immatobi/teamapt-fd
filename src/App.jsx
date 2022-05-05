import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import loader from './components/helpers/loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorUI from './components/layouts/globals/ErrorUI';

import DashboardLayout from './components/layouts/globals/Dashboard';

import ResourceState from './context/resource/resourceState';
import UserState from './context/user/userState';

const Login = React.lazy(() => import('./components/pages/auth/Login'));
const Register = React.lazy(() => import('./components/pages/auth/Register'));

const DashHome = React.lazy(() => import('./components/pages/dashboard/Home'));
const Verification = React.lazy(() => import('./components/pages/dashboard/settings/verification/Verification'));


const App = () => {

  const errorHandler = (err, info) => {
    console.log(err, 'logged error');
    console.log(info, 'logged error info');
  }

  

  return(

    <Router>

        <UserState>

            <ResourceState>

                <Suspense fallback={loader.MainLoader()}>

                    <ErrorBoundary FallbackComponent={ErrorUI} onReset={() => { window.location.reload() }} onError={errorHandler}>

                        <Routes>

                            <Route path='/' element={<Login />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />

                            <Route path='/dashboard' element={<DashboardLayout Component={DashHome} pageTitle="Dashboard" showBack={false} collapsed={true} />} />

                            {/* settings */}
                            <Route path='/dashboard/settings/verification' element={<DashboardLayout Component={Verification} pageTitle="Verification" showBack={true} collapsed={true} />} />

                        </Routes>

                    </ErrorBoundary>

                </Suspense>

            </ResourceState>

        </UserState>

    </Router>

  )

}

export default App;