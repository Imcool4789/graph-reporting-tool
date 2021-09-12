import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Administrators from '../Administrators';
import Faculties from '../Faculties';
import Home from '../Home';
import Instructors from '../Instructors';

const Main = () => {
    return (
        <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/instructors' component={Instructors}></Route>
        <Route exact path='/faculty' component={Faculties}></Route>
        <Route exact path='/admin' component={Administrators}></Route>
      </Switch>
    )
}

export default Main
