import React, {Component} from 'react';

class FindDuplicates extends Component {
    state = {
        playlist: []
    };

    render() {
        return (
            <React.Fragment>
                <h2>Find Duplicates</h2>
                <h5>Playlist</h5>
                <textarea rows="10"
                          cols="70"
                          placeholder={'https://open.spotify.com/track/3hMHG6lx9QHVcfYSUr5PoM\nhttps://open.spotify.com/track/3O9zeBmAi5JRBMSpIQGx2v'}
                          required
                          onChange={this.handleChange}/>
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
                        {this.state.playlist.map((track, pos) =>
                            <tr key={pos + 1}>
                                <th scope="row">{pos + 1}</th>
                                <td>
                                    <a href={'https://open.spotify.com/track/' + track.trackId} target="_blank">{track.trackId}</a>
                                </td>
                                <td>{track.duplicates.map(tracknumber => tracknumber + 1).join(', ')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </React.Fragment>
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
