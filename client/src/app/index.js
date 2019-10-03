
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { JobsList, JobsInsert, JobsUpdate, CandidateList, UserProfile, CompanyCreate, CompaniesList} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/jobs/list" exact component={JobsList} />
                <Route path="/jobs/create" exact component={JobsInsert} />
                <Route path="/jobs/update/:id" exact component={JobsUpdate} />
                <Route path="/candidate/list/" exact component={CandidateList} />
                <Route path="/user/:id" exact component={UserProfile} />
                <Route path="/company/create" exact component={CompanyCreate}/>
                <Route path="/company/list" exact component={CompaniesList}/>
            </Switch>
        </Router>
    )
}

export default App
