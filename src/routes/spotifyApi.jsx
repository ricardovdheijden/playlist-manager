import React, {Component} from 'react';

class SpotifyApi extends Component {
    state = {
        healthMessage: []
    };

    componentDidMount() {
        fetch("http://localhost:8080/health")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        healthMessage: result.message
                    });
                }
            )

    }

    render() {
        const { healthMessage } = this.state;
        return (
            <div className="container">{healthMessage}</div>
        );
    }
}

export default SpotifyApi;
