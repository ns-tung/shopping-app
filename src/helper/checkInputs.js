export default class checkInputs {
  constructor() {
    this.checkNull = function (value) {
      value = value.trim();
      return value === '' ? false : true;
    };

    this.checkNumber = function (number) {
      let regex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
      return regex.test(number);
    };
  }
}