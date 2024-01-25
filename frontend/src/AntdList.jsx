import React, { useState } from 'react';
import { Button, Tooltip, Space, Table } from 'antd';
import { FileTextOutlined, FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import './CSS/ListFunds.css';
import lowRiskImage from './assets/low.jpg';
import moderateRiskImage from './assets/medium.jpg';
import highRiskImage from './assets/high.jpg';
import PopOverInvert from './PopOverInvert';


const ListFunds = ({ fondos, saldoDisponible }) => {
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter);
    };

    const columns = [
        {
            title: 'Fondo',
            dataIndex: 'name',
            sorter: (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase(), undefined, { sensitivity: 'base' }),
            key: 'name',
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            width: "15%",
        },
        {
            title: 'AGF',
            dataIndex: 'agf',
            width: "12%",
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            width: "15%",
        },
        {
            title: 'Serie',
            dataIndex: 'series',
            fixed: 'center',
            width: "6%",
            align: 'center',
        },
        {
            title: 'Rentabilidad 1M',
            dataIndex: 'monthly',
            sorter: (a, b) => a.monthly - b.monthly,
            key: 'monthly',
            sortOrder: sortedInfo.columnKey === 'monthly' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
            width: "11%",
        },
        {
            title: 'Rentabilidad YTD',
            dataIndex: 'ytd',
            key: 'ytd',
            sorter: (a, b) => a.ytd - b.ytd,
            sortOrder: sortedInfo.columnKey === 'ytd' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
            width: "11%",
        },
        {
            title: 'Rentabilidad 12M',
            dataIndex: 'yearly',
            sorter: (a, b) => a.yearly - b.yearly,
            key: 'yearly',
            sortOrder: sortedInfo.columnKey === 'yearly' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
            width: "11%",
        },
        {
            title: 'Nivel de Riesgo',
            dataIndex: 'riskLevel',
            render: (text) => {
                const riskLevelImage = {
                    Bajo: lowRiskImage,
                    Moderado: moderateRiskImage,
                    Alto: highRiskImage,
                }[text];
                return <img src={riskLevelImage} alt={`${text} Riesgo`} />;
            },
            width: "3%",
            align: 'center',
        },
        {
            title: 'Regla-mento',
            dataIndex: 'bylawLink',
            render: (text) => (
                <Tooltip title="Abrir Reglamento Interno">
                    <Button
                        shape="circle"
                        type='primary' ghost
                        icon={<FilePdfOutlined />}
                        onClick={() => window.open(text, '_blank')}
                    />
                </Tooltip>
            ),
            width: "5%",
            align: 'center',
        },
        {
            title: 'Ficha',
            dataIndex: 'dataSheetLink',
            render: (text) => (
                <Tooltip title="Abrir ficha del fondo">
                    <Button
                        shape="circle"
                        type='primary' ghost
                        icon={<FileTextOutlined />}
                        onClick={() => window.open(text, '_blank')}
                    />
                </Tooltip>
            ),
            width: "3%",
            align: 'center',
        },
        {
            title: 'Invertir',
            dataIndex: 'invert',
            render: (_, record) => <PopOverInvert fund={record} balance={saldoDisponible}/>,
            width: "3%",
            align: 'center',
        },
    ];


    const [fixedTop, setFixedTop] = useState(false);
    return (
        <div>
            <Table
                columns={columns}
                dataSource={fondos}
                onChange={handleChange}
                rowKey="id"
                size='small'
                tableLayout='fixed'
                sortDirections={["descend", "ascend", "descend"]}
                locale={{
                    triggerDesc: 'Ordenar ascendente',
                    triggerAsc: 'Ordenar descendente',
                    cancelSort: 'Cancelar ordenamiento',
                }}
            // pagination={false}
            // sticky={{
            //     offsetHeader: 50,
            // }}
            // scroll={{
            //     y: "calc(100vh - 350px)",
            //   }}
            />
        </div>
    );
};

export default ListFunds;
