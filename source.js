// array of object
const dates = {
    date01: "2018-06-01T18:17:12.745+07:00",
    date02: "2018-06-01T18:17:12.745Z",
    date03: "2018-06-01T18:17:12",
    date04: "2018-06-01T18:17:12.745",
    date05: "2018-06-01+07:00",
    date06: "2018-06-01",
    date07: "www; 12-03-2018 года 11:00 часов",
    date08: "2018-05-17 года в 15:00 (по местному времени).",
    date09: "www; 12.03.2018 года 11:00 часов",
    date10: "2018.05.17 года в 15:00 (по местному времени).",
    date11: "www; 12-03-2018 года",
    date12: "2018-05-17 года",
    date13: "www.ru; 12.03.2018 года",
    date14: "2018.05.17 года",
    date15: "1 января 2017 года",
    date16: "11 августа 2018 года",
    date17: "02 дек. 2018 года",
    date18: '"02" ноя. 2018 года',
    date19: "«02» сен. 2018 года",
    date20: "27/03/2018 г. в 10:00 (по московскому времени)"
};

// converting month from string to number according to their index and returning the index + 1
function convertMonth(month) {
    if (month.length > 3) {
        return (
            ["января", "февраль", "Март", "апрель", "май", "июнь", "июль", "августа", "сентябрь", "Октябрь", "ноябрь", "Декабрь"] 
                .findIndex((m) => m === month) + 1
        );
    } else if (month.length === 3) {
        return (
            ["янв", "фев", "Мар", "апр", "май", "июн", "июл", "авг", "сен", "Окт", "ноя", "дек"].findIndex(
                (m) => m === month
            ) + 1
        );
    }

    return Number(month) + 1;
}


function getDateAndTime(obj) {
    // It is used to clean the data received ( passed as an argument )
    const cleanData = { ...obj };
    // It is used to store clean data which will later become an array of object
    const returnedData = {};
    
    
    const regexDateSeparator = "[\\s./-]"; // regex that finds - and or / in the string
    const regexToClean = /[a-z]{3,}|[;'"»«]|\.(?=\s)/g; // regex that finds ;  ''  " " »«
    const regexDate = `\\d{1,4}${regexDateSeparator}(\\d{1,2}|[\wа-я]+)${regexDateSeparator}\\d{1,4}`; // regex for matching the date format
    const regexTime = /\d{2}(:\d{2}){1,2}(.\d{3})?/; // regex for matching the time

    // We select one object date from our array of objects dates
    Object.keys(dates).forEach((date) => {
        cleanData[date] = cleanData[date].replace(regexToClean, "");    // remove everything that's not a date format
        const [data] = cleanData[date].match(regexDate) || [""];   // match the date and store it 
        const [D1, D2, D3] = data.split(new RegExp(regexDateSeparator));  // we split the date in three part by using the date separator
        const [time] = cleanData[date].match(regexTime) || ["00:00:00"]; // Fwe match the time from the clean date
        const [h, m, s] = time.split(":");   // split the time
        const newDate = new Date();
        newDate.setHours(h);
        newDate.setMinutes(m);
        if (s) {
            newDate.setSeconds(s);
        }

        // check date 2018-06-01 and 01-06-2018
        if (D1.length > 2) {
            newDate.setFullYear(D1);
            newDate.setDate(D3);
        } else {
            newDate.setFullYear(D3);
            newDate.setDate(D1);
        }
         
        newDate.setMonth(convertMonth(D2));

        returnedData[date] = newDate.toISOString();
    });

    return returnedData;
}

console.log(getDateAndTime(dates));






