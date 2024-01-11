import React from 'react';
import { MoneyCollectTwoTone, FileTextOutlined, FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import './CSS/ListaFondos.css';  // Importa el archivo CSS
import lowRiskImage from './assets/low.jpg';
import moderateRiskImage from './assets/medium.jpg';
import highRiskImage from './assets/high.jpg';

const ListaFondos = ({ fondos }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Fondo</th>
          <th>Categoría</th>
          <th>Serie</th>
          <th>1M</th>
          <th>YTD</th>
          <th>12M</th>
          <th>Riesgo</th>
          <th>Reglamento</th>
          <th>Ficha</th>
          <th>Invertir</th>
        </tr>
      </thead>
      <tbody>
        {fondos.map((fondo) => (
          <tr key={fondo.id}>
            <td>{fondo.nombre}</td>
            <td>{fondo.categoria}</td>
            <td>{fondo.serie}</td>
            <td className={fondo.mensual.startsWith('-') ? 'rojo' : 'verde'}>{fondo.mensual}</td>
            <td className={fondo.YTD.startsWith('-') ? 'rojo' : 'verde'}>{fondo.YTD}</td>
            <td className={fondo.anual.startsWith('-') ? 'rojo' : 'verde'}>{fondo.anual}</td>
            <td>
              {fondo.riesgo === 'Bajo' && (
                <img src={lowRiskImage} alt="Bajo Riesgo" />
              )}
              {fondo.riesgo === 'Moderado' && (
                <img src={moderateRiskImage} alt="Moderado Riesgo" />
              )}
              {fondo.riesgo === 'Alto' && (
                <img src={highRiskImage} alt="Alto Riesgo" />
              )}
            </td>
            <td>
              <Tooltip title="Descargar Reglamento Interno">
                <Button
                  // type="primary" ghost
                  shape="circle"
                  icon={<FilePdfOutlined />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Descargar Ficha">
                <Button
                  // type="primary" ghost
                  shape="circle"
                  icon={<FileTextOutlined />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Invertir en este fondo">
                <Button
                  type="primary" ghost
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
