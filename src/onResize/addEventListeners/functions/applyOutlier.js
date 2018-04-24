export default function applyOutlier() {
    var chart = this;

    this.svg
        .selectAll('.line')
        .filter(d => chart.outlier_id.indexOf(d.values[0].values.raw[0][this.config.id_col]) > -1)
        .classed('outlier', true);
    this.svg
        .selectAll('.point')
        .filter(d => chart.outlier_id.indexOf(d.values.raw[0][chart.config.id_col]) > -1)
        .classed('outlier', true);
}
