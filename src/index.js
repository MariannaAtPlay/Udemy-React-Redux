import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDhxz8XvTOTCPVDFjlW_seF7Uwi9r_GpFE';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		 };

		this.videoSearch('working remotely');

		this.handleVideoSelect = this.handleVideoSelect.bind(this);
		this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos,
				selectedVideo: videos[0] 
			});
		});
	}

	handleVideoSelect(selectedVideo) {
		this.setState({
			selectedVideo
		});
	}

	handleSearchTermChange(term) {
		this.videoSearch(term);
	}

	render() {
		const handleSearchTermChange = _.debounce(this.handleSearchTermChange, 1000);

		return (
			<div>
				<SearchBar onSearchTermChange={handleSearchTermChange} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={this.handleVideoSelect}
					videos={this.state.videos} 
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('container')
);