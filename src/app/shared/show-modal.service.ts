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
      injector: Injector.create({providers: this.getProviders(modalOptions, modalProviders)})
    });
  }
  private getProviders(modalOptions: TwoChoicesModalOptionsModel, modalProviders: ModalProviderModel[] = []): ModalProviderModel[] {
    return [
      { provide: TwoChoicesModalOptionsName, useValue: this.getTwoChoicesModalOptionsModel(modalOptions) },
      ...modalProviders
    ];
  }
  private getTwoChoicesModalOptionsModel(modalOptions: TwoChoicesModalOptionsModel): TwoChoicesModalOptionsModel {
    this.setTimeoutIfNeeded(modalOptions);
    return <TwoChoicesModalOptionsModel>{
      ...modalOptions
    };
  }

  private setTimeoutIfNeeded(modalOptions: TwoChoicesModalOptionsModel) {
    if(modalOptions.autoCloseOptions){
      setTimeout(()=>{
        modalOptions.autoCloseOptions.closeAction();
        this.modal.dismissAll();
      }, modalOptions.autoCloseOptions.secondsToClose*1000);
    }
  }

  showModal(modalComponent: any, options?: NgbModalOptions): NgbModalRef {
    return this.modal.open(modalComponent, options || BACKDROP_MODAL);
  }

}
