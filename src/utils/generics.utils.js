import moment from "moment";
export class Generics {
  convertDate(date) {
    const result = moment(date).format("DD/MM/YYYY");
    const formattedDate = result.replace(/-q-/gi, "às");
    return formattedDate;
  }
}
