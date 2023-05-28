export const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    return `${formattedDate} ${formattedTime}`;
  };

// export const convertHMS = (timearray:number) => {
//   const timeString = timearray.toString();
//   const arr = timeString.split(":");
//   const seconds = arr[0]*3600+arr[1]*60+(+arr[2]);
//   return seconds;
// }