"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const Produto = () => {

    const [value, setValue] = useState("Olá Mundo");

    useEffect(() => {
        setValue("novo valor");
    }, []);

    return (
        <main>
            <TextField
                    required
                    id="outlined-required"
                    label="Qualquer coisa"
                    value={value}
                    onChange={setValue}
            />
        </main>
    );
}

export default Produto;