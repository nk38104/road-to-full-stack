import './App.css';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import particlesOptions from './tsparticles';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const clarifai = new Clarifai.App({
	apiKey: "c7cfe8527a43436dbfecb0c45c36ee56",
});

class App extends Component {
  	constructor() {
    	super();
    	this.state = {
    		input: "",
      		imageUrl: "",
      		box: {},
			route: "signin",
			isSignedIn: false,
    	}
  	}
	
	componentDidMount() {
		fetch("http://localhost:3000")
		.then(response => response.json())
		.then(console.log);
	}

  	calculateFaceLocation = (data) => {
    	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    	const image = document.getElementById("input-img");
    	const width = Number(image.width);
    	const height = Number(image.height);

   		return {
			leftCol:  	clarifaiFace.left_col * width,
      		topRow:		clarifaiFace.top_row * height,
      		rightCol:	width - (clarifaiFace.right_col * width),
	 		bottomRow:	height - (clarifaiFace.bottom_row * height),
    	}	
  	}

	onRouteChange = (route) => {
		if (route === "home") {
			this.setState({ isSignedIn: true });
		} else {
			this.setState({ isSignedIn: false });
		}
		this.setState({ route: route });
	}

	displayFaceBox = (box) => {
		this.setState({ box: box });
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })
	}

  	onButtonSubmit  = () => {
    	this.setState({ imageUrl: this.state.input });

		clarifai.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	}

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		
		return (
			<div className="App">
				<Particles className="tsparticles" options={particlesOptions} />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
				{
					route === "home" ?
						<div>
							<Logo />
							<Rank />
							<ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
							<FaceRecognition imageUrl={imageUrl} box={box} />
						</div>
					: 	(route === "signin"
							? <SignIn onRouteChange={this.onRouteChange} /> 
							: <Register onRouteChange={this.onRouteChange} />
						)
				}
			</div>
		);
	}
}

export default App;
