import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';

const ListaEquipoIntegrantes = (props) => {
    return <List>
        {
            props.integrantes.map((integrante) => {
                return <ListItem key={integrante.codigo}>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={ String.raw`codigo: ${integrante.codigo} nombre: ${integrante.nombre}` } />
                </ListItem>
            })
        }
    </List>
}

export default ListaEquipoIntegrantes