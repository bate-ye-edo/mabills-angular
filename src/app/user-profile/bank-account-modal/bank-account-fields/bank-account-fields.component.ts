import {Component, inject} from '@angular/core';
import {TwoChoicesModalComponent} from "../../../shared/two-options-modal/two-choices-modal.component";
import {TwoChoicesModalOptionsSecret} from "../../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";
import {PATTERNS} from "../../../shared/patterns";

@Component({
  selector: 'app-bank-account-fields',
  templateUrl: './bank-account-fields.component.html',
  styleUrls: ['./bank-account-fields.component.css']
})
export class BankAccountFieldsComponent extends TwoChoicesModalComponent {
  ibanFormControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(PATTERNS.IBAN)]);

  constructor() {
    super(inject(TwoChoicesModalOptionsSecret), inject(NgbActiveModal));
  }

  override confirm(): void {
    if(this.options.confirmCallback){
      this.options.confirmCallback(this.ibanFormControl.value);
    }
    this.activeModal.dismiss();
  }
}
