import React, { Component } from 'react'

import { firebaseMatches } from "../../firebase";
import { firebaseLooper, reverseArray } from "../misc/misc";

import LeagueTable from './Table'
// import MatchesList from "./MatchesList";

class TheMatches extends Component {

  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playerFilter: 'All',
    resultFilter: 'All'
  }

  componentDidMount() {
    firebaseMatches.once('value').then(snapshot=>{
      const matches = firebaseLooper(snapshot)

      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      })

    })
  }

  render() {
    // console.log(process.env)
    const state = this.state
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            {/* <MatchesList matches={state.filterMatches}/> */}
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    )
  }
}

export default TheMatches
