"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const paginas = [
        {label: "Produtos", link: "/produto"},
        {label: "Preço", link: "/preco"},
        {label: "Blog", link: "/blog"}
    ];

const BarraNavegacao = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [ancoraNav, setAncoraNav] = useState(null);
    const [ancoraUsuario, setAncoraUsuario] = useState(null);

    const handleAbrirMenuNav = (event) => {
        setAncoraNav(event?.currentTarget);
    }

    const handleAbrirMenuUsuario = (event) => {
        setAncoraUsuario(event?.currentTarget);
    }

    const handleFecharMenuNav = () => {
        setAncoraNav(null);
    }

    const handleFecharMenuUsuario = () => {
        setAncoraUsuario(null);
    }

    const configuracoes = session?.user ? [
        {
            label: "Logout",
            callback: async () => {
                await signOut({ redirect: false });
                router.push("/");
            }
        }
    ] : [
        {
            label: "Logar",
            callback: () => signIn("keycloak") 
        }
    ];

    const usuario = session?.user?.name??"Deslogado";

    return (
        <AppBar position="static" style={{ marginBottom: "20px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HealthAndSafetyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                        WISE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleAbrirMenuNav}
                                color="inherit">

                        <MenuIcon/>

                        </IconButton>

                        <Menu
                                id="menu-appbar"
                                anchorEl={ancoraNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(ancoraNav)}
                                onClose={handleFecharMenuNav}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}>
                            {paginas.map((pagina) => (
                                <MenuItem
                                        key={pagina.label}
                                        onClick={(event) => {
                                            handleFecharMenuNav();
                                            router.push(pagina.link);
                                        }}>
                                <Typography textAlign="center">{pagina.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <HealthAndSafetyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                        WISE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {paginas.map((pagina) => (
                            <Button
                                    key={pagina.label}
                                    onClick={(event) => {
                                        handleFecharMenuNav();
                                        router.push(pagina.link);
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}>
                                {pagina.label}
                            </Button>
                            ))
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={usuario}>
                            <IconButton onClick={handleAbrirMenuUsuario}>
                                <AccountCircleIcon style={{ color: "white" }}/>
                            </IconButton>
                        </Tooltip>

                        <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={ancoraUsuario}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(ancoraUsuario)}
                                onClose={handleFecharMenuUsuario}>
                            {configuracoes.map((configuracao) => (
                                <MenuItem key={configuracao}
                                        onClick={(event) => {
                                            configuracao.callback();
                                            handleFecharMenuUsuario();
                                        }}>
                                    <Typography textAlign="center">{configuracao.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default BarraNavegacao;