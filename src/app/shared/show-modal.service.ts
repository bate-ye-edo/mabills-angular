import {Injectable, Injector} from '@angular/core';
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {TwoChoicesModalComponent} from "./two-options-modal/two-choices-modal.component";
import {TwoChoicesModalOptionsModel,TwoChoicesModalOptionsName} from "./two-options-modal/two-choices-modal-options.model";

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {

  constructor(private modal: NgbModal) { }

  showTwoOptionsModal(options: NgbModalOptions, modalOptions: TwoChoicesModalOptionsModel): void {
    modalOptions = this.getTwoChoicesModalOptionsModel(modalOptions);
    this.modal.open(TwoChoicesModalComponent, {
      ...options,
      injector: Injector.create({providers: [{provide: TwoChoicesModalOptionsName, useValue: modalOptions}]})
    });
  }

  private getTwoChoicesModalOptionsModel(modalOptions: TwoChoicesModalOptionsModel): TwoChoicesModalOptionsModel {
    this.setTimeoutIfNeeded(modalOptions);
    return <TwoChoicesModalOptionsModel>{
      ...modalOptions,
      cancelCallback: ()=> this.callCallbackAndCloseModal(modalOptions.cancelCallback),
      confirmCallback: ()=> this.callCallbackAndCloseModal(modalOptions.confirmCallback)
    };
  }

  private callCallbackAndCloseModal(callBack: ()=>void){
    if(callBack){
      callBack();
    }
    this.modal.dismissAll();
  }

  private setTimeoutIfNeeded(modalOptions: TwoChoicesModalOptionsModel) {
    if(modalOptions.closeOptions){
      setTimeout(()=>{
        modalOptions.closeOptions.defaultCloseAction();
        this.modal.dismissAll();
      }, modalOptions.closeOptions.secondsToClose*1000);
    }
  }

}
