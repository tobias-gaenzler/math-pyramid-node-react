import React, { useEffect, useState } from "react"
import { MathPyramidFieldHandler } from "../MathPyramidField/MathPyramidField"
import { Button } from "@mui/material"
import { MathPyramidModelData, Model } from "../../model/Model"
import { GameSolvedDialog } from "../GameSolvedDialog/GameSolvedDialog"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MathPyramid from "../MathPyramidLayout/MathPyramidLayout"
import { useUserNameContext } from "../../context/UserNameContextProvider"
import { useWebSocketContext } from "../../context/WebSocketContextProvider"


const MathPyramidGame: React.FC = () => {
  const { userName } = useUserNameContext()
  const [model, setModel] = useState<Model | null>(null)
  const [solvedBy, setSolvedBy] = useState<string>("")
  const [startTime, setStartTime] = useState<number>(0)
  const [solveTime, setSolveTime] = useState<number>(0)
  const { sendSolvedMessage, lastJsonMessage, sendRestart, showErrorMessage, setShowErrorMessage } = useWebSocketContext()

  useEffect(() => {
    // Execute when a new WebSocket message is received
    if (lastJsonMessage) {
      setShowErrorMessage(false)
      const message = JSON.stringify(lastJsonMessage)
      if (message.includes("\"action\":\"message\"")) {
        console.log(`Received message: ${message}`)
        setSolvedBy(JSON.parse(message).sender)
        setStartTime(0)
        setSolveTime(JSON.parse(message).solveTime)
      } else {
        console.log(`[${new Date().toISOString()}]: Game started, received new model`)
        const newModel = new Model(JSON.parse(message) as MathPyramidModelData)
        setModel(newModel)
        setSolvedBy("")
        setStartTime(new Date().getTime())
        setSolveTime(0)
      }
    }
  }, [lastJsonMessage, setShowErrorMessage])

  const inputHandler: MathPyramidFieldHandler = (
    index: number,
    inputValue: string
  ): void => {
    if (model?.solutionValues && model.solutionValues[index]?.toString() === inputValue) {
      model.userInput[index] = parseInt(inputValue)
      if (model.isSolved()) {
        const solveTime = (new Date().getTime() - startTime)
        sendSolvedMessage(solveTime)
      }
    }
  }

  const restart = () => {
    sendRestart()
  }

  const closePopup = () => {
    setSolvedBy("")
    setModel(null)
    setStartTime(0)
  }

  return showErrorMessage ?
    (<ErrorMessage restart={restart} />) :
    (<>
      <MathPyramid model={model} inputHandler={inputHandler} />
      <GameSolvedDialog
        onClose={closePopup}
        solvedBy={solvedBy}
        userName={userName}
        solveTime={solveTime}
      />
      <Button color="primary" variant="contained" onClick={restart}>
        {model == null ? "Start" : "Restart"}
      </Button>
    </>)
}

export default MathPyramidGame
