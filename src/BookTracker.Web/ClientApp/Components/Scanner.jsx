import React, { Component } from 'react';
import Quagga from 'quagga';
import { styles } from '../styles'

// Create the QuaggaJS config object for the live stream
let liveStreamConfig = {
    inputStream: {
        type: "LiveStream",
        constraints: {
            width: { min: 640 },
            height: { min: 480 },
            aspectRatio: { min: 1, max: 100 },
            facingMode: "environment" // or "user" for the front camera
        }
    },
    locator: {
        patchSize: "medium",
        halfSample: true
    },
    numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
    decoder: {
        "readers": [
            { "format": "ean_reader", "config": {} }
        ]
    },
    locate: true
};

export default class Scanner extends Component {
    render() {
        return (
            <div id="interactive" className="viewport" style={styles.viewport} />
        );
    }

    componentDidMount() {
        if(this.props.scannerOn) {
            this.initQuagga()
        }
    }

    initQuagga() {
        Quagga.init(
            liveStreamConfig,
            function (err) {
                if (err) {
                    console.log(err);
                    Quagga.stop();
                    return;
                }
                Quagga.start();
            }
        );

        // Make sure, QuaggaJS draws frames an lines around possible 
        // barcodes on the live stream
        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });

        
        Quagga.onDetected(this._onDetected.bind(this));
    }

    componentWillUnmount() {
        //Quagga.offDetected(this._onDetected);
        if (this.props.scannerOn && Quagga) {
            Quagga.stop()
        }
    }

    componentWillReceiveProps(nextProps) {
        const { scannerOn } = this.props
        if (scannerOn !== nextProps.scannerOn) {
            if(Quagga) {
                console.info(`Quagga was on/off ${scannerOn} now is on/off ${nextProps.scannerOn}`)
                if(nextProps.scannerOn) {
                    this.initQuagga()
                }   
                else {
                    Quagga.stop()
                }
            }
        }
    }

    _onDetected(result) {
        if (result.codeResult.code) {
            console.info(`scanned code ${result.codeResult.code}`)
            this.props.onDetected(result.codeResult.code);
        }
    }
}