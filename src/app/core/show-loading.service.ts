import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoadingComponent} from "../shared/components/loading/loading.component";
// TODO: implement this loading service in each http call.
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
