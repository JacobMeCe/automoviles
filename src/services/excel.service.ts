import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
// import * as logoFile from './logoAzul.js';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private datePipe: DatePipe) {}

  generateExcel(title: any, header: any, data: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    // Agregar una nueva fila
    const titleRow = worksheet.addRow([title]);

    // Estilo y tamaño de fuente para la fila del titulo
    titleRow.font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };

    // Renglon en blanco
    worksheet.addRow([]);

    //Agregar un renglón con la fecha actual
    const subTitleRow = worksheet.addRow([
      'Fecha : ' + this.datePipe.transform(new Date(), 'medium'),
    ]);

    //Agregar imagen
    // let logo = workbook.addImage({
    //   base64: logoFile.logoBase64,
    //   extension: 'png',
    // });
    // worksheet.addImage(logo, 'E1:F3');

    //Combinar celdas
    worksheet.mergeCells('A1:D2');

    //Agregar renglón de las cabeceras
    const headerRow = worksheet.addRow(header);

    //Estilo para las cabeceras
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '178ec5' },
        bgColor: { argb: '178ec5' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    //Agregar datos y formato condicional
    data.forEach((d: any) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(5);
      const color = 'ffffff';
      // if (+qty.value < 500) {
      //   color = 'FF9999'
      // }
      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    //Guardar archivo excel
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'Reporte.xlsx');
    });
  }
}
