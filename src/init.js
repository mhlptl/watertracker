/**
 * intialization of chartjs data for the daily, weekly, and monthly charts
 */
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

/**
 * group times into sections
 */
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

export {daily, weekly, monthly, time};