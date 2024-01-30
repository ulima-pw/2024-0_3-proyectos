import { Box, Button, Container, TextField, Alert } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginIncorrecto, setLoginIncorrecto] = useState(false)
    const [dataUsuarios, setDataUsuarios] = useState([])

    const obtenerUsuariosHTTP = async () => {
        const response = await fetch("http://localhost:3000/usuarios.json")
        const data = await response.json()
        setDataUsuarios(data)
    }

    // Creamos objeto para navegacion programatica
    const navigate = useNavigate()

    const usernameOnChangeHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordOnChangeHandler = (event) => {
        setPassword(event.target.value)
    } 

    const loginOnClick = () => {
        const listaFiltrada = dataUsuarios.filter((usuario) => {
            return usuario.username == username && usuario.password == password
        })

        if (listaFiltrada.length > 0) {
            // Hay por lo menos un usuario
            console.log("Login correcto")
            navigate("/main", {
                state : {
                    username : username
                }
            })
            
        }else {
            console.log("LOGIN INCORRECTO")
            setLoginIncorrecto(true)
        }
    }

    useEffect(() => {
        obtenerUsuariosHTTP()
    }, [])

    return <Container maxWidth="sm">
        <Box component="form"
            noValidate
            autoComplete="off"
            style={ { textAlign : "center" }}>
            
            <h1>Login</h1>
            <div>
                <TextField required
                    label="Username"
                    margin="normal"
                    value={ username }
                    onChange={ usernameOnChangeHandler }/>
            </div>
            <div>
                <TextField required
                    type="password"
                    label="Password"
                    margin="normal"
                    value={ password }
                    onChange={ passwordOnChangeHandler }/>
            </div>
            <div>
                <Button variant="contained" 
                    style={ { marginRight : "8px" }}
                    onClick={ loginOnClick }>
                    Login
                </Button>
                <Button variant="contained">Registro</Button>
            </div>
            {
                (() => {
                    if (loginIncorrecto) {
                        return <Alert 
                            icon={<CheckIcon fontSize="inherit" />} 
                            severity="error"
                            sx={ { mt : 2 } }>
                            Error en el login.
                        </Alert>
                    }
                })()
            }
            
        </Box>
    </Container>
}

export default LoginPage