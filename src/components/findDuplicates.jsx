import React, {Component} from 'react';

class FindDuplicates extends Component {
    state = {
        uniqueTracks: new Map(),
        duplicateTracks: []
    };

    handleChange = event => {
        let trackIds = event.target.value.split('\n')
            .filter(url => {
                return url.length > 31 && url.startsWith('https://open.spotify.com/track/')
            })
            .map(url => {
                return url.substring(url.lastIndexOf('/') + 1)
            });

        let uniqueTracks = new Map();
        let duplicateTracks = [];
        trackIds.forEach((track, index) => {
            if (uniqueTracks.has(track)) {
                duplicateTracks.push(track);
            } else {
                uniqueTracks.set(track, index)
            }
        });

        this.setState({uniqueTracks: uniqueTracks});
        this.setState({duplicateTracks: duplicateTracks});
    };

    render() {
        return (
            <React.Fragment>
                <h2>Find Duplicates</h2>
                <textarea rows="10"
                          cols="70"
                          placeholder={'https://open.spotify.com/track/3hMHG6lx9QHVcfYSUr5PoM\nhttps://open.spotify.com/track/3O9zeBmAi5JRBMSpIQGx2v'}
                          required
                          onChange={this.handleChange}/>
                <textarea rows="10"
                          cols="70"
                          value={this.state.duplicateTracks.join('\n')}/>
            </React.Fragment>
        );
    }

}

export default FindDuplicates;
