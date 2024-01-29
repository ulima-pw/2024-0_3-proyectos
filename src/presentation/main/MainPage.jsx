import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Card, CardContent, CardActions } from "@mui/material"
import { Container, ListItemIcon } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import CardEquipo from "./components/CardEquipo";
import GrillaEquipos from "./components/GrillaEquipos";
import dataEquipos from "../../data/equipos"

const MainPage = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const onMenuIconClick = () => {
        setDrawerOpen(true)
    }

    const onMenuClose = () => {
        setDrawerOpen(false)
    }

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
                    Equipos
                </Typography>

            </Toolbar>
        </AppBar>
        <Drawer variant="temporary"
            anchor="left"
            onClose={ onMenuClose }
            open={ drawerOpen }>
            <List>
                <ListItem>
                    <ListItemText primary={"Menu 1"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Menu 1"} />
                </ListItem>
            </List>
        </Drawer>
        <Container sx={ { mt : 2 }}>
            <GrillaEquipos listaEquipos={ dataEquipos }/>
        </Container>
    </Box>
}

export default MainPage