export interface TwoChoicesModalOptionsModel {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmCallback?: (params?:any) => void;
  cancelCallback?: (params?:any) => void;
  closeOptions?: CloseOptions;
}
export const TwoChoicesModalOptionsName: string = "TwoChoicesModalOptions";

interface CloseOptions {
  secondsToClose: number;
  defaultCloseAction: () => void;
}
