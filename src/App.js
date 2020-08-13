import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import NavigationBar from './components/NavigationBar';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
	<React.Fragment>
		<NavigationBar/>
		<Body/>
		<Footer/>
	</React.Fragment>
  )
}

export default App;
