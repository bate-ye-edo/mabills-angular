import {Injectable, Injector} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {TwoChoicesModalComponent} from "./two-options-modal/two-choices-modal.component";
import {TwoChoicesModalOptionsModel,TwoChoicesModalOptionsName} from "./two-options-modal/two-choices-modal-options.model";
import {BACKDROP_MODAL} from "./ModalOptions";
import {ModalProviderModel} from "./ModalProvider.model";

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {
  constructor(private modal: NgbModal) { }

  showTwoOptionsModal(options: NgbModalOptions, modalOptions: TwoChoicesModalOptionsModel, component?: any, modalProviders?: ModalProviderModel[]): NgbModalRef {
    modalOptions = this.getTwoChoicesModalOptionsModel(modalOptions);
    return this.modal.open(component || TwoChoicesModalComponent, {
      ...options,
      injector: Injector.create({providers: [
          { provide: TwoChoicesModalOptionsName, useValue: modalOptions },
          ...modalProviders
        ]})
    });
  }

  private getTwoChoicesModalOptionsModel(modalOptions: TwoChoicesModalOptionsModel): TwoChoicesModalOptionsModel {
    this.setTimeoutIfNeeded(modalOptions);
    return <TwoChoicesModalOptionsModel>{
      ...modalOptions
    };
  }

  private setTimeoutIfNeeded(modalOptions: TwoChoicesModalOptionsModel) {
    if(modalOptions.closeOptions){
      setTimeout(()=>{
        modalOptions.closeOptions.defaultCloseAction();
        this.modal.dismissAll();
      }, modalOptions.closeOptions.secondsToClose*1000);
    }
  }

  showModal(modalComponent: any, options?: NgbModalOptions): NgbModalRef {
    return this.modal.open(modalComponent, options || BACKDROP_MODAL);
  }

}
