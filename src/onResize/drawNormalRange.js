export default function drawNormalRange() {
    var chart = this;

    this.wrap.select('.normal-range').remove();
    if (this.config.normal_range_method) {
        const normalRange = this.svg.insert('g', '.line-supergroup').classed('normal-range', true);
        normalRange
            .append('rect')
            .attr({
                x: 0,
                y: this.y(this.uln()),
                width: this.plot_width,
                height: this.y(this.lln()) - this.y(this.uln()),
                'clip-path': `url(#${this.id})`
            })
            .style({
                fill: 'blue',
                'fill-opacity': 0.1
            });
        normalRange.append('title').text(`Normal range: ${this.lln()}-${this.uln()}`);
    }

    // hide points that are within normal range
    d3.selectAll('.point').style('opacity', function(d) {
        // handle case where there's no normal range applied
        if (chart.lln() !== chart.measure.results[0]) {
            if (d.values.raw[0].OUTLIER == 0) {
                return d.values.y <= chart.uln() && d.values.y >= chart.lln() ? 0 : null;
            }
        } else {
            return null;
        }
    });
}
