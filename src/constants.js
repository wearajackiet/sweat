import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import * as firebase from 'firebase';

export const colors = {
  white: '#ffffff',
  black: '#222222',
  trueblack: '#000000',
  teal: '#3dae9d',
  darkteal: '#419084',
  blue: '#3697d5',
  darkblue: '#5171c4',
  pink: '#f45f94',
  darkpink: '#de387a',
  purple: '#89348d',
  darkpurple: '#7d1e81'
};

export const fonts = {
  sofia: 'Sofia Pro'
}

export const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const navStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darkblue,
    paddingTop: 20,
    height: 64
  },
  menu: {
    height: 30
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontFamily: fonts.sofia
  },
  right: {
    height: 30
  }
});

export const firebaseConfig = {
  apiKey: 'AIzaSyDV0GTtCGUXHPFVElQsbA0bqSLAQPOR9pk',
  authDomain: 'sweat-4462f.firebaseapp.com',
  databaseURL: 'https://sweat-4462f.firebaseio.com',
  storageBucket: 'sweat-4462f.appspot.com',
  messagingSenderId: '1064730361481'
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export var database = firebase.database();