import { Injectable } from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {LoadingComponent} from "@core/loading/loading.component";
import {NO_BACK_DROP_MODAL} from "../shared/ModalOptions";

@Injectable({
  providedIn: 'root'
})
export class ShowLoadingService {
  private modalRef: NgbModalRef;
  constructor(private modal: NgbModal) { }

  showLoadingPage(): void {
    this.modalRef = this.modal.open(LoadingComponent, {...NO_BACK_DROP_MODAL, windowClass: 'loading-modal'});
  }

  hideLoadingPage(): void {
    if(this.modalRef){
      this.modalRef.close();
    }
  }
}
