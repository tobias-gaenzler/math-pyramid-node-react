import { ReactNode, createContext, useContext, useState } from "react"
import { ConfigService } from "../service/ConfigService"

const PYRAMID_SIZE: string = ConfigService.getConfig("PYRAMID_SIZE")
const MAX_VALUE: string = ConfigService.getConfig("MAX_VALUE")

export interface GameConfigContextState {
    size: string
    maxValue: string
    setSize: React.Dispatch<React.SetStateAction<string>>
    setMaxValue: React.Dispatch<React.SetStateAction<string>>
}

export const GameConfigContext = createContext<GameConfigContextState>(
    {} as GameConfigContextState
)

export const useGameConfigContext = () => useContext(GameConfigContext)

const GameConfigContextProvider = (props: { children?: ReactNode }) => {
    const [pyramidSize, setPyramidSize] = useState(PYRAMID_SIZE)
    const [pyramidMaxValue, setPyramidMaxValue] = useState(MAX_VALUE)

    return (
        <GameConfigContext.Provider value={{
            size: pyramidSize,
            setSize: setPyramidSize,
            maxValue: pyramidMaxValue,
            setMaxValue: setPyramidMaxValue
        }}>
            {props.children}
        </GameConfigContext.Provider>
    )
}

export default GameConfigContextProvider

