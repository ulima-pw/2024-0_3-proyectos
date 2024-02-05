import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button, MenuList, MenuItem, Divider } from "@mui/material"
import { Container } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import GrillaEquipos from "./components/GrillaEquipos";
import ModalFormularioEquipo from "./components/ModalFormularioEquipo";
import { useNavigate } from "react-router-dom";
//import { useLocation } from "react-router-dom";




const MainPage = () => {
    const [dataEquipos, setDataEquipos] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const navigate = useNavigate()

    //const location = useLocation()

    const obtenerEquiposHTTP = async () => {    
        /*fetch("http://localhost:3000/equipos.json").then( (response) => {
            return response.json()
        }).then( (data) => {
            setDataEquipos(data)
        } ).catch( (error) => {
            console.error(error)
        } )*/

        const response = await fetch("http://localhost:8000/proyectos/ver-equipos")
        const data = await response.json()

        const listaEquiposStr = JSON.stringify(data)
        sessionStorage.setItem("EQUIPOS", listaEquiposStr)

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

    const logoutOnClick = () => {
        sessionStorage.clear() // Borramos todo lo guardado en el sessionStorage
        navigate("/")
    }

    useEffect(() => {
        if (sessionStorage.getItem("USERNAME") == null) {
            navigate("/")
            return
        }


        const equiposStr = sessionStorage.getItem("EQUIPOS")
        if (equiposStr == null) {
            obtenerEquiposHTTP()
        }else {
            const equipos = JSON.parse(equiposStr)
            setDataEquipos(equipos)
        }
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
                    { `Equipos (${ localStorage.getItem("USERNAME") })` }
                </Typography>

            </Toolbar>
        </AppBar>
        <Drawer variant="temporary"
            anchor="left"
            onClose={ onMenuClose }
            open={ drawerOpen }>
            <MenuList>
                <MenuItem key={"menu1"}>
                    Menu 1
                </MenuItem>
                <MenuItem key={"menu2"}>
                    Menu 2
                </MenuItem>
                <Divider />
                <MenuItem key={"logout"} 
                    onClick={ logoutOnClick }>
                    Logout
                </MenuItem>
            </MenuList>

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