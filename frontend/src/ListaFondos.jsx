import React from 'react';
import { MoneyCollectTwoTone, FileTextOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import './CSS/ListaFondos.css';  // Importa el archivo CSS

const ListaFondos = ({ fondos }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Fondo</th>
          <th>Categoría</th>
          <th>Serie</th>
          <th>YTD</th>
          <th>Mensual</th>
          <th>Anual</th>
          <th>Nivel de Riesgo</th>
          <th>Reglamento Interno</th>
          <th>Ficha</th>
          <th>Invertir</th>
        </tr>
      </thead>
      <tbody>
        {fondos.map((fondo) => (
          <tr key={fondo.id}>
            <td><strong>{fondo.nombre}</strong></td>
            <td>{fondo.categoria}</td>
            <td>{fondo.serie}</td>
            <td>{fondo.YTD}</td>
            <td>{fondo.mensual}</td>
            <td>{fondo.anual}</td>
            <td>{fondo.nivelDeRiesgo}</td>
            <td>
              <Tooltip title="Descargar Reglamento Interno">
                <Button
                  shape="circle"
                  icon={<FilePdfOutlined />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Descargar Ficha">
                <Button
                  shape="circle"
                  icon={<FileTextOutlined />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Invertir">
                <Button
                  shape="circle"
                  icon={<MoneyCollectTwoTone />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ListaFondos;
