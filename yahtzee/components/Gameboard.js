import { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import Header from './Header'
import Footer from './Footer'
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS
} from '../constants/Game'
import { Container, Row, Col } from 'react-native-flex-grid'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from '../style/style'

let board = [];

export default function Gameboard({ navigation, route }) {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);


  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));

  const [diceSpots, setDiceSpots] =
    useState(new Array(NBR_OF_DICES).fill(0));

  const [selectedDicePoints, setSelectedDicePoints] =
    useState(new Array(MAX_SPOT).fill(false));

  const [dicePointsTotal, setDicePointsTotal] =
    useState(new Array(MAX_SPOT).fill(0));

  const [playerName, setPlayerName] = useState('');

  const [totalPoints, setTotalPoints] = useState(0);

  const [roundNumber, setRoundNumber] = useState(0);

  const [hide, setHide] = useState(false);

  const [gotBonus, setGotBonus] = useState(false);

  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, [])

  const row = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    row.push(
      <Col key={"dice" + dice}>
        <Pressable
          key={"dice" + dice}
          onPress={() => selectDice(dice)}
        >
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={50}
            color={getDiceColor(dice)}
          >
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          key={"buttonsrow" + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            key={"buttonsRow" + diceButton}
            name={"numeric-" + (diceButton + 1) + "-circle"}
            size={35}
            color={getDicePointsColor(diceButton)}
          >
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot} style={styles.informationicon}>
        <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    );
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "darkred" : "crimson"
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "darkred" : "crimson"
  }

  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selected = [...selectedDices];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices =
          diceSpots.reduce
            ((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);

        setTotalPoints(totalPoints + points[i]);
        setRoundNumber(currentRound => currentRound + 1);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));

        console.log(roundNumber);
        if (roundNumber === 5) {
          setGameEndStatus(true);
        } 
        return points[i];
      }
      else {
        setStatus('You already selected points for ' + (i + 1))
      }
    }
    else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.")
    }
  }

  useEffect(() => {
    if (totalPoints >= BONUS_POINTS_LIMIT && !gotBonus) {
      setTotalPoints(totalPoints + BONUS_POINTS);
      setGotBonus(true);
    }
  }, [totalPoints, gotBonus]);

  const throwDices = () => {
    setHide(true);
    if (nbrOfThrowsLeft > 0) {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
          spots[i] = randomNumber;
          board[i] = 'dice-' + randomNumber;
        }
      }
      setDiceSpots(spots);
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    } else {
      setStatus("You need to select your points before next throw");
    }
  }

  const pointsToBonus = BONUS_POINTS_LIMIT - totalPoints;
  const displayBonusCounter = pointsToBonus > 0;

  const resetGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setStatus('Throw dices');
    setGameEndStatus(false);
    setRoundNumber(0);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    setTotalPoints(0)
    setHide(false);
    setGotBonus(false);
  }


  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }


  return (
    <>
      <Header />
      {!gameEndStatus ?
        <>
          <View>
          {!hide ?
              <>
                <View style={styles.informationicon}>
                <MaterialCommunityIcons
                    name="dice-multiple"
                    size={90}
                    color="crimson"
                />
                </View>
              </>
              :
              <>
                <Container>
                  <Row>{row}</Row>
                </Container>
              </>
            }
            <Text style={styles.text}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.text}>{status}</Text>
            <Pressable style={styles.pressable}
              onPress={() => throwDices()}>
              <Text style={styles.pressableText}>THROW DICES</Text>
            </Pressable>
            <Container>
              <Row>{pointsRow}</Row>
            </Container>
            <Container>
              <Row>{pointsToSelectRow}</Row>
            </Container>
            <Text style={styles.text}>Total points: {totalPoints}</Text>
            {displayBonusCounter &&
              <Text style={styles.text}>You are {pointsToBonus} points away from bonus</Text>}
            <Text style={styles.text}>Player name: {playerName}</Text>
          </View>
        </>
        :
        <>
          <View>
            <Pressable style={styles.pressable}
              onPress={() => resetGame()}>
              <Text style={styles.pressableText}>Restart</Text>
            </Pressable>
            <Text style={styles.text}>Total points: {totalPoints}</Text>
          </View>
        </>
      }
      <Footer />
    </>
  )
}