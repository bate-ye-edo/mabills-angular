import {NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";

export const NO_BACK_DROP_MODAL: NgbModalOptions = {
  backdrop: "static",
  keyboard: false,
  centered: true,
}

export const NO_BACK_DROP_MODAL_MEDIUM_SIZE: NgbModalOptions = {
  ...NO_BACK_DROP_MODAL,
  size: 'md'
}

export const BACKDROP_MODAL: NgbModalOptions = {
  backdrop: true,
  keyboard: true,
  centered: true
}
