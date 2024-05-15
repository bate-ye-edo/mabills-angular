import {Component, Inject, Injectable} from '@angular/core';
import {TwoChoicesModalOptions, TwoChoicesModalOptionsName} from "./two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-two-options-modal',
  templateUrl: './two-choices-modal.component.html',
  styleUrls: ['./two-choices-modal.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class TwoChoicesModalComponent {
  title: string;
  message: string;
  acceptText: string;
  cancelText: string;

  constructor(@Inject(TwoChoicesModalOptionsName) protected options: TwoChoicesModalOptions,
              protected activeModal: NgbActiveModal) {
    this.title = options.title;
    this.message = options.message;
    this.acceptText = options.confirmText;
    this.cancelText = options.cancelText;
  }

  confirm(): void {
    if(this.options.confirmCallback){
      this.options.confirmCallback();
    }
    this.activeModal.dismiss();
  }

  cancel(): void {
    if(this.options.cancelCallback){
      this.options.cancelCallback();
    }
    this.activeModal.dismiss();
  }
}
