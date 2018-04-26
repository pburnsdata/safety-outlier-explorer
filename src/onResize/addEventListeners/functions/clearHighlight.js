export default function clearHighlight() {
    // Poorly programmed need to change this eventually

    this.svg
        .selectAll('.line:not(.selected):not(.outlier)')
        .select('path')
        .attr(this.config.line_attributes);

    this.svg
        .selectAll('.line.outlier-line:not(.selected)')
        .select('path')
        .attr(this.config.line_attributes)
        .attr(
            'stroke-width',
            this.config.marks.find(mark => mark.type === 'line').attributes['stroke-width'] * 4
        )
        .attr('stroke', '#b2182b');

    this.svg
        .selectAll('.point:not(.selected):not(.outlier)')
        .select('circle')
        .attr(this.config.point_attributes)
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius);

    this.svg
        .selectAll('.point.outlier:not(.selected)')
        .filter(function(d) {
            return d.values.raw[0].OUTLIER == 1; //this == is intentional since 0 is prob string right now
        })
        .select('circle')
        .attr(this.config.point_attributes)
        .attr('fill-opacity', 1)
        .attr('stroke', 'red')
        .attr('fill', 'red')
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius * 1.5);
}
