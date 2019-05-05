import React, {Component} from 'react';

class PlaylistInput extends Component {
    render() {
        return (
            <div className="row mt-3">
                <div className="col">
                    <h5>{this.props.title}</h5>
                    <textarea rows="10"
                              className="col"
                              placeholder={this.props.readOnly ? '' :
                                  'https://open.spotify.com/track/3hMHG6lx9QHVcfYSUr5PoM\nhttps://open.spotify.com/track/3O9zeBmAi5JRBMSpIQGx2v'}
                              readOnly={this.props.readOnly}
                              value={this.props.value}
                              onChange={this.props.onChange}/>
                </div>
            </div>
        );
    }
}

export default PlaylistInput;
