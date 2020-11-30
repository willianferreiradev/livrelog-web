import toastr from 'toastr';

/**
 * @param message - Message to be displayed
 * @param title - Message title
 * @param positionClass - Position where the toastr will be displayed
 */
const showToastError = (message: string, title: string, positionClass = 'toast-bottom-right') => {
  toastr.error(message, title, { positionClass, progressBar: true });
};

/**
 * @param message - Message to be displayed
 * @param title - Message title
 * @param positionClass - Position where the toastr will be displayed
 */
const showToastSuccess = (message: string, title: string, positionClass = 'toast-bottom-right') => {
  toastr.success(message, title, { positionClass, progressBar: true });
};

export { showToastError, showToastSuccess };
