import React from 'react';
import { MoneyCollectTwoTone, FileTextOutlined, FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import './CSS/ListaFondos.css';
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
            <td>{fondo.name}</td>
            <td>{fondo.type}</td>
            <td>{fondo.series}</td>
            <td className={fondo.monthly.startsWith('-') ? 'rojo' : 'verde'}>{fondo.monthly}</td>
            <td className={fondo.ytd.startsWith('-') ? 'rojo' : 'verde'}>{fondo.ytd}</td>
            <td className={fondo.yearly.startsWith('-') ? 'rojo' : 'verde'}>{fondo.yearly}</td>
            <td>
              {fondo.rickLevel === 'Bajo' && (
                <img src={lowRiskImage} alt="Bajo Riesgo" />
              )}
              {fondo.rickLevel === 'Moderado' && (
                <img src={moderateRiskImage} alt="Moderado Riesgo" />
              )}
              {fondo.rickLevel === 'Alto' && (
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
