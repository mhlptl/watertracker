import React from 'react';
import { Navbar} from 'react-bootstrap';

function NavigationBar() {
	return (
		<Navbar variant={'dark'} bg={'dark'} expand={'sm'} >
			<Navbar.Brand>Water Intake Tracker</Navbar.Brand>
		</Navbar>
	)
}

export default NavigationBar;