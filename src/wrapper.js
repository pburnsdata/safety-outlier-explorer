//polyfills
import './util/object-assign';
import './util/array-find';

//settings
import defaultSettings from './defaultSettings';
import { controlInputs, syncControlInputs, syncSettings } from './defaultSettings';

//webcharts
import { createChart, createControls } from 'webcharts';
import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDatatransform from './onDatatransform';
import onDraw from './onDraw';
import onResize from './onResize';

export default function safetyOutlierExplorer(element, settings) {
    //Merge user settings with default settings.
    let mergedSettings = Object.assign({}, defaultSettings, settings);

    //Sync options within settings object, e.g. data mappings.
    mergedSettings = syncSettings(mergedSettings);

    //Sync control inputs with with settings object.
    let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
    let controls = createControls(element, { location: 'top', inputs: syncedControlInputs });

    //Create chart.
    let chart = createChart(element, mergedSettings, controls);
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDatatransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    return chart;
}
