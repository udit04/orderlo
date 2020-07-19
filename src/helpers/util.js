export const getDateTimeStringFromGMT = (date)=>{
    let new_date = new Date(date);
    //new_date.setHours(new_date.getHours()+5);
    //new_date.setMinutes(new_date.getMinutes()+30);
    //new_date = (new_date.toISOString()).split('T');
    return new_date.toLocaleString();
}