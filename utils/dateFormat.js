// Date Formatting
const addDateSuffix = date => {
    // Get Date Input
    let dateInput = date.toString();

    // Get lastCharacter of dateString
    const lastChar = dateInput.charAt(dateInput.length -1);

    // if else's for Date Suffix's
    if (lastChar === '1' && dateInput !== '11') {
        dateInput = `${dateInput}st`;
    } else if (lastCar === '2' && dateInput !== '12') {
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
            0:
            1:
            2:
            3:
            4:
            5:
            6:
            7:
            8:
            9:
            10:
            11:
        };
    } else {
        months = {
            0:
            1:
            2:
            3:
            4:
            5:
            6:
            7:
            8:
            9:
            10:
            11:
        };
    }
}