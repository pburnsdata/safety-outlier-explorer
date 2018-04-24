import highlight from './functions/highlight';
import highlight_outliers from './functions/highlight_outliers';
import clearHighlight from './functions/clearHighlight';
import clearSelected from './functions/clearSelected';
import applySelected from './functions/applySelected';
import smallMultiples from './functions/smallMultiples';

export default function addLineEventListeners() {
    const context = this;
    const lines = this.svg.selectAll('.line');
    const points = this.svg.selectAll('.point');

    //  does not belong here
    context.outlier_id = [];

    //build list of subject IDs with outliers
    lines.each(function(d) {
        var hasOutlier = 0;
        d.values.forEach(function(d) {
            if (d.values.raw[0].OUTLIER == 1) {
                hasOutlier = 1;
            }
        });
        if (hasOutlier === 1) {
            context.outlier_id.push(d.values[0].values.raw[0][context.config.id_col]);
        }
    });
    highlight_outliers.call(this);

    lines
        .on('mouseover', function(d) {
            delete context.hovered_id;
            clearHighlight.call(context);
            context.hovered_id = d.values[0].values.raw[0][context.config.id_col];
            highlight.call(context);
        })
        .on('mouseout', function(d) {
            delete context.hovered_id;
            clearHighlight.call(context);
        })
        .on('click', d => {
            this.selected_id = d.values[0].values.raw[0][this.config.id_col];
            clearSelected.call(this);
            applySelected.call(this);
            highlight.call(this);
            smallMultiples.call(this);
        });
}
