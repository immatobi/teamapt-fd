import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import loader from './components/helpers/loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorUI from './components/layouts/globals/ErrorUI';

const Home = React.lazy(() => import('./components/pages/Home'));


const App = () => {

  const errorHandler = (err, info) => {
    console.log(err, 'logged error');
    console.log(info, 'logged error info');
  }

  

  return(

    <Router>

        <Suspense fallback={loader.MainLoader()}>

            <ErrorBoundary FallbackComponent={ErrorUI} onReset={() => { window.location.reload() }} onError={errorHandler}>

                <Routes>

                    <Route path='/' element={<Home />} />

                </Routes>

            </ErrorBoundary>

        </Suspense>

    </Router>

  )

}

export default App;