
import React, { useEffect, useCallback, useMemo, useRef, forwardRef, useImperativeHandle, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import Location from '../../Location/locations';
import { DataContext } from '../../Context/DataContex';


export const ModalLocc = forwardRef((props, ref) => {

  const { idDireccion } = useContext(DataContext);

  const renderBackdop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present() {
      bottomSheetModalRef.current?.present();
    },
  }));



  // Cerrar el modal automáticamente cuando la dirección cambie
  useEffect(() => {
    if (idDireccion) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [idDireccion]);

  // variables
  const snapPoints = useMemo(() => ['70%', '70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);

    console.log("yes", idDireccion);

  }, []);

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          borderRadius: 40,
        }}
        backdropComponent={renderBackdop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Location />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});


const styles = StyleSheet.create(({

  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },


}));