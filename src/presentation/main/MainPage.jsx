import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button } from "@mui/material"
import { Container } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import GrillaEquipos from "./components/GrillaEquipos";
import ModalFormularioEquipo from "./components/ModalFormularioEquipo";
import { useLocation } from "react-router-dom";




const MainPage = () => {
    const [dataEquipos, setDataEquipos] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const location = useLocation()

    const obtenerEquiposHTTP = async () => {    
        /*fetch("http://localhost:3000/equipos.json").then( (response) => {
            return response.json()
        }).then( (data) => {
            setDataEquipos(data)
        } ).catch( (error) => {
            console.error(error)
        } )*/

        const response = await fetch("http://localhost:3000/equipos.json")
        const data = await response.json()
        setDataEquipos(data)
    }

    const onMenuIconClick = () => {
        setDrawerOpen(true)
    }

    const onModalOpenClick = () => {
        setModalOpen(true)
    }

    const onMenuClose = () => {
        setDrawerOpen(false)
    }

    const onModalClose = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        obtenerEquiposHTTP()
    }, [])

    return <Box>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={ onMenuIconClick }
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    { `Equipos (${ location.state.username })` }
                </Typography>

            </Toolbar>
        </AppBar>
        <Drawer variant="temporary"
            anchor="left"
            onClose={ onMenuClose }
            open={ drawerOpen }>
            <List>
                <ListItem key={"menu1"}>
                    <ListItemText primary={"Menu 1"} />
                </ListItem>
                <ListItem key={"menu2"}>
                    <ListItemText primary={"Menu 1"} />
                </ListItem>
            </List>
        </Drawer>
        <Container sx={ { mt : 2 }}>
            <Button variant="contained"
                sx={ { mb : 2 } }
                onClick={ onModalOpenClick }>
                +
            </Button>
            <GrillaEquipos listaEquipos={ dataEquipos }/>
        </Container>

        { /* Modal */  }
        <ModalFormularioEquipo 
            modalOpen={ modalOpen }
            onModalClose={ onModalClose }/>
    </Box>
}

export default MainPage