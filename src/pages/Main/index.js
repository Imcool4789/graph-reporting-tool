import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import Instructor from '../Instructor';
import Administrator from '../Administrator';
import Department from '../Department';

const Main = () => {
    return (
        <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/instructor' component={Instructor}></Route>
        <Route exact path='/department' component={Department}></Route>
        <Route exact path='/admin' component={Administrator}></Route>
      </Switch>
    )
}

export default Main
