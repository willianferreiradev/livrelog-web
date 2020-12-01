import * as toast from 'toastr';

/**
 * @param message - Message to be displayed
 * @param title - Message title
 * @param positionClass - Position where the toastr will be displayed
 */
export function showToastError(message: string, title: string, positionClass = 'toast-bottom-right'): void {
  toastr.error(message, title, { positionClass, progressBar: true });
}

/**
 * @param message - Message to be displayed
 * @param title - Message title
 * @param positionClass - Position where the toastr will be displayed
 */
export function showToastSuccess(message: string, title: string, positionClass = 'toast-bottom-right'): void  {
  toastr.success(message, title, { positionClass, progressBar: true });
}

