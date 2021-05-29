import React from "react";
import Chart from 'kaktana-react-lightweight-charts';
import {connect} from "react-redux";


class ChartComponent extends React.Component {
    state = {
        options: {
            alignLabels: true,
            localization: {
                timeFormatter: (businessDayOrTimestamp) => {
                    return new Date(businessDayOrTimestamp); //or whatever JS formatting you want here
                }
            },
            timeScale: {
                rightOffset: 12,
                barSpacing: 3,
                fixLeftEdge: true,
                lockVisibleTimeRangeOnResize: true,
                rightBarStaysOnScroll: true,
                borderVisible: false,
                borderColor: "#fff000",
                visible: true,
                timeVisible: true,
                secondsVisible: false
            }
        },
    };
    render() {
        const { testStrategy } = this.props;
        return (
            <div>
                 {testStrategy && (
                     <Chart
                         options={this.state.options}
                         candlestickSeries={[{data: testStrategy.candles}]}
                         autoWidth
                         height={320}
                     />
                     )
                 }
            </div>
        )
    }

}

export const mapStateToProps = (state) => {
    return {
        testStrategy: state.bot.testStrategy,
    };
};

const ConnectedComponent = connect(mapStateToProps, {

})(ChartComponent);

export default ConnectedComponent;
