const ExcelJS = require('exceljs');

async function createMoodTracker() {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Mood Tracker';
    workbook.created = new Date();

    const moodColors = {
        top: 'FF00FF',
        up: 'FFA500',
        tranquil: '00FFFF',
        empty: 'C0C0C0',
        down: '0000FF'
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthColors = ['FFA500', '87CEEB', '90EE90', 'FFFF00', '90EE90', 'FFD700',
                         '87CEEB', '98FB98', 'F4A460', '87CEEB', 'DDA0DD', '87CEEB'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    const ws = workbook.addWorksheet('2025 Mood', {
        views: [{ showGridLines: false }]
    });

    ws.getColumn(1).width = 4;
    for (let i = 2; i <= 50; i++) {
        ws.getColumn(i).width = 4;
    }

    const titleCell = ws.getCell('A1');
    titleCell.value = '2025 mood';
    titleCell.font = { size: 24, bold: true, color: { argb: '000080' } };
    ws.mergeCells('A1:G1');

    let startRow = 3;
    let startCol = 1;
    const calendarPositions = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const row = Math.floor(monthIndex / 4);
        const col = monthIndex % 4;
        
        const calStartRow = startRow + (row * 10);
        const calStartCol = startCol + (col * 9);
        
        calendarPositions.push({ row: calStartRow, col: calStartCol, month: monthIndex });

        const headerCell = ws.getCell(calStartRow, calStartCol);
        headerCell.value = monthNames[monthIndex];
        headerCell.font = { bold: true, color: { argb: 'FFFFFF' } };
        headerCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: monthColors[monthIndex] }
        };
        ws.mergeCells(calStartRow, calStartCol, calStartRow, calStartCol + 6);
        headerCell.alignment = { horizontal: 'center' };

        for (let d = 0; d < 7; d++) {
            const dayHeaderCell = ws.getCell(calStartRow + 1, calStartCol + d);
            dayHeaderCell.value = dayNames[d];
            dayHeaderCell.font = { size: 8, bold: true };
            dayHeaderCell.alignment = { horizontal: 'center' };
            
            const dayColors = ['FFCCCC', 'FFE4B5', 'FFFACD', 'E0FFE0', 'E0FFFF', 'E6E6FA', 'FFB6C1'];
            dayHeaderCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: dayColors[d] }
            };
        }

        const daysInMonth = getDaysInMonth(2025, monthIndex);
        const firstDay = getFirstDayOfMonth(2025, monthIndex);
        
        let currentDay = 1;
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const cellRow = calStartRow + 2 + week;
                const cellCol = calStartCol + day;
                const cell = ws.getCell(cellRow, cellCol);
                
                if ((week === 0 && day < firstDay) || currentDay > daysInMonth) {
                    cell.value = '';
                } else {
                    cell.value = currentDay;
                    cell.font = { size: 9 };
                    cell.alignment = { horizontal: 'center' };
                    
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'CCCCCC' } },
                        left: { style: 'thin', color: { argb: 'CCCCCC' } },
                        bottom: { style: 'thin', color: { argb: 'CCCCCC' } },
                        right: { style: 'thin', color: { argb: 'CCCCCC' } }
                    };
                    
                    currentDay++;
                }
            }
            if (currentDay > daysInMonth) break;
        }
    }

    const legendStartRow = 3;
    const legendStartCol = 40;

    const legendTitle = ws.getCell(legendStartRow, legendStartCol);
    legendTitle.value = 'Mood Legend';
    legendTitle.font = { bold: true, size: 12 };
    ws.mergeCells(legendStartRow, legendStartCol, legendStartRow, legendStartCol + 2);

    const moods = [
        { name: 'top', color: 'FF00FF', desc: 'Best mood' },
        { name: 'up', color: 'FFA500', desc: 'Good mood' },
        { name: 'tranquil', color: '00FFFF', desc: 'Calm/Neutral' },
        { name: 'empty', color: 'C0C0C0', desc: 'No entry' },
        { name: 'down', color: '0000FF', desc: 'Bad mood' }
    ];

    moods.forEach((mood, index) => {
        const colorCell = ws.getCell(legendStartRow + 1 + index, legendStartCol);
        colorCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: mood.color }
        };
        colorCell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        
        const nameCell = ws.getCell(legendStartRow + 1 + index, legendStartCol + 1);
        nameCell.value = mood.name;
        nameCell.font = { size: 10 };
        
        const descCell = ws.getCell(legendStartRow + 1 + index, legendStartCol + 2);
        descCell.value = mood.desc;
        descCell.font = { size: 10 };
    });

    const statsStartRow = 10;
    const statsStartCol = 40;

    const statsTitle = ws.getCell(statsStartRow, statsStartCol);
    statsTitle.value = 'Monthly Mood Statistics';
    statsTitle.font = { bold: true, size: 12 };
    ws.mergeCells(statsStartRow, statsStartCol, statsStartRow, statsStartCol + 13);

    const headers = ['Mood', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    headers.forEach((header, index) => {
        const cell = ws.getCell(statsStartRow + 1, statsStartCol + index);
        cell.value = header;
        cell.font = { bold: true, size: 9 };
        cell.alignment = { horizontal: 'center' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'DDDDDD' }
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    const moodData = {
        top: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        up: [18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tranquil: [336, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        empty: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        down: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    const moodRows = ['top', 'up', 'tranquil', 'empty', 'down'];
    moodRows.forEach((mood, moodIndex) => {
        const moodCell = ws.getCell(statsStartRow + 2 + moodIndex, statsStartCol);
        moodCell.value = mood;
        moodCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: moodColors[mood] }
        };
        moodCell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        
        for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
            const dataCell = ws.getCell(statsStartRow + 2 + moodIndex, statsStartCol + 1 + monthIdx);
            dataCell.value = moodData[mood][monthIdx];
            dataCell.alignment = { horizontal: 'center' };
            dataCell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        }
    });

    const dataWs = workbook.addWorksheet('Mood Data', {
        views: [{ showGridLines: true }]
    });

    dataWs.getCell('A1').value = 'Date';
    dataWs.getCell('B1').value = 'Mood';
    dataWs.getCell('C1').value = 'Mood Value';
    dataWs.getCell('D1').value = 'Notes';
    
    ['A1', 'B1', 'C1', 'D1'].forEach(cellRef => {
        const cell = dataWs.getCell(cellRef);
        cell.font = { bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4472C4' }
        };
        cell.font = { bold: true, color: { argb: 'FFFFFF' } };
    });

    dataWs.getColumn('A').width = 12;
    dataWs.getColumn('B').width = 12;
    dataWs.getColumn('C').width = 12;
    dataWs.getColumn('D').width = 30;

    const moodDropdown = '"top,up,tranquil,empty,down"';
    
    let rowNum = 2;
    for (let month = 0; month < 12; month++) {
        const daysInMonth = getDaysInMonth(2025, month);
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${2025}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dataWs.getCell(`A${rowNum}`).value = new Date(2025, month, day);
            dataWs.getCell(`A${rowNum}`).numFmt = 'YYYY-MM-DD';
            
            dataWs.getCell(`B${rowNum}`).dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [moodDropdown]
            };
            dataWs.getCell(`B${rowNum}`).value = 'tranquil';
            
            dataWs.getCell(`C${rowNum}`).value = { formula: `IF(B${rowNum}="top",5,IF(B${rowNum}="up",4,IF(B${rowNum}="tranquil",3,IF(B${rowNum}="empty",2,IF(B${rowNum}="down",1,0)))))` };
            
            rowNum++;
        }
    }

    const summaryWs = workbook.addWorksheet('Summary', {
        views: [{ showGridLines: true }]
    });

    summaryWs.getCell('A1').value = 'My 2025 Mood Summary';
    summaryWs.getCell('A1').font = { size: 18, bold: true, color: { argb: '4472C4' } };
    summaryWs.mergeCells('A1:E1');

    summaryWs.getCell('A3').value = 'Month';
    summaryWs.getCell('B3').value = 'Top';
    summaryWs.getCell('C3').value = 'Up';
    summaryWs.getCell('D3').value = 'Tranquil';
    summaryWs.getCell('E3').value = 'Empty';
    summaryWs.getCell('F3').value = 'Down';
    summaryWs.getCell('G3').value = 'Total Days';
    summaryWs.getCell('H3').value = 'Avg Score';

    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'].forEach(cellRef => {
        const cell = summaryWs.getCell(cellRef);
        cell.font = { bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4472C4' }
        };
        cell.font = { bold: true, color: { argb: 'FFFFFF' } };
        cell.alignment = { horizontal: 'center' };
    });

    const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dataRowStart = 2;
    
    monthShortNames.forEach((month, idx) => {
        const row = idx + 4;
        const daysInMonth = getDaysInMonth(2025, idx);
        const dataRowEnd = dataRowStart + daysInMonth - 1;
        
        summaryWs.getCell(`A${row}`).value = month;
        summaryWs.getCell(`B${row}`).value = { formula: `COUNTIF('Mood Data'!B${dataRowStart}:B${dataRowEnd},"top")` };
        summaryWs.getCell(`C${row}`).value = { formula: `COUNTIF('Mood Data'!B${dataRowStart}:B${dataRowEnd},"up")` };
        summaryWs.getCell(`D${row}`).value = { formula: `COUNTIF('Mood Data'!B${dataRowStart}:B${dataRowEnd},"tranquil")` };
        summaryWs.getCell(`E${row}`).value = { formula: `COUNTIF('Mood Data'!B${dataRowStart}:B${dataRowEnd},"empty")` };
        summaryWs.getCell(`F${row}`).value = { formula: `COUNTIF('Mood Data'!B${dataRowStart}:B${dataRowEnd},"down")` };
        summaryWs.getCell(`G${row}`).value = daysInMonth;
        summaryWs.getCell(`H${row}`).value = { formula: `AVERAGE('Mood Data'!C${dataRowStart}:C${dataRowEnd})` };
        summaryWs.getCell(`H${row}`).numFmt = '0.00';
        
        ['B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(col => {
            summaryWs.getCell(`${col}${row}`).alignment = { horizontal: 'center' };
        });
        
        dataRowStart = dataRowEnd + 1;
    });

    summaryWs.getCell('A16').value = 'Total';
    summaryWs.getCell('A16').font = { bold: true };
    summaryWs.getCell('B16').value = { formula: 'SUM(B4:B15)' };
    summaryWs.getCell('C16').value = { formula: 'SUM(C4:C15)' };
    summaryWs.getCell('D16').value = { formula: 'SUM(D4:D15)' };
    summaryWs.getCell('E16').value = { formula: 'SUM(E4:E15)' };
    summaryWs.getCell('F16').value = { formula: 'SUM(F4:F15)' };
    summaryWs.getCell('G16').value = { formula: 'SUM(G4:G15)' };
    summaryWs.getCell('H16').value = { formula: 'AVERAGE(H4:H15)' };
    summaryWs.getCell('H16').numFmt = '0.00';

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(col => {
        summaryWs.getColumn(col).width = 12;
    });

    const instructionWs = workbook.addWorksheet('Instructions', {
        views: [{ showGridLines: false }]
    });

    instructionWs.getCell('A1').value = 'Hướng dẫn sử dụng - Mood Tracker 2025';
    instructionWs.getCell('A1').font = { size: 18, bold: true, color: { argb: '4472C4' } };
    instructionWs.mergeCells('A1:E1');

    const instructions = [
        '',
        'Cách sử dụng:',
        '1. Mở sheet "Mood Data" để nhập tâm trạng hàng ngày',
        '2. Chọn mood từ dropdown list: top, up, tranquil, empty, down',
        '3. Xem thống kê tại sheet "Summary"',
        '4. Lịch tổng quan tại sheet "2025 Mood"',
        '',
        'Ý nghĩa các mood:',
        '• top (hồng) - Tâm trạng tuyệt vời nhất',
        '• up (cam) - Tâm trạng tốt',
        '• tranquil (xanh cyan) - Bình thản, trung lập',
        '• empty (xám) - Không ghi nhận',
        '• down (xanh dương) - Tâm trạng không tốt',
        '',
        'Điểm số:',
        '• top = 5 điểm',
        '• up = 4 điểm',
        '• tranquil = 3 điểm',
        '• empty = 2 điểm',
        '• down = 1 điểm'
    ];

    instructions.forEach((text, idx) => {
        const cell = instructionWs.getCell(`A${idx + 3}`);
        cell.value = text;
        if (text.includes(':') && !text.includes('•')) {
            cell.font = { bold: true, size: 12 };
        }
    });

    instructionWs.getColumn('A').width = 50;

    await workbook.xlsx.writeFile('/workspace/2025_Mood_Tracker.xlsx');
    console.log('File đã được tạo thành công: 2025_Mood_Tracker.xlsx');
}

createMoodTracker().catch(console.error);
