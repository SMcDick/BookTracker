import React, { Component } from 'react'
import Scanner from '../Components/Scanner'

export default class ScanApp extends Component {
    constructor(props) {
        super(props)
        this.state = { scanning: false, results: [] }
    }

    _scan() {
        this.setState({ scanning: !this.state.scanning })
    }

    _onDetected(result) {
        this.setState({ results: this.state.results.concat([result]) });
    }

    render() {
        return (
            <div>
                <button onClick={this._scan.bind(this)}>{this.state.scanning ? 'Stop' : 'Start'}</button>
                <ul className="results">
                    {
                        this.state.results.map((result, index) => {
                            return (<li key={index}> <span>{result} - {result} </span></li>)
                        })
                    }
                </ul>
                {this.state.scanning ? <Scanner onDetected={this._onDetected.bind(this)} /> : null}
            </div>
        )
    }
}