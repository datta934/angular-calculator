import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';
  mainText = "";
  subText = "";
  operand1: number;
  operand2: number;
  operator = "";
  calculationString = "";
  answered = false;
  operatorSet = false;

  pressKey(key: string) {
    if (key === "/" || key === "-" || key === "+" || key === "x") {
      const lastKey = this.mainText[this.mainText.length - 1];
      if (lastKey === "/" || lastKey === "-" || lastKey === "+" || lastKey === "x") {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainText === "")) {
        return;
      }
      this.operand1 = parseFloat(this.mainText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
  }

  getAnswer() {
    this.calculationString = this.mainText;
    this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
    if (this.operator === "/") {
      this.subText = this.mainText;
      this.mainText = (this.operand1 / this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = this.mainText.substr(0, 9);
      }
    }
    else if (this.operator === "*") {
      this.subText = this.mainText;
      this.mainText = (this.operand1 * this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = "ERROR"
        this.subText = "Range exceeded";
      }
    }
    else if (this.operator === "-") {
      this.subText = this.mainText;
      this.mainText = (this.operand1 - this.operand2).toString();
      this.subText = this.calculationString;
    }
    else if (this.operator === "+") {
      this.subText = this.mainText;
      this.mainText = (this.operand1 + this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = "ERROR"
        this.subText = "Range exceeded";
      }
    }
    else {
      this.subText = "Error: Invalid Operation";
    }
    this.answered = true;
  }

  allClear() {
    this.mainText = '';
    this.subText = '';
    this.operatorSet = false;
  }
}
