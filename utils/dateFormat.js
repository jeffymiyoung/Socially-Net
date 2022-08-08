// Date Formatting
const addDateSuffix = date => {
    // Get Date Input
    let dateInput = date.toString();

    // Get lastCharacter of dateString
    const lastChar = dateInput.charAt(dateInput.length -1);

    // if else's for Date Suffix's
    if (lastChar === '1' && dateInput !== '11') {
        dateInput = `${dateInput}st`;
    } else if (lastChar === '2' && dateInput !== '12') {
        dateInput = `${dateInput}nd`;
    } else if (lastChar === '3' && dateInput !== '13') {
        dateInput = `${dateInput}rd`;
    } else {
        dateInput = `${dateInput}th`;
    }

    // return Date Input
    return dateInput;
};

// Export formatting function for timestamp
module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    let months;

    if (monthLength === 'short') {
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
    } else {
        months = {
            0: 'January',
            1: 'Febuary',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
    }

    // making a Date Object and month formatting
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    let dayOfMonth;

    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
        dayOfMonth = dateObj.getDate();
    }

    const year = dateObj.getFullYear();

    let hour;
    // check hour format
    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    } else {
        hour = dateObj.getHours();
    }
    // if hour is 0 (12:00 am) - change it to 12
    if (hour === 0) {
        hour = 12;
    }

    const minutes = dateObj.getMinutes();

    // set 'am/pm'
    let periodOfDay;

    if (dateObj.getHours() >= 12) {
        periodOfDay = 'pm';
    } else {
        periodOfDay = 'am';
    }

    // construct time stamp format
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
}