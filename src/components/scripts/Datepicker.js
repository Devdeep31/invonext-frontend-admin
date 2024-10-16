// useDatePicker.js
import { useState } from 'react';

const DatePicker = (initialDate = '') => {
    const [date, setDate] = useState(initialDate);
    const [error, setError] = useState('');

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        // Simple date validation: You can customize this logic as needed
        if (selectedDate && new Date(selectedDate) == "Invalid Date") {
            setError('Please select a valid date.');
        } else {
            setError('');
        }

        setDate(selectedDate);
    };

    return {
        date,
        error,
        handleDateChange,
    };
};

export default DatePicker;
