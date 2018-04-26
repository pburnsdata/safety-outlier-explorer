export default function highlight_outliers() {
    //Highlight line and move in front of all other lines.
    this.svg
        .selectAll('.line')
        .filter(d => this.outlier_id.indexOf(d.values[0].values.raw[0][this.config.id_col]) > -1)
        .select('path')
        .attr(
            'stroke-width',
            this.config.marks.find(mark => mark.type === 'line').attributes['stroke-width'] * 4
        )
        .attr('stroke', '#b2182b');

    //Highlight points
    this.svg
        .selectAll('.point')
        .filter(d => this.outlier_id.indexOf(d.values.raw[0][this.config.id_col]) > -1)
        .select('circle')
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius * 1.5);
}
