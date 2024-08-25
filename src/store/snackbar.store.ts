import {create} from 'zustand';
type State = {
  isShow: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  setShowSnackbar: (isShow: boolean) => void;
  setMessage: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
  ) => void;
  closeSnackbar: () => void;
};
const defaultState: Partial<State> = {
  isShow: false,
  message: '',
  type: 'info',
};
export const useSnackbarStore = create<State>(set => ({
  isShow: false,
  message: '',
  type: 'info',
  setShowSnackbar: (isShow: boolean) =>
    set({isShow, type: 'info', message: ''}),
  setMessage: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
  ) => set({isShow: true, message, type}),
  closeSnackbar: () => set({...defaultState, isShow: false}),
}));
