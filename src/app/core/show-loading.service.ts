import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoadingComponent} from "@core/loading/loading.component";

@Injectable({
  providedIn: 'root'
})
export class ShowLoadingService {

  constructor(private modal: NgbModal) { }

  showLoadingPage() {
    this.modal.open(LoadingComponent, {backdrop: 'static', keyboard: false, centered: true, windowClass: 'loading-modal'});
  }

  hideLoadingPage() {
    this.modal.dismissAll();
  }
}
