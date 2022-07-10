import React, { useEffect, useRef, useState, ReactElement } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button } from 'react-native';
import { Rating } from 'react-native-ratings';
import { store } from '../store';
import { observer } from 'mobx-react-lite';

// type Props = {
//   visible: boolean;

//   onOK: () => void;
//   onCancel: () => void;
// };

export const RateDialog = observer(() => {
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={store.showingRegisterPoop}
      onRequestClose={() => {
        store.handleCancelRegisterPoop();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitleText}>How was your 💩?</Text>

          <Text style={styles.modalText}>Size:</Text>

          <Rating
            startingValue={store.rating.size}
            onFinishRating={store.handleRateSize}
            fractions={false}
            />

          <Text style={styles.modalText}>Consistency:</Text>

          <Rating
            startingValue={store.rating.consistency}
            onFinishRating={store.handleRateConsistency}
            fractions={false}
            />

        <Pressable
            style={[styles.button, styles.buttonTellTheWorld]}

            onPress={store.handleRegisterPoop}>
            <Text style={styles.textStyle}>Tell the world!</Text>
          </Pressable>

          <Button
            // style={[styles.button, styles.buttonClose]}
            onPress={store.handleCancelRegisterPoop}
            color="#841584"
            title='Never mind'>
            {/* <Text style={styles.textStyle}>Tell the world!</Text> */}
          </Button>
        </View>
      </View>
    </Modal>
    // <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => props.onClose()}>
    //   <Text style={styles.textStyle}>Show Modal</Text>
    // </Pressable>
    // </View>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonTellTheWorld: {
    marginTop: 50,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
  },
  modalTitleText: {
    marginBottom: 15,
    fontSize: 24,
    textAlign: 'center',
  },
});