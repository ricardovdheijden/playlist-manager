class SpotifyService {
    static createTrackIdList(urls) {
        return urls.split('\n')
            .filter(url => {
                return url.length > 31 && url.startsWith('https://open.spotify.com/track/')
            })
            .map(url => {
                return url.substring(url.lastIndexOf('/') + 1)
            });
    }

    static createPlaylistWithMarkedDuplicates(trackIds) {
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

export default SpotifyService;