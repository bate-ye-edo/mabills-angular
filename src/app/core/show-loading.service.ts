import {Injectable} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {LoadingComponent} from "@core/loading/loading.component";
import {NO_BACK_DROP_MODAL} from "../shared/modal-options";

@Injectable({
  providedIn: 'root'
})
export class ShowLoadingService {
  constructor(private modal: NgbModal) { }

  showLoadingPage(): NgbModalRef {
    return this.modal.open(LoadingComponent, {...NO_BACK_DROP_MODAL, windowClass: 'loading-modal'});
  }

  hideLoadingPage(modalRef: NgbModalRef): void {
    modalRef.close();
  }
}
