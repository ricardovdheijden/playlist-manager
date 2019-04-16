import React, {Component} from 'react';

class FindDuplicates extends Component {
    state = {
        uniqueTracks: new Map(),
        duplicateTracks: []
    };

    handleChange = event => {
        let trackIds = event.target.value.split('\n')
            .filter(c => {
                return c.length > 31 && c.startsWith('https://open.spotify.com/track/')
            })
            .map(c => {
                return c.substring(c.lastIndexOf('/') + 1)
            });

        let uniqueTracks = new Map();
        let duplicateTracks = [];
        trackIds.forEach((c, index) => {
            if (uniqueTracks.has(c)) {
                duplicateTracks.push(c);
            } else {
                uniqueTracks.set(c, index)
            }
        });

        this.setState({uniqueTracks: uniqueTracks});
        this.setState({duplicateTracks: duplicateTracks});
    };

    render() {
        return (
            <React.Fragment>
                <h2>Find Duplicates</h2>
                <textarea className="span6"
                          rows="10"
                          cols="70"
                          placeholder={'https://open.spotify.com/track/3hMHG6lx9QHVcfYSUr5PoM\nhttps://open.spotify.com/track/3O9zeBmAi5JRBMSpIQGx2v'}
                          required
                          onChange={this.handleChange}/>
            </React.Fragment>
        );
    }

}

export default FindDuplicates;
