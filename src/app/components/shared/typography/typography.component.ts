import { Component, Input, OnInit } from "@angular/core";
import { TypoGraphyType } from "src/app/utils/DisplayTypeResolver";
import { StringBuilder } from "src/app/utils/StringBuilder";

@Component({
  selector: "typography",
  templateUrl: "./typography.component.html",
  styleUrls: ["./typography.component.css"]
})
export class TypographyComponent implements OnInit {

  @Input() type: TypoGraphyType = TypoGraphyType.STRING;
  @Input() content: string = "";
  @Input() additionalValues: any;

  isCustomer: boolean = false;
  customerAddress: string = "";

  constructor() { }

  ngOnInit(): void {
    this.buildAddress();
  }

  buildAddress() {
    const customerAdd = this.additionalValues?.customerAddress;
    const ValuesNotRequired = ["firstName", "lastName", "email", "phoneNumber"];
    this.customerAddress = StringBuilder.buildStringFromValues(customerAdd, ValuesNotRequired, "address");
  }

  getContentStyle() {
    const typoType = <string>(this.type);
    let styleClass = "";
    if (typoType === "title") {
      styleClass = "font-medium";
    } else if (typoType === "customer" && this.content) {
      this.isCustomer = true;
      styleClass = "font-medium";
    }
    return styleClass;
  }
}
