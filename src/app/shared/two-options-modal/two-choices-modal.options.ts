import {InjectionToken} from "@angular/core";

export interface TwoChoicesModalOptions {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmCallback?: (params?:any) => void;
  cancelCallback?: (params?:any) => void;
  autoCloseOptions?: AutoCloseModalOptions;
}
const TwoChoicesModalOptionsName: string = "TwoChoicesModalOptions";

export const TwoChoicesModalOptionsSecret: InjectionToken<TwoChoicesModalOptions> =
  new InjectionToken<TwoChoicesModalOptions>(TwoChoicesModalOptionsName);

interface AutoCloseModalOptions {
  secondsToClose: number;
  closeAction: () => void;
}
