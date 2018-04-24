import maintainHighlight from './onResize/maintainHighlight';
import maintainHighlight_outliers from './onResize/maintainHighlight_outliers';
import drawNormalRange from './onResize/drawNormalRange';
import addEventListeners from './onResize/addEventListeners';
import addBoxPlot from './onResize/addBoxPlot';
import adjustTicks from './onResize/adjustTicks';
import applyOutlier from './onResize/addEventListeners/functions/applyOutlier';

d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
        this.parentNode.appendChild(this);
    });
};

export default function onResize() {
    //Maintain mark highlighting.

    d3
        .selectAll('.point')
        .filter(function(d) {
            return d.values.raw[0].OUTLIER == 1; //this == is intentional since 0 is prob string right now
        })
        .moveToFront()
        .select('circle')
        .classed('outlier', true);

    //Draw normal range.
    drawNormalRange.call(this);

    maintainHighlight.call(this);

    maintainHighlight_outliers.call(this);

    //Add event listeners to lines, points, and overlay.
    addEventListeners.call(this);

    applyOutlier.call(this);

    //Draw a marginal box plot.
    addBoxPlot.call(this);

    //Rotate tick marks to prevent text overlap.
    adjustTicks.call(this);
}
