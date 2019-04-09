import React, {Component} from 'react';

class FindDuplicates extends Component {
    state = {
        trackIds: []
    };

    handleChange = event => {
        let trackIds = event.target.value.split('\n')
            .filter(c => {
                return c.length > 31 && c.startsWith('https://open.spotify.com/track/')
            })
            .map(c => {
                return c.substring(c.lastIndexOf('/') + 1)
            });

        this.setState({trackIds: trackIds});
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
