'use strict';

var layoutGrid = {
    
    /*
     * These two arrays control where we show highlight lines.  The highlight
     * lines show up in a different darker color.  Specify the column and row
     * index to show the highlight color.
     */
    highlightCols: [],
    highlightRows: [],

    showGrid: function() {
    
        var getCSSPropertyByClass = function(/*String*/ cls, /*String*/ propname) {
            var div = $('<div class="' + cls + '"></div>');
            $('body').append(div);
            var color = div.css(propname);
            div.remove();

            return color;
        };
    
        var gridOnTop = false;
        var toggleGridUp = function() {
            if (gridOnTop) {
                $('#mainGridLayout').removeAttr('style');
                $('#gridLayoutButton').text('Move grid to the top');
                gridOnTop = false;
            } else {
                $('#mainGridLayout').css('z-index', '9998');
                $('#gridLayoutButton').text('Move grid to the bottom');
                gridOnTop = true;                
            }
        };
        
        var gridOn = true;
        var toggleGridOff = function() {
            if (gridOn) {
                $('#mainGridLayout').hide()
                $('#gridOnOffButton').text('Turn grid on');
                gridOn = false;
            } else {
                $('#mainGridLayout').show();
                $('#gridOnOffButton').text('Turn grid off');
                gridOn = true;                
            }
        };
    
        var doLayoutGrid = function() {
            var context = $('#mainGridLayout').get(0).getContext('2d');
        
            var bw = $('body').width() * 1.25;
            var bh = 5000;
        
            /*
             * This controls padding for the grid.  We aren't using any right now.
             */
            var p = 0;
                    
            var rowHeight = parseInt(getCSSPropertyByClass('gridLayoutRow', 'height').replace(/[^-\d\.]/g, ''), 10);
            var colWidth = parseInt(getCSSPropertyByClass('gridLayoutColumn', 'width').replace(/[^-\d\.]/g, ''), 10);
            var spacerWidth = colWidth + parseInt(getCSSPropertyByClass('gridLayoutColumn', 'paddingRight').replace(/[^-\d\.]/g, ''), 10);
        
            for (var x = 0; x <= bw; x += spacerWidth) {
                context.moveTo(0.5 + x + p, p);
                context.lineTo(0.5 + x + p, bh + p);
            
                context.moveTo(0.5 + x + p + colWidth, p);
                context.lineTo(0.5 + x + p + colWidth, bh + p);
            }

            for (x = 0; x <= bh; x += rowHeight) {
                context.moveTo(p, 0.5 + x + p);
                context.lineTo(bw + p, 0.5 + x + p);
            }

            context.strokeStyle = getCSSPropertyByClass('gridLayoutColor', 'backgroundColor');
            context.stroke();
        
            /*
             * Draw the column highlight colors.
             */
            context.beginPath();            
            for (var i = 0; i < layoutGrid.highlightCols.length; i++) {
                context.moveTo(0.5 + (layoutGrid.highlightCols[i] * spacerWidth) + p, p);
                context.lineTo(0.5 + (layoutGrid.highlightCols[i] * spacerWidth) + p, bh + p);
            }
        
            context.strokeStyle = getCSSPropertyByClass('gridLayoutColColor', 'backgroundColor');
            context.stroke();
        
            /*
             * Draw the row highlight colors.
             */
            context.beginPath();
            console.log('layoutGrid.highlightRows: ' + JSON.stringify(layoutGrid.highlightRows));
            for (i = 0; i < layoutGrid.highlightRows.length; i++) {
                context.moveTo(p, 0.5 + (layoutGrid.highlightRows[i] * rowHeight) + p);
                context.lineTo(bw + p, 0.5 + (layoutGrid.highlightRows[i] * rowHeight) + p);
            }
        
            context.strokeStyle = getCSSPropertyByClass('gridLayoutRowColor', 'backgroundColor');
            context.stroke();
        
            var button = $('<button id="gridLayoutButton">Move grid to the top</button>');
            $('body').append(button);
            button.click(toggleGridUp);
            
            button = $('<button id="gridOnOffButton">Turn grid off</button>');
            $('body').append(button);
            button.click(toggleGridOff);
        
        };
    
        if ($('#mainGridLayout').length === 0) {
            /*
             * Then we need to add the grid.
             */
            $('body').prepend($('<canvas id="mainGridLayout" width="' + $('body').width() + '" height="5000"></canvas>'));
            doLayoutGrid();
        } else {
            $('#mainGridLayout').remove();            
        }
    
    }
};