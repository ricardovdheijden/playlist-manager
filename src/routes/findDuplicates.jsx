import React, {Component} from 'react';
import PlaylistInput from '../components/playlistInput';
import DuplicateUrlOverview from '../components/duplicateUrlOverview';

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
        let trackIds = event.target.value.split('\n')
            .filter(url => {
                return url.length > 31 && url.startsWith('https://open.spotify.com/track/')
            })
            .map(url => {
                return url.substring(url.lastIndexOf('/') + 1)
            });
        this.setState({playlist: this.createPlaylistFromTrackIds(trackIds)});
    };

    createPlaylistFromTrackIds(trackIds) {
        let uniqueTracks = new Map();
        let duplicateTracks = new Map();
        trackIds.forEach((track, index) => {
            if (uniqueTracks.has(track)) {
                if (duplicateTracks.has(track)) {
                    let indexes = duplicateTracks.get(track);
                    indexes.push(index);
                    duplicateTracks.set(track, indexes);
                } else {
                    let indexes = [];
                    indexes.push(uniqueTracks.get(track));
                    indexes.push(index);
                    duplicateTracks.set(track, indexes);
                }
            } else {
                uniqueTracks.set(track, index)
            }
        });

        let playlist = [];
        trackIds.forEach(trackId => {
            let duplicates = [];
            if (duplicateTracks.has(trackId)) {
                duplicates = duplicateTracks.get(trackId);
            }
            let track = {
                trackId: trackId,
                duplicates: duplicates
            };
            playlist.push(track);
        });

        return playlist;
    }

}

export default FindDuplicates;
