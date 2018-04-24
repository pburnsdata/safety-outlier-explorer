import highlight_outliers from './addEventListeners/functions/highlight_outliers';

export default function maintainHighlight_outliers() {
    if (this.outlier_id) highlight_outliers.call(this);
}
