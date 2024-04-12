export interface TwoChoicesModalOptionsModel {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  closeOptions?: CloseOptions;
}
export const TwoChoicesModalOptionsName: string = "TwoChoicesModalOptions";

interface CloseOptions {
  secondsToClose: number;
  defaultCloseAction: () => void;
}
