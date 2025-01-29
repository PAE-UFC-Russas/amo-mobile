function padTo2Digits(num) {
    return String(num).padStart(2, '0');
}

export default function FormateTime(date){
    date = new Date(date);
    const hoursAndMinutes = padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes());
    return hoursAndMinutes
}