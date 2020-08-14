import React, {Component} from 'react';
import {Container, Row, Col, Button, Form, FormControl} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';

const daily = {
	labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
	datasets: [
		{
			label: 'Daily Water Intake',
			backgroundColor: 'rgba(0,99,132,0.2)',
			borderColor: 'rgba(0,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(0,99,132,0.4)',
			hoverBorderColor: 'rgba(0,99,132,1)',
			data: [0, 0, 0, 0, 0, 0, 0, 0]
		}
	]
}

const weekly = {
	labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	datasets: [
		{
			label: 'Weekly Water Intake',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [0, 0, 0, 0, 0, 0, 0]
		}
	]
}

const monthly = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	datasets: [
		{
			label: 'Monthly Water Intake',
			backgroundColor: 'rgba(0,255,132,0.2)',
			borderColor: 'rgba(0,255,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(0,255,132,0.4)',
			hoverBorderColor: 'rgba(0,255,132,1)',
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}
	]
}

const time = {
	'0': 0,
	'3': 1,
	'6': 2,
	'9': 3,
	'12': 4,
	'15': 5,
	'18': 6,
	'21': 7
}


class Body extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 name: '',
			 amount: 0,
			 size: 'oz',
			 show: false,
			 daily: daily,
			 weekly: weekly,
			 monthly: monthly
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let amount = parseFloat(this.state.amount);
		let size = this.state.size;
		if(size === 'liters') {
			amount *= 33.814;
		}
		else if(size === 'ml') {
			amount *= 0.033814;
		}
		else if(size === 'gal') {
			amount *= 128;
		}
		const {hour, month, day, timestamp} = {...this.roundTime()};
		let dailyData = {...this.state.daily};
		dailyData.datasets[0].data[time[hour]] += amount
		let monthlyData = {...this.state.monthly};
		monthlyData.datasets[0].data[month] += amount
		let weeklyData = {...this.state.weekly};
		weeklyData.datasets[0].data[day] += amount
		this.setState({daily: dailyData, monthly: monthlyData, weekly: weeklyData});
		let data = {data: '\r\n' + timestamp + '\t' + this.state.amount};
		this.sendData(data);
		this.showCustom();
	}

	sendData = (data) => {
		axios.post('/sendData', data)
		.then(response => {

		})
		.catch(err => {
			console.error(err)
		});
	}

	handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		this.setState({[name]: value});
	}

	showCustom = () => {
		this.setState(prevState => ({
			show: !prevState.show
		}));
	}

	timestampToDate(timestamp) {
		return new Date(timestamp * 1000);
	}

	handlePrebuilt = (event) => {
		event.preventDefault();
		const {hour, month, day, timestamp} = {...this.roundTime()};
		let dailyData = {...this.state.daily};
		dailyData.datasets[0].data[time[hour]] += parseFloat(event.target.value)
		let monthlyData = {...this.state.monthly};
		monthlyData.datasets[0].data[month] += parseFloat(event.target.value)
		let weeklyData = {...this.state.weekly};
		weeklyData.datasets[0].data[day] += parseFloat(event.target.value)
		this.setState({daily: dailyData, monthly: monthlyData, weekly: weeklyData});
		let data = {data: '\r\n' + timestamp + '\t' + event.target.value};
		this.sendData(data);
	}

	roundTime = () => {
		let currTime = new Date();
		let currHour = currTime.getHours();
		if(currHour % 3 !== 0) {
			if(((currHour + 1) % 3) === 0) {
				currTime.setHours(currHour + 1);
			}
			else if(((currHour + 2) % 3) === 0) {
				currTime.setHours(currHour + 2);
			}
		}
		return {hour: currTime.getHours(), month: currTime.getMonth(), day: currTime.getDay(), timestamp: parseInt(currTime.getTime() / 1000)}
	}

	checkDates(timestamp, amount) {
		const date = moment(this.timestampToDate(timestamp));
		const now = moment();

		if(date.isoWeek() === now.isoWeek()) {
			// const {hour, month, day} = {...this.roundTime()};
			// let dailyData = {...this.state.daily};
			// dailyData.datasets[0].data[time[hour]] += parseFloat(amount);
			let weeklyData = {...this.state.weekly};
			weeklyData.datasets[0].data[date.weekday()] += parseFloat(amount)
			this.setState({weekly: weeklyData});

			if(date.day() === now.day()) {
				let dailyData = {...this.state.daily};
				dailyData.datasets[0].data[time[date.hour()]] += parseFloat(amount);
				this.setState({daily: dailyData});
			}
		}
		
		// const {hour, month, day} = {...this.roundTime()};
		// console.log(date.getDay());
		// let dailyData = {...this.state.daily};
		// if(date.getHours() === hour) dailyData.datasets[0].data[time[hour]] += parseFloat(amount)
		let monthlyData = {...this.state.monthly};
		monthlyData.datasets[0].data[date.month()] += parseFloat(amount)
		this.setState({monthly: monthlyData});
		// let weeklyData = {...this.state.weekly};
		// weeklyData.datasets[0].data[day] += parseFloat(amount)
	}

	componentDidMount() {
		axios.post('/data')
		.then(response => {
			let data = response.data;
			for(let i = 0; i < data.length; i++) {
				this.checkDates(data[i]['timestamp'], data[i]['amount']);
			}
			console.log(data);
		})
		.catch(err => {
			console.error(err);
		});
	}

	render() {

		const { amount, show, daily, weekly, monthly } = this.state;
		const dailyData = daily.datasets[0].data;
		const weeklyData = weekly.datasets[0].data;
		const monthlyData = monthly.datasets[0].data;

		return (
			<Container fluid>
			<Row className={'justify-content-center align-items-center text-center'}>
				<Col xs={12} md={2}>
					<br/>
					<Button value={4} onClick={this.handlePrebuilt}>4 Ounces</Button>
				</Col>
				<Col xs={12} md={2}>
					<br/>
					<Button value={8} onClick={this.handlePrebuilt}>8 Ounces</Button>
				</Col>
				<Col xs={12} md={2}>
					<br/>
					<Button value={16} onClick={this.handlePrebuilt}>16 Ounces</Button>
				</Col>
				<Col xs={12} md={2}>
					<br/>
					<Button value={24} onClick={this.handlePrebuilt}>24 Ounces</Button>
				</Col>
				<Col xs={12} md={4}>
					<br/>
					{!show && 
						<Button onClick={this.showCustom}>Custom Amount</Button>
					}
					{show &&
						<form onSubmit={this.handleSubmit}>
							<Form.Row>
								<Col>
									<FormControl
									type={'number'}
									name={'amount'}
									value={amount}
									onChange={this.handleChange}
									/>
								</Col>
								<Col>
									<FormControl as={'select'} name={'size'} defaultValue={'oz'} onChange={this.handleChange} >
										<option value={'oz'}>Ounce(s)</option>
										<option value={'gal'}>Gallon(s)</option>
										<option value={'ml'}>Milliliter(s)</option>
										<option value={'liters'}>Liter(s)</option>
									</FormControl>
								</Col>
							</Form.Row>
							<Form.Row>
								<Button type={'submit'} variant={'outline-primary'} block>Submit</Button>
							</Form.Row>
						</form>
					}
				</Col>
			</Row>
			<br/>
			<br/>
			<Row className={'justify-content-center align-items-center text-center'}>
				<Col xs={12} md={4}>
					<Bar data={this.state.daily} redraw/>
				</Col>
				<Col xs={12} md={4}>
					<Bar data={this.state.weekly} redraw/>
				</Col>
				<Col xs={12} md={4}>
					<Bar data={this.state.monthly} redraw/>
				</Col>
			</Row>
			<br/>
			<br/>
			<Row className={'justify-content-center align-items-center text-center'}>
				<Col xs={12} md={4}>
					<h5>Daily Consumption Data</h5>
					<Row> 
					<Col xs={6} md={6}>
					<ul className={'text-left'}>
						<li>Low: {Math.min(...dailyData).toFixed(2)}</li>
						<li>High: {Math.max(...dailyData).toFixed(2)}</li>
						<li>Total: {dailyData.reduce((a,b) => a + b, 0).toFixed(2)}</li>
						<li>Average: {(dailyData.reduce((a,b) => a + b, 0) / dailyData.length).toFixed(2)}</li>
					</ul>
					</Col>
					<Col xs={6} md={6}>
					<ul className={'text-right'}>
						<li>Time - Low: {this.state.daily.labels[dailyData.indexOf(Math.min(...dailyData))]}</li>
						<li>Time - High: {this.state.daily.labels[dailyData.indexOf(Math.max(...dailyData))]}</li>
					</ul>
					</Col>
					</Row>
				</Col>
				<Col xs={12} md={4}>
					<h5>Weekly Consumption Data</h5>
					<Row>
					<Col xs={6} md={6}>
					<ul className={'text-left'}>
						<li>Low: {Math.min(...weeklyData).toFixed(2)}</li>
						<li>High: {Math.max(...weeklyData).toFixed(2)}</li>
						<li>Total: {weeklyData.reduce((a,b) => a + b, 0).toFixed(2)}</li>
						<li>Average: {(weeklyData.reduce((a,b) => a + b, 0) / weeklyData.length).toFixed(2)}</li>
					</ul>
					</Col>
					<Col xs={6} md={6}>
						<ul className={'text-right'}>
							<li>Week - Low: {this.state.weekly.labels[weeklyData.indexOf(Math.min(...weeklyData))]}</li>
							<li>Week - High: {this.state.weekly.labels[weeklyData.indexOf(Math.max(...weeklyData))]}</li>
						</ul>
					</Col>
					</Row>
				</Col>
				<Col xs={12} md={4}>
					<h5>Monthly Consumption Data</h5>
					<Row>
					<Col xs={6} md={6}>
					<ul className={'text-left'}>
						<li>Lowest: {Math.min(...monthlyData).toFixed(2)}</li>
						<li>Highest: {Math.max(...monthlyData).toFixed(2)}</li>
						<li>Total: {monthlyData.reduce((a,b) => a + b, 0).toFixed(2)}</li>
						<li>Average: {(monthlyData.reduce((a,b) => a + b, 0) / monthlyData.length).toFixed(2)}</li>
					</ul>
					</Col>
					<Col xs={6} md={6}>
					<ul className={'text-right'}>
						<li>Month - Low: {this.state.monthly.labels[monthlyData.indexOf(Math.min(...monthlyData))]}</li>
						<li>Month - High: {this.state.monthly.labels[monthlyData.indexOf(Math.max(...monthlyData))]}</li>
					</ul>
					</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className={'note'}>* all data shown are in ounces</p>
				</Col>
			</Row>
		</Container>
		)
	}
}

export default Body;