//Author: Stefan Hansch
//Version: 05-04-2025
class Gene {
  constructor(name) {
    this.name = name;
    this.list = {};
    this.workingList = {};
    this.backUpList = {};
    this.tilt = false;
    this.workingTilt = false;
    this.impact = 0;
    this.lamda = 0;
    this.start = 1;
    this.counter = 0;
  }

  //counter reset

  counterReset() {
    this.counter = 0;
  }

  counterPlusOne() {
    this.counter++;
  }
  getCounter() {
    return this.counter;
  }
  getList() {
    return this.list;
  }

  setList(list, workingList) {
    this.list = list;
    this.workingList = workingList;
  }


  getTilt() {
    return this.tilt;
  }

  setTilt(tilt) {
    this.tilt = tilt;
  }

  getWorkingTilt() {
    return this.workingTilt;
  }

  setWorkingTilt(tilt) {
    this.workingTilt = tilt;
  }


  getTiltColor(key, myRedColor, myGreenColor) {
    if (geneList[key].getWorkingValue(key) == "NA") { return "white" };

    if (geneList[key].getWorkingValue(key) < geneList[key].getValue(item) && geneList[key].getTilt() == false) { return myRedColor(geneList[key].getWorkingValue(key)); }

    if (geneList[key].getWorkingValue(key) > geneList[key].getValue(key) && geneList[key].getTilt() == false) {
      return myGreenColor(geneList[key].getWorkingValue(key));
    }


    if (this.tilt == false) {
      return 'white';
    } return 'grey';
  }

  getworkingList() {
    return this.workingList;
  }

  setImpact(impact) {
    this.impact = impact;
  }

  getImpact() {
    return this.impact;
  }

  setValue(key, value) {
    this.list[key] = value;
  }

  getValue(key) {
    return this.list[key];
  }

  setWorkingValue(key, value) {
    this.workingList[key] = value;
  }

  getWorkingValue(key) {
    return this.workingList[key];
  }

  getStart() {
    return this.start;
  }

  setStart(time) {
    this.start = time;
  }

  printThis() {
  }
  getName() {
    return this.name;
  }
  greet() {
    return `${this.name} says hello.`;
  }
}
