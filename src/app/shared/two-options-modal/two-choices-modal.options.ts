export interface TwoChoicesModalOptions {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmCallback?: (params?:any) => void;
  cancelCallback?: (params?:any) => void;
  autoCloseOptions?: AutoCloseModalOptions;
}
export const TwoChoicesModalOptionsName: string = "TwoChoicesModalOptions";

interface AutoCloseModalOptions {
  secondsToClose: number;
  closeAction: () => void;
}
