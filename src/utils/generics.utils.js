import moment from "moment";
export class Generics {
  convertDate(date) {
    const result = moment(date).format("DD/MM/YYYY");
    const formattedDate = result.replace(/-q-/gi, "às");
    return formattedDate;
  }
  convertDateString(dateString) {
    const [day, month, year] = dateString.split("/");
    const isoDateString = `${year}-${month}-${Number(day)+1}`;
    return isoDateString;
  }
  verifyToken() {
    const tkn = window.localStorage.getItem("tkn");
    let result = false;
    if (tkn) {
      result = true;
    }
    return result;
  }
}
