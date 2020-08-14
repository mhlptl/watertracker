import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
	return (
		<footer id={'footer'}>
			<Container>
				<Row>
					<Col className={'text-center'}>
						<span>Mehul Patel 2020.</span>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer;