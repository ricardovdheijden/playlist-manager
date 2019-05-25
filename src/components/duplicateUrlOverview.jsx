import React, {Component} from 'react';

class DuplicateUrlOverview extends Component {
    render() {
        const { playlist } = this.props;

        return (
            <div className="row mt-3">
                { playlist.tracks ?
                    <div className="col">
                        <h5>Found duplicates: {playlist.numberOfDuplicates}</h5>
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Track ID</th>
                                <th scope="col">Duplicate of</th>
                            </tr>
                            </thead>
                            <tbody>
                            { playlist.tracks.map((track, pos) =>
                                <tr className={track.duplicateOf ? 'table-secondary':null} key={pos + 1}>
                                    <th scope="row">{pos + 1}</th>
                                    <td>
                                        <a href={'https://open.spotify.com/track/' + track.trackId} target="_blank">{track.trackId}</a>
                                    </td>
                                    <td>{track.duplicateOf ? track.duplicateOf + 1 : null}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div> : null
                }
            </div>
        );
    }
}

export default DuplicateUrlOverview;
