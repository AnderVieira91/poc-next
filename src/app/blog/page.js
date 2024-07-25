"use client";

import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const Blog = () => {

    const [data, setData] = useState([]);
    const [selecteds, setSelecteds] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/rest/cliente-estoque?pagina=1&quantidadePagina=2");
            const tabela = await response.json();
            console.log(tabela);
        }

        fetchData();
    }, []);

    const isSelected = (id) => {
        return !!selecteds.find(x => x.id === id);
    }

    const onClick = (event, row) => {
        const index = selecteds.findIndex(x => x.id === row.id);

        if (index < 0) {
            const temp = [ ...selecteds ];
            temp.push(row);
            setSelecteds(temp);
            return;
        }

        selecteds.splice(index, 1);
        const temp = [ ...selecteds ];
        setSelecteds(temp);
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer>
                    <Table
                            aria-labelledby="tableTitle"
                            size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell>Checkbox</TableCell>
                                <TableCell align="center">Coluna 1</TableCell>
                                <TableCell align="center">Coluna 2</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `tabela-checkbox-${index}`;
                
                                return (
                                    <TableRow
                                            hover
                                            onClick={(event) => onClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}/>
                                        </TableCell>

                                        <TableCell align="center">{row.coluna1}</TableCell>
                                        <TableCell align="center">{row.coluna2}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
      </Box>
    );
}

export default Blog;