import { Button, Dialog, DialogActions, DialogContent, DialogTitle, 
    TextField } from "@mui/material"

import TablaIntegrantes from "./TablaIntegrantes";

const ModalFormularioEquipo = (props) => {
    return <Dialog
        open={ props.modalOpen }
        onClose={ props.onModalClose }>
        <DialogTitle >
            Nuevo Equipo
        </DialogTitle>
        <DialogContent>
            <TextField label="Nombre"
                variant="outlined" />
            <hr />
            <h4>Integrantes</h4>
            <TextField label="Nombre Integrante"
                variant="outlined"
                sx={ { mr : 1 } } />
            <TextField label="Código"
                variant="outlined"
                sx={ { mr : 1 } } />
            <Button variant="contained">
                +
            </Button>
            <TablaIntegrantes />

        </DialogContent>
        <DialogActions>
            <Button variant="contained">
                Guardar
            </Button>
            <Button variant="contained">
                Cancelar
            </Button>
        </DialogActions>
    </Dialog>
}

export default ModalFormularioEquipo