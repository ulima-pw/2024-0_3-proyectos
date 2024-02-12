import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"
import ListaEquipoIntegrantes from "./ListaEquipoIntegrantes"

const CardEquipo = (props) => {
    return <Card variant="outlined">
        <CardContent>
            <Typography variant="h5" component="div">
                { props.nombreEquipo }
            </Typography>
            <ListaEquipoIntegrantes integrantes={ props.listaIntegrantes}/>
        </CardContent>
        <CardActions>
            <Button variant="text">
                Tareas
            </Button>
            <Button variant="text"
                onClick={ () => {
                    props.eliminarEquipo(props.idEquipo)
                } }>
                Eliminar
            </Button>
        </CardActions>
    </Card>
}

export default CardEquipo