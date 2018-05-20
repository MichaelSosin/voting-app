import React, { Component } from 'react'

export default class App extends Component {
  isDisabled () {
    return !!this.props.hasVoted
  }

  hasVotedFor (entry) {
    return this.props.hasVoted === entry
  }

  render () {
    const { pair, vote, winner } = this.props
    return (
      <div className="voting">
        {winner ?
          <div ref="winner">Winner is {winner}</div> :
          !!pair.length && pair.map((entry, idx) => (
          <button
            key={idx}
            onClick={() => vote(entry)}
            disabled={this.isDisabled()}
          >
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) ?
              <div className="label">Voted</div> :
              null
            }
          </button>
        ))}
      </div>
    )
  }
}