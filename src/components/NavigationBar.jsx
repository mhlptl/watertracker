import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
	return (
		<Navbar variant={'dark'} bg={'dark'} expand={'sm'} >
		<Navbar.Brand>Template App</Navbar.Brand>
		<Navbar.Toggle aria-controls={'basic-navbar-nav'} />
		<Navbar.Collapse id={'basic-navbar-nav'}>
			<Nav className={'ml-auto'}>
				<Nav.Link>Link 1</Nav.Link>
				<Nav.Link>Link 2</Nav.Link>
				<Nav.Link>Link 3</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
	)
}

export default NavigationBar;