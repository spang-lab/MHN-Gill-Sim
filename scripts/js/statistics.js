//Author: Stefan Hansch
//Version: 05-04-2025
class Statistics {
  constructor(name, geneList) {
    this.name = name;
    this.geneList = geneList;
    this.time = 0;
    this.x = 1;
  }

  randomExponential(rate) {
    let rand = Math.random();
    return -Math.log(rand) / rate;
  }



  initialCalc() {
    for (let key in this.geneList) {
      this.geneList[key].counterReset();
    }
    let iterator;
    for (iterator = 0; iterator < 1000; iterator++) {
      for (let key in this.geneList) {
        this.geneList[key].setWorkingTilt(this.geneList[key].getTilt());
        this.geneList[key].setWorkingValue(
          key,
          this.geneList[key].getValue(key)
        );
      }
      this.time = time;
      this.simulateTumor();
    }
    this.time = time;
  }

  ValidationlCalc() {
    let bigIterator = 0;
    let AllString = "";
    for (let key in this.geneList) {
      AllString = AllString + key + ",";
    }
    AllString = AllString + "\n";
    for (bigIterator = 0; bigIterator < 1; bigIterator++) {
      for (let key in this.geneList) {
        this.geneList[key].counterReset();
      }
      let iterator;
      for (iterator = 0; iterator < 261; iterator++) {
        for (let key in this.geneList) {
          this.geneList[key].setWorkingTilt(this.geneList[key].getTilt());
          this.geneList[key].setWorkingValue(
            key,
            this.geneList[key].getValue(key)
          );
        }
        this.simulateTumor();
        for (let key in this.geneList) {
          AllString = AllString + this.geneList[key].getCounter() + ",";
          this.geneList[key].counterReset();
        }
        AllString = AllString + "\n";
      }
      //Code for intern Validation
      /* for (let key in this.geneList) {
         AllString = AllString + this.geneList[key].getCounter() + ",";
         this.geneList[key].counterReset();
       }
       AllString = AllString + "\n";
       console.log("----------------------------------------------Iterator y"+bigIterator);
     }*/
    }
    var blob = new Blob([AllString], { type: "text/plain" });
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "dataname.csv;
    a.click();
  }

  TimeValidationlCalc() {
    let bigIterator = 0;
    let AllString = "";
    AllString = AllString + "time" + "\n";
    for (bigIterator = 0; bigIterator < 1; bigIterator++) {
      let x = 0.0;
      let iterator = 0;
      for (iterator = 0; iterator < 10000; iterator++) {
        x = randomExponential(1);
        AllString = AllString + x + "\n";
      }
    }
    var blob = new Blob([AllString], { type: "text/plain" });
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "datanameTime.csv";
    a.click();
  }

  simulateTumor(d, i) {
    this.time = time;
    this.x = randomExponential(1);
    while (this.time < this.x) {
      if (time < 0 || time > this.x) { console.log("Zeitfehler"); break; }
      this.simulateMevent(d, i);
    }
    return;
  }

  getRandomEvent(d, i) {
    var num = Math.random();
    let s = 0;
    for (let key in geneList) {
      if (this.geneList[key].getWorkingTilt != true) {
        let temp = this.calculatePercentage(key);
        if (temp != "NaN" && this.geneList[key].getWorkingTilt != true) {
          temp = temp / 100;
          s += temp;
          if (num < s) {
            return key;
          }
        }
      }
    }

    return "NaN";
  }

  simulateMevent(d, i) {
    if (this.time < this.x) {
      let sumOfRates = 0;
      for (let key in geneList) {
        let rate = geneList[key].getWorkingValue(key);
        if (this.geneList[key].getWorkingTilt() != true) {
          sumOfRates += Math.exp(rate);
        }
      }
      if (sumOfRates != 0) {
        let timeToEvent = this.randomExponential(sumOfRates);
        if (this.time + timeToEvent < this.x) {
          let event = this.getRandomEvent();
          this.plusValue(event);
          this.time += timeToEvent;
          return;
        } else {
          this.time = this.x + 0.01;
          return;
        }
      } else {
        console.log("all mutated")
        this.time = this.x + 0.01;
        return;
      }
    } else return;
  }

  plusValue(key) {
    if (key != "NaN") {
      for (let tempKey in geneList) {
        if (key != tempKey) {
          this.geneList[tempKey].setWorkingValue(
            tempKey,
            parseFloat(this.geneList[tempKey].getWorkingValue(tempKey)) +
            parseFloat(this.geneList[key].getWorkingValue(tempKey))
          );
        }
      }
      this.geneList[key].counterPlusOne();
      this.geneList[key].setWorkingTilt(true);
    }
    if (key == "NaN") {
      this.time = this.x;
    }
  }

  trimTextToValid(text) {
    let hilfsstring = text;
    hilfsstring = hilfsstring.replaceAll(")", "");
    hilfsstring = hilfsstring.replaceAll("(", "");
    hilfsstring = hilfsstring.replaceAll("+", "plus");
    hilfsstring = hilfsstring.replaceAll("-", "");
    return hilfsstring;
  }

  calculatePercentage(key) {
    if (geneList[key].getWorkingTilt() == false) {
      let compleVal = 0;
      for (let i in geneList) {
        if (geneList[i].getWorkingTilt() == false) {
          compleVal = compleVal + Math.exp(parseFloat(geneList[i].getWorkingValue(i)));
        }
      }

      let worth = (Math.exp(parseFloat(geneList[key].getWorkingValue(key))) / compleVal) *
        100;
      return worth;
    } else {
      return "NaN";
    }
  }
}
