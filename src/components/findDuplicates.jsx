import React, {Component} from 'react';
import PlaylistInput from './playlistInput';

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
                <div className="row mt-3">
                    { this.state.playlist.length ?
                        <div className="col">
                            <h5>Duplicates</h5>
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Track ID</th>
                                    <th scope="col">Duplicates</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.state.playlist.map((track, pos) =>
                                    <tr className={track.duplicates.length ? 'table-secondary':null} key={pos + 1}>
                                        <th scope="row">{pos + 1}</th>
                                        <td>
                                            <a href={'https://open.spotify.com/track/' + track.trackId} target="_blank">{track.trackId}</a>
                                        </td>
                                        <td>{track.duplicates.map(tracknumber => tracknumber + 1).join(', ')}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div> : null
                    }
                </div>
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
