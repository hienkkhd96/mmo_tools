import {create} from 'zustand';
type State = {
  isShow: boolean;
  message: string;
  onAction: () => void | null;
  setShowDialog: (
    message: string,
    {
      action,
    }: {
      action: () => void;
    },
  ) => void;
  onCloseDialog: () => void;
};

export const useDialogStore = create<State>(set => ({
  isShow: false,
  message: '',
  setShowDialog: (message: string, {action}) => {
    set({
      onAction: action,
    });
    set({isShow: true, message});
  },
  onAction: () => null,
  onCloseDialog: () => {
    set({
      isShow: false,
    });
  },
}));
