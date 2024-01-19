import { MoneyCollectTwoTone } from '@ant-design/icons';
import { Button, Popover, Input, Typography, message } from 'antd';
import './CSS/PopOverInvert.css';
import React, { useState } from 'react';
const { Text, Link } = Typography;

const PopOverInvert = () => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const [investmentAmount, setInvestmentAmount] = useState("");

    const hideAndSendEmail = () => {
        setClicked(false);
        setHovered(false);
    
        // Verifica si el input no está vacío
        if (!investmentAmount.trim()) {
            message.error("Debe ingresar el monto a invertir.");
            return;
        }
    
        // Realiza la solicitud HTTP al backend
        fetch("http://localhost:3001/sendEmailToExecutive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "investmentAmount": investmentAmount }),
        })
            .then((response) => {
                if (response.ok) {
                    message.success("Correo enviado al ejecutivo con éxito");
                } else {
                    message.error("Error al enviar el correo al ejecutivo");
                }
            })
            .catch((error) => {
                console.error("Error en la solicitud HTTP:", error);
            });
    
        setInvestmentAmount("");
    };

    const handleHoverChange = (open) => {
        setHovered(open);
        setClicked(false);
    };
    const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
    };
    const clickContent = <div className="flex-container">
        <Typography.Title level={5}>Monto a invertir:</Typography.Title>

        <Input
            className='money-input'
            size='large'
            prefix="$"
            suffix="CLP"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
        />
    </div>;

    return (
        <Popover
            style={{
                width: '100%',
            }}
            title="Invertir en este fondo"
            trigger="hover"
            open={hovered}
            onOpenChange={handleHoverChange}
        >
            <Popover
                placement="bottomRight"
                color="#AAD7D9"
                content={
                    <div>
                        {clickContent}
                        <Text italic>*Al hacer click en el botón, hacemos llegar un correo a   <br /> uno de nuestros ejecutivos para hacer efectivo su inversión.</Text>
                        <br />

                        <Button
                            onClick={hideAndSendEmail}
                            type="primary"
                            size='large'
                            // danger
                            ghost
                            className="centered-button"
                        >
                            Avisar a un ejecutivo Vector vía correo
                        </Button>
                    </div>
                }
                // title="Ingrese el valor"
                trigger="click"
                open={clicked}
                onOpenChange={handleClickChange}
            >

                <Button
                    type="primary" ghost
                    shape="circle"
                    icon={<MoneyCollectTwoTone />}
                />
            </Popover>
        </Popover>
    );
};
export default PopOverInvert;