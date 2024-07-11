import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
    const pageSize = 10 ;
    const apiKey = '45090a25d9b8edb9aa3e7b53a6e51628'
    const [progress, setProgress] = useState(0);

    return (
        <div>
            <Router>
                <NavBar />
                <LoadingBar height={3} color='#f11946' progress={progress} />
                <Switch>
                    <Route exact path="/">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />
                    </Route>
                    <Route exact path="/business">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="business" />
                    </Route>
                    <Route exact path="/entertainment">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment" />
                    </Route>
                    <Route exact path="/general">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />
                    </Route>
                    <Route exact path="/health">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="health" />
                    </Route>
                    <Route exact path="/science">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="science" />
                    </Route>
                    <Route exact path="/sports">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="sports" />
                    </Route>
                    <Route exact path="/technology">
                        <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="technology" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;