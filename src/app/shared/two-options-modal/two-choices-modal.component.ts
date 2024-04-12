import {Component, Inject} from '@angular/core';
import {TwoChoicesModalOptionsModel, TwoChoicesModalOptionsName} from "./two-choices-modal-options.model";

@Component({
  selector: 'app-two-options-modal',
  templateUrl: './two-choices-modal.component.html',
  styleUrls: ['./two-choices-modal.component.css']
})
export class TwoChoicesModalComponent {
  title: string;
  message: string;
  acceptText: string;
  cancelText: string;

  constructor(@Inject(TwoChoicesModalOptionsName) private options: TwoChoicesModalOptionsModel) {
    this.title = options.title;
    this.message = options.message;
    this.acceptText = options.confirmText;
    this.cancelText = options.cancelText;
  }

  confirm(): void {
    this.options.confirmCallback();
  }

  cancel(): void {
    this.options.cancelCallback();
  }
}
