import { Button, Container, Snackbar, TextField } from "@mui/material"
import { useRef, useState } from "react"
import { useGameConfigContext } from "../../context/GameConfigContextProvider"

function ConfigView() {
  const { size, setSize, maxValue, setMaxValue } = useGameConfigContext()
  const [sizeError, setSizeError] = useState<boolean>(false)
  const [maxValueError, setMaxValueError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("Changes Saved")
  const [open, setOpen] = useState(false)
  const sizeInputRef = useRef<HTMLInputElement>(null)
  const maxValueInputRef = useRef<HTMLInputElement>(null)

  const onSave = () => {
    let hasError = false

    if (sizeInputRef.current?.value &&
      (parseInt(sizeInputRef.current.value) < 3 ||
        parseInt(sizeInputRef.current.value) > 10)) {
      console.log("size error")
      setSizeError(true)
      hasError = true
    } else {
      setSizeError(false)
    }
    if (maxValueInputRef.current?.value &&
      (parseInt(maxValueInputRef.current.value) < 100 ||
        parseInt(maxValueInputRef.current.value) > 10000)) {
      setMaxValueError(true)
      hasError = true
    } else {
      setMaxValueError(false)
    }
    if (sizeInputRef.current?.value && maxValueInputRef.current?.value && !hasError) {
      setMaxValue(maxValueInputRef.current.value)
      setSize(sizeInputRef.current.value)
      setOpen(true)
      setMessage("Changes saved!")
    }
    if (hasError) {
      setMessage("Please correct invalid values.")
      setOpen(true)
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const restrictKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // allow only numbers, Backspace and Tab and arrow
    if (!/[0-9]/.test(event.key)
      && !/Backspace/.test(event.key)
      && !/Tab/.test(event.key)
      && !/ArrowLeft/.test(event.key)
      && !/ArrowRight/.test(event.key)
      && !/ArrowUp/.test(event.key)
      && !/ArrowDown/.test(event.key)) {
      event.preventDefault()
    }
  }
  return (
    <Container
      sx={{
        height: "100%",
        display: "grid",
        justifyContent: "center",
        justifyItems: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h3>Config</h3>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
      />
      <TextField
        id="input-with-icon-textfield"
        label="Size (3 - 20)"
        inputRef={sizeInputRef}
        defaultValue={size}
        variant="standard"
        inputProps={{ type: "number" }}
        error={sizeError}
        onKeyDown={restrictKeys}
      />
      <TextField
        id="input-with-icon-textfield"
        label="Max Value (100 - 10 000)"
        inputRef={maxValueInputRef}
        defaultValue={maxValue}
        variant="standard"
        inputProps={{ type: "number" }}
        error={maxValueError}
        onKeyDown={restrictKeys}
      />
      <Button onClick={onSave}>Update</Button>
    </Container>
  )
}

export default ConfigView
