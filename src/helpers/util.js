export const getDateTimeStringFromGMT = (date)=>{
    let new_date = new Date(date);
    //new_date.setHours(new_date.getHours()+5);
    //new_date.setMinutes(new_date.getMinutes()+30);
    //new_date = (new_date.toISOString()).split('T');
    return new_date.toLocaleString();
}

export const queryStringToObject = (queryString) => {
    let obj = {}
    if(queryString) {
      queryString.slice(1).split('&').map((item) => {
        const [ k, v ] = item.split('=')
        v ? obj[k] = v : null
      })
    }
    return obj
}

export const getHyphenSeperatedStringLowerCase = (string) => {
  if(string) {
    return string.toLowerCase().split(" ").join("-");
  }
  return string;
}