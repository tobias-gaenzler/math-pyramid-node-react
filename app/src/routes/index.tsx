import React from "react"
import PathConstants from "./pathConstants"

const Play = React.lazy(() => import("../components/MathPyramidGame/MathPyramidGame"))
const Help = React.lazy(() => import("../components/HelpView/HelpView"))
const Config = React.lazy(() => import("../components/ConfigView/ConfigView"))

const routes = [
    { path: PathConstants.PLAY, element: <Play /> },
    { path: PathConstants.HELP, element: <Help /> },
    { path: PathConstants.CONFIG, element: <Config /> }
]

export default routes