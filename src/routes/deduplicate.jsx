import React, {Component} from 'react';
import PlaylistInput from '../components/playlistInput';
import SpotifyService from '../services/spotifyService';

class Deduplicate extends Component {
    state = {
        playlist: []
    };

    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        <h2>Deduplicate</h2>
                    </div>
                </div>
                <PlaylistInput title="Playlist input" onChange={this.handleChange} />
                <PlaylistInput readOnly
                    title="Deduplicated playlist"
                    value={SpotifyService.createUrlsOutput(this.state.playlist)} />
            </div>
        );
    }

    handleChange = event => {
        let trackIdList = SpotifyService.createTrackIdList(event.target.value);
        this.setState({playlist: SpotifyService.createDeduplicatedPlaylist(trackIdList)});
    };
}

export default Deduplicate;
