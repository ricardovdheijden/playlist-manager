import React, {Component} from 'react';
import PlaylistInput from '../components/playlistInput';
import DuplicateUrlOverview from '../components/duplicateUrlOverview';
import SpotifyService from '../services/spotifyService';

class FindDuplicates extends Component {
    state = {
        playlist: []
    };

    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        <h2>Find Duplicates</h2>
                    </div>
                </div>
                <PlaylistInput onChange={this.handleChange} />
                <DuplicateUrlOverview playlist={this.state.playlist} />
            </div>
        );
    }

    handleChange = event => {
        let trackIdList = SpotifyService.createTrackIdList(event.target.value);
        this.setState({playlist: SpotifyService.createPlaylistWithMarkedDuplicates(trackIdList)});
    };
}

export default FindDuplicates;
