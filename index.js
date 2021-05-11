import './style.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { simpleHttpRequest, Grid } from 'ag-grid-community';
import { COLDEFS_WITHOUT_GROUPING } from './columnDefs';
import { createPicker } from './utils';

import colors from './colors.js';

let selectedColor = colors['light'][0];

const swatches = Object.values(colors).flat();

const pickrRowBkgColor = createPicker(
  '.my-color-picker',
  swatches,
  selectedColor
);

pickrRowBkgColor.on('save', (color, instance) => {
  const updatedColor = color.toHEXA().toString();
  selectedColor = updatedColor;
  console.log(selectedColor);
  refreshGrid();
  instance.hide();
});

function refreshGrid() {
  gridOptions.api.redrawRows();
}

const gridOptions = {
  columnDefs: COLDEFS_WITHOUT_GROUPING,
  getRowStyle: params => {
    const themes = Object.keys(colors);
    const selectedTheme = themes.find(theme =>
      colors[theme].includes(selectedColor)
    );
    return {
      backgroundColor: selectedColor,
      color: selectedTheme === 'dark' ? 'white' : 'black'
    };
  },
  onFirstDataRendered: params => {
    params.columnApi.autoSizeAllColumns();
  },
  onGridReady: params => {
    simpleHttpRequest({
      url: 'https://www.ag-grid.com/example-assets/olympic-winners.json'
    }).then(function(data) {
      data.forEach(r => {
        r.date = new Date();
      });
      params.api.setRowData(data.slice(1500, 2000));
    });
  }
};

new Grid(document.querySelector('#myGrid'), gridOptions);
