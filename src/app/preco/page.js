import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Preco = async () => {

    const response = await fetch("http://localhost:9090/preco", { cache: 'force-cache' });
    const produtos = await response.json();

    const gerarCard = (produto) => {
        return (
            <Card style={{ marginBottom: "20px" }} key={produto.label}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {produto.label}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {`${produto.moeda} ${produto.preco.toFixed(2)}`}
                    </Typography>
                </CardContent>
          </Card>
        )
    }

    return (
        <main>
            {produtos.map(gerarCard)}
        </main>
    );
}

export default Preco;