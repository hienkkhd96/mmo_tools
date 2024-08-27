import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, PaperProvider, Text} from 'react-native-paper';
import {useDialogStore} from '../../store/dialog.store';
type Props = {};

const GlobalDialog = (props: Props) => {
  const dialogStore = useDialogStore();
  const {isShow, message, onAction, setShowDialog, onCloseDialog} = dialogStore;
  return (
    <Portal>
      <Dialog visible={isShow} onDismiss={onCloseDialog}>
        <Dialog.Title>Cảnh báo</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCloseDialog}>Huỷ</Button>
          <Button onPress={onAction}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default GlobalDialog;
