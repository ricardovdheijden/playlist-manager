const OPEN_SPOTIFY_TRACK_URL = 'https://open.spotify.com/track/';

class SpotifyService {
    static createTrackIdList(urls) {
        return urls.split('\n')
            .filter(url => {
                return url.length > 31 && url.startsWith(OPEN_SPOTIFY_TRACK_URL)
            })
            .map(url => {
                return url.substring(url.lastIndexOf('/') + 1)
            });
    }

    static createUrlsOutput(trackIdList) {
        return trackIdList.map(trackId => {
            return OPEN_SPOTIFY_TRACK_URL + trackId;
        }).join('\n');
    }

    static createPlaylistWithMarkedDuplicates(trackIds) {
        let uniqueTracks = new Map();
        let playlist = {
            numberOfDuplicates: 0,
            tracks: []
        };
        trackIds.forEach((trackId, index) => {
            if (uniqueTracks.has(trackId)) {
                playlist.numberOfDuplicates++;
                let track = {
                    trackId: trackId,
                    duplicateOf: uniqueTracks.get(trackId)
                };
                playlist.tracks.push(track)
            } else {
                uniqueTracks.set(trackId, index);
                let track = {
                    trackId: trackId
                };
                playlist.tracks.push(track);
            }
        });
        return playlist;
    }

    static createDeduplicatedPlaylist(trackIds) {
        let deduplicatedPlaylist = new Map();
        trackIds.forEach((track) => {
            deduplicatedPlaylist.set(track);
        });

        return Array.from(deduplicatedPlaylist.keys());
    }
}

export default SpotifyService;
