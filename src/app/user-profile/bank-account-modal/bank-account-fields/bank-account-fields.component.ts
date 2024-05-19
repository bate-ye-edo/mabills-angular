import {Component, Inject} from '@angular/core';
import {TwoChoicesModalComponent} from "../../../shared/two-options-modal/two-choices-modal.component";
import {
  TwoChoicesModalOptions,
  TwoChoicesModalOptionsName
} from "../../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-bank-account-fields',
  templateUrl: './bank-account-fields.component.html',
  styleUrls: ['./bank-account-fields.component.css']
})
export class BankAccountFieldsComponent extends TwoChoicesModalComponent {
  static readonly IBAN_REGEX: string = '^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$';
  ibanFormControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(BankAccountFieldsComponent.IBAN_REGEX)]);

  constructor(@Inject(TwoChoicesModalOptionsName) override options: TwoChoicesModalOptions,
              override activeModal: NgbActiveModal) {
    super(options, activeModal);
  }

  override confirm(): void {
    if(this.options.confirmCallback){
      this.options.confirmCallback(this.ibanFormControl.value);
    }
    this.activeModal.dismiss();
  }
}
