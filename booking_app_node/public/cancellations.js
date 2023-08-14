function cancelSchedule(scheduleId) {
	const xhr = new XMLHttpRequest();
	xhr.open('DELETE', `/api/schedules/${scheduleId}`);
	xhr.addEventListener('load', () => {
		if (xhr.status === 204) {
			alert('Deleted');
		} else {
			alert(xhr.response);
		}
	});
	xhr.send();
}

function cancelBooking(bookingId) {
	const xhr = new XMLHttpRequest();
	xhr.open('PUT', `/api/bookings/${bookingId}`);
	xhr.addEventListener('load', () => {
		if (xhr.status === 204) {
			alert('Deleted');
		} else {
			alert(xhr.response);
		}
	});
	xhr.send();
}