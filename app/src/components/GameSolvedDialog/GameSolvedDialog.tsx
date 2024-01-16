import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent } from "@mui/material"

type Props = {
  onClose: () => void
  solvedBy: string
  userName: string
  solveTime: number
}
const GameSolvedDialog: React.FC<Props> = ({ onClose, solvedBy, userName, solveTime }: Props) => {
  const solvedByCurrentPlayer = (userName === solvedBy)
  const formattedSolveTime = new Intl.NumberFormat(navigator.language ? navigator.language : "en-us", { minimumFractionDigits: 3 }).format(solveTime / 1000)
  const title = (solvedByCurrentPlayer ? "YOU" : solvedBy) + " solved the pyramid in " + formattedSolveTime + " sec!"
  const severity = solvedByCurrentPlayer ? "success" : "error"

  return (
    <Dialog data-testid="gameSolvedDialog" open={solvedBy !== ""}>
      <DialogContent>
        <Alert variant="filled" severity={severity}>
          <AlertTitle>{title}</AlertTitle>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export { GameSolvedDialog }
