import { Box, Button, Container, TextField, Alert } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FilePresent } from "@mui/icons-material"


const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginIncorrecto, setLoginIncorrecto] = useState(false)

    // Creamos objeto para navegacion programatica
    const navigate = useNavigate()

    const usernameOnChangeHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordOnChangeHandler = (event) => {
        setPassword(event.target.value)
    } 

    const loginOnClick = async () => {

        //const response = await fetch(`http://localhost:8000/proyectos/login/${username}/${password}`)

        /*const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)*/

        const dataUsername = {
            username : username,
            password : password
        }

        const response = await fetch("http://localhost:8000/proyectos/login-json", {
            method : "post",
            body : JSON.stringify(dataUsername)
        })
        const data = await response.json()

        if (data.msg === "") {
            // Login correcto
            // Almacenando en localStorage
            sessionStorage.setItem("USERNAME", username)

            navigate("/main", {
                state : {
                    username : username
                }
            })
        } else {
            // Login incorrecto
            setLoginIncorrecto(true)
        }
    }

    useEffect(() => {
        // Valido si esta logueado, caso afirmativo, redirecciono a MainPage
        if (sessionStorage.getItem("USERNAME") !== null) {
            navigate("/main")
            return
        }
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