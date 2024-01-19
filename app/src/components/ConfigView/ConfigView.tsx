import { Container } from "@mui/material"

function ConfigView() {
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
      set size and max value
    </Container>
  )
}

export default ConfigView
