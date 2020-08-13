import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
	return (
		<footer id={'footer'}>
			<Container>
				<Row>
					<Col className={'text-center'}>
						<span>Footer Goes Here</span>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer;