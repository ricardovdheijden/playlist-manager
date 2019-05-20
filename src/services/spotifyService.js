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
        let duplicateTracks = new Map();
        let numberOfDuplicates = 0;
        trackIds.forEach((track, index) => {
            if (uniqueTracks.has(track)) {
                numberOfDuplicates++;
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

        let playlist = {};
        playlist.numberOfDuplicates = numberOfDuplicates;
        let tracks = [];
        trackIds.forEach(trackId => {
            let duplicates = [];
            if (duplicateTracks.has(trackId)) {
                duplicates = duplicateTracks.get(trackId);
            }
            let track = {
                trackId: trackId,
                duplicates: duplicates
            };
            tracks.push(track);
        });
        playlist.tracks = tracks;
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
