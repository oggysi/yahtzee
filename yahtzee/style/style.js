import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'darkred',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'darkred',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontFamily: "serif"
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: "serif"
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  pressable: {
    backgroundColor: "crimson",
    borderRadius: 3,
    padding: 5,
    margin: 10,
  },
  pressableText: {
    color: "white",
    textAlign: "center",
    fontFamily: "serif"
  },
  text: {
    padding: 5,
    textAlign: "center",
    fontFamily: "serif"
  },
  textinput: {
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderRadius: 3,
    color: "white",
    fontFamily: "serif"
  },
  informationicon: {
    alignItems: "center"
  }
});

