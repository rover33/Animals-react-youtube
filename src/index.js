import React, { Component } from 'react';
import _ from 'lodash'
import ReactDOM from 'react-dom'
import axios from 'axios';
import "./components/style.css"

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
// import Header from './header';

const API_KEY = 'AIzaSyBWOe5kyh0tYufiYUQzPX0_6M2gLMUaHAo';


//create a new component. This component should produce html.
export default class Youtube extends Component {
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
         };
         
         this.videoSearch('')
        }

    videoSearch(term){
        const self = this
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}&channelId=UCyhOtxSOJukDs_v6ONoOniQ&key=${API_KEY}&maxResults=50`)
            .then(response => {
                console.log(response)
                self.setState({  
                    videos: response.data.items,
                    selectedVideo: response.data.items[0]
                })
            })
            .catch(error => {
                console.log(error)
            })

    }


    render() {

        const videoSearch= _.debounce((term) => { this.videoSearch(term) }, 300)

        return (
        <div>
            {/* <Header /> */}
            <div className="videoBody">
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState ({selectedVideo})}
                    videos={this.state.videos} /> 
            </div>
        </div>
        )
    }
}


//take this component's generated HTML and put it 
//on the page (in DOM)
ReactDOM.render(<Youtube />, document.querySelector('#root'));