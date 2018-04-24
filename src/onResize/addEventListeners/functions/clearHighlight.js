export default function clearHighlight() {
    this.svg
        .selectAll('.line:not(.selected):not(.outlier)')
        .select('path')
        .attr(this.config.line_attributes);
    this.svg
        .selectAll('.point:not(.selected):not(.outlier)')
        .select('circle')
        .attr(this.config.point_attributes)
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius);
}
