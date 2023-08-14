'use strict'

async function cancelSchedule(scheduleId) {
	try {
		const response = await fetch(`api/schedules/${scheduleId}`, {
			method: 'DELETE',
		});

		if (response.status === 204) {
			alert('Schedule was deleted.');
		} else {
			const errorResponse = await response.text();
			alert(errorResponse);
		}
	} catch (error) {
		alert(error);
	}
}

async function cancelBooking(bookingId) {
	try {
		const response = await fetch(`api/bookings/${bookingId}`, {
			method: 'PUT',
		});

		if (response.ok) {
			alert('Booking cancelled.');
		} else {
			alert('Failed to cancel.')
		}
	} catch (error) {
		alert(error);
	}
}