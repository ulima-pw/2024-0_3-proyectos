import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
    TextField } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";

import TablaIntegrantes from "./TablaIntegrantes";

const ModalFormularioEquipo = (props) => {
    const [nombreEquipo, setNombreEquipo] = useState("")
    const [anhoEquipo, setAnhoEquipo] = useState(2014)
    const [nombreIntegrante, setNombreIntegrante] = useState("")
    const [codigoIntegrante, setCodigoIntegrante] = useState("")
    const [listaIntegrantes, setListaIntegrantes] = useState([])
    const [cursosRegistrados, setCursosRegistrados] = useState([])
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null)
    const [cursoSeleccionadoInput, setCursoSeleccionadoInput] = useState("")
    const [cursosDisponibles, setCursosDisponibles] = useState([])

    const onNombreIntegranteChangeHandler = (event) => {
        setNombreIntegrante(event.target.value)
    }

    const onCodigoIntegranteChangeHandler = (event) => {
        setCodigoIntegrante(event.target.value)
    }

    const onNombreEquipoChangeHandler = (event) => {
        setNombreEquipo(event.target.value)
    }

    const onAnhoEquipoChangeHandler = (event) => {
        setAnhoEquipo(event.target.value)
    }

    const agregarIntegranteOnClick = () => {
        if (nombreIntegrante === "" || codigoIntegrante === "") {
            return
        }

        const listaClonada = [...listaIntegrantes] // clonamos
        listaClonada.push({
            nombre : nombreIntegrante,
            codigo : codigoIntegrante
        })
        setListaIntegrantes(listaClonada)
        setNombreIntegrante("")
        setCodigoIntegrante("")
    }

    const eliminarIntegranteOnClick = (indiceAEliminar) => {
        const listaClonada = [...listaIntegrantes]
        listaClonada.splice(indiceAEliminar, 1)
        setListaIntegrantes(listaClonada)
    }

    const registrarEquipo = () => {
        props.onRegistrarEquipo({
            nombre : nombreEquipo,
            anho : anhoEquipo,
            integrantes: listaIntegrantes
        })
    }

    useEffect(() => {
        setCursosDisponibles(props.cursosDisponibles)
    }, [props.cursosDisponibles])

    console.log("cursosDisponibles:", cursosDisponibles)

    return <Dialog
        open={ props.modalOpen }
        onClose={ props.onModalClose }>
        <DialogTitle >
            Nuevo Equipo
        </DialogTitle>
        <DialogContent>
            <TextField label="Nombre Equipo"
                variant="outlined"
                value={ nombreEquipo }
                onChange={ onNombreEquipoChangeHandler } />
            <TextField label="Anho"
                variant="outlined"
                value={ anhoEquipo }
                onChange={ onAnhoEquipoChangeHandler } />
            <hr/>
            <div>
                <Autocomplete 
                    options={ cursosDisponibles.map((curso) =>{
                        return { label : curso.nombre, id: curso.id } 
                    }) }
                    sx={{ width: 300, display : "inline-flex", mr : 2 }}
                    renderInput={(params) => 
                        <TextField {...params}
                            label="Cursos" /> }
                    value={ cursoSeleccionado }
                    onChange={ (event, newValue) => {
                        setCursoSeleccionado(newValue)
                    } }
                    inputValue={ cursoSeleccionadoInput }
                    onInputChange={ (event, newInputValue) => {
                        setCursoSeleccionadoInput(newInputValue)
                    } }
                    />
                <Button variant="contained"
                    onClick={ () => {
                        const cursosRegistradosClon = [...cursosRegistrados]
                        cursosRegistradosClon.push(cursoSeleccionado)

                        const cursosDispFiltrados = cursosDisponibles.filter( (c) => {
                            return c.id !== cursoSeleccionado.id 
                        })

                        setCursoSeleccionado(null)
                        setCursoSeleccionadoInput("")
                        setCursosDisponibles(cursosDispFiltrados)
                        setCursosRegistrados(cursosRegistradosClon)
                    } }>
                    +
                </Button>
            </div>
            <ul>
                {
                    cursosRegistrados.map((cr) => {
                        return <li>{ cr.label }</li>
                    })
                }
            </ul>

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
            <Button variant="contained"
                onClick={ agregarIntegranteOnClick }>
                +
            </Button>
            <TablaIntegrantes integrantes={ listaIntegrantes }
                eliminarIntegranteOnClick={ eliminarIntegranteOnClick }/>

        </DialogContent>
        <DialogActions>
            <Button variant="contained"
                onClick={ registrarEquipo }>
                Guardar
            </Button>
            <Button variant="contained">
                Cancelar
            </Button>
        </DialogActions>
    </Dialog>
}

export default ModalFormularioEquipo