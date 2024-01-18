import React, { useState } from 'react';
import { MoneyCollectTwoTone, FileTextOutlined, FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip, Popover, Input } from 'antd';
import './CSS/PopOverInvert.css';


const PopOverInvert = () => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const hideAndSendEmail = () => {
        setClicked(false);
        setHovered(false);
    };
    const handleHoverChange = (open) => {
        setHovered(open);
        setClicked(false);
    };
    const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
    };
    const clickContent = <div><Input size='large' prefix="$" suffix="CLP" /> </div>;
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
                        <br />
                        <Button
                            onClick={hideAndSendEmail}
                            type="primary"
                            size='large'
                            // danger
                            ghost
                            className="centered-button"
                        >
                            Avisar a ejecutivo vía correo
                        </Button>
                    </div>
                }
                title="Monto a invertir:"
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