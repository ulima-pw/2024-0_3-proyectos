import { Button, Dialog, DialogActions, DialogContent, DialogTitle, 
    TextField } from "@mui/material"
import { useState } from "react";

import TablaIntegrantes from "./TablaIntegrantes";

const ModalFormularioEquipo = (props) => {
    const [nombreIntegrante, setNombreIntegrante] = useState("")
    const [codigoIntegrante, setCodigoIntegrante] = useState("")
    const [listaIntegrantes, setListaIntegrantes] = useState([])

    const onNombreIntegranteChangeHandler = (event) => {
        setNombreIntegrante(event.target.value)
    }

    const onCodigoIntegranteChangeHandler = (event) => {
        setCodigoIntegrante(event.target.value)
    }

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
                sx={ { mr : 1 } }
                value={ nombreIntegrante }
                onChange={ onNombreIntegranteChangeHandler } />
            <TextField label="Código"
                variant="outlined"
                sx={ { mr : 1 } }
                value={ codigoIntegrante }
                onChange={ onCodigoIntegranteChangeHandler } />
            <Button variant="contained">
                +
            </Button>
            <TablaIntegrantes integrantes={ listaIntegrantes }/>

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