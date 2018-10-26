//code from: http://nklein.com/2009/09/fourier-transforms-in-javascript/
//I just made some modifications

var fftData = function () {
    this.width = 0;
    this.height = 0;
    this.real = [];
    this.imag = [];
}

var fftSpectrumOriginal = new fftData();
var fftSpectrumModified = new fftData();
var numberOfSamples = 1;

function fftCopyData(dataSource, dataDestination){
    dataDestination.width = dataSource.width;
    dataDestination.height = dataSource.height;
    dataDestination.real = dataSource.real.slice();
    dataDestination.imag = dataSource.imag.slice();
}


function calculteMagnitude(realComponent, complexComponent){
    return Math.sqrt((realComponent*realComponent) + (complexComponent*complexComponent));
}

function getRealComponent(index){
    var newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
    var newIndex2 = (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);
    newIndex = newIndex + newIndex2;
    return real[newIndex];
}

function getImagineryComponent(index){
    var newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
    var newIndex2 = (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);
    newIndex = newIndex + newIndex2;
    return imag[newIndex];
}


function getNextPowerOfTwo( nn ) {
    var pp = 1;
    while ( pp < nn ) {
        pp *= 2;
    }
    return pp;
}

function __rearrangeSamples( _array, _offset, _ww, _stride ) {
    var target = 0;
    for ( var pos = 0; pos < _ww; ++pos ) {
        if ( target > pos ) {
            for ( var kk = 0; kk < 4; ++kk ) {
                var tmp = _array[ target*_stride + kk + _offset ];
                _array[ target*_stride + kk + _offset ]
                    = _array[ pos*_stride + kk + _offset ];
                _array[ pos*_stride + kk + _offset ] = tmp;
            }
        }
        var mask = _ww;
        while ( ( target & ( mask >>= 1 ) ) ) {
            target &= ~mask;
        }
        target |= mask;
    }
}

function __shiftSamples( _samps, _base, _ww, _stride ) {
    var mid = _base + _ww * _stride / 2;

    for ( var ii=0; ii < _ww/2; ++ii ) {
        for ( var kk=0; kk < 3; ++kk ) {
            var tmp = _samps[ _base + ii*_stride + kk ];
            _samps[ _base + ii*_stride + kk ]
                = _samps[ mid + ii*_stride + kk ];
            _samps[ mid + ii*_stride + kk ] = tmp;
        }
    }
}

function __performFFT( _real, _imag, _ww, _hh, _dx, _dy, _inverse ) {
    for ( var jj = 0; jj < _hh; ++jj ) {
        //if ( _inverse ) {
        //    __shiftSamples( _real, jj * _dy, _ww, _dx );
        //    __shiftSamples( _imag, jj * _dy, _ww, _dx );
        //}

        __rearrangeSamples( _real, jj * _dy, _ww, _dx );
        __rearrangeSamples( _imag, jj * _dy, _ww, _dx );

        var pi = 3.14159265358979323846264338327950288;
        var angularScale = ( _inverse ) ? pi : -pi;
        for ( var step = 1; step < _ww; step += step ) {
            var delta = angularScale / step;
            var sine = Math.sin( delta / 2.0 );
            var fac_r = 1.0;
            var fac_i = 0.0;
            var mul_r = -2.0 * sine * sine;
            var mul_i = Math.sin( delta );
            for ( var group = 0; group < step; ++group ) {
                for ( var pair = group; pair < _ww; pair += step * 2 ) {
                    var match = pair + step;
                    for ( var kk = 0; kk < 3; ++kk ) {
                        var p_index = jj * _dy + pair * _dx + kk;
                        var m_index = jj * _dy + match * _dx + kk;
                        var rr = _real[ m_index ];
                        var ii = _imag[ m_index ];

                        var prod_r = rr * fac_r - ii * fac_i;
                        var prod_i = rr * fac_i + ii * fac_r;

                        _real[ m_index ] = _real[ p_index ] - prod_r;
                        _imag[ m_index ] = _imag[ p_index ] - prod_i;
                        _real[ p_index ] += prod_r;
                        _imag[ p_index ] += prod_i;
                    }
                }

                var inc_r = mul_r * fac_r - mul_i * fac_i;
                var inc_i = mul_r * fac_i + mul_i * fac_r;
                fac_r += inc_r;
                fac_i += inc_i;
            }
        }

        /*if ( !_inverse ) {
            __shiftSamples( _real, jj * _dy, _ww, _dx );
            __shiftSamples( _imag, jj * _dy, _ww, _dx );
        }*/
    }


    return {
        width: _ww,
        height: _hh,
        real: _real,
        imag: _imag,
    };
}


function FFT( _canvasId, compressionType ) {
    var canvas = document.getElementById( _canvasId );
    if ( !canvas ) {
        return false;
    }

    var ww = canvas.width;
    var hh = canvas.height;
    numberOfSamples = ww*hh;

    var context = canvas.getContext( '2d' );
    if ( !context ) {
        return false;
    }

    var rawResult = context.getImageData( 0, 0, ww, hh );
    var result = rawResult.data;

    var real = new Array();
    var imag = new Array();

    real.length = ww * hh * 4;
    imag.length = ww * hh * 4;

    for ( var pp=0; pp < result.length; ++pp ) {
        real[ pp ] = result[ pp ] ;
        imag[ pp ] = 0.0;
    }

    var fftData = __performFFT( real, imag, ww, hh, 4, ww*4, false );
    __performFFT( real, imag, hh, ww, ww*4, 4, false );

    fftSpectrumOriginal.width = fftData.width;
    fftSpectrumOriginal.height = fftData.height;
    fftSpectrumOriginal.real = fftData.real.slice();
    fftSpectrumOriginal.imag = fftData.imag.slice();


    var index,rr,ii,newIndex;


    if(compressionType == 1) {
        var maximumValue = 1;
        /*for (var pp = 0; pp < result.length; pp += 4) {
            for (var kk = 0; kk < 3; ++kk) {
                index = pp + kk;
                rr = real[index];
                ii = imag[index];
                result[index] = Math.log(calculteMagnitude(rr, ii) + 1);
                if(result[index] > maximumValue){
                    maximumValue =  result[index];
                }
            }
            result[pp + 3] = 255;
        }

        for (var pp = 0; pp < result.length; pp += 4) {
            for (var kk = 0; kk < 3; ++kk) {
                index = pp + kk;
                result[index] = (result[index]/maximumValue)*255;
            }
            result[pp + 3] = 255;
        }*/


        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                index = ((row*imageWidthZeroPadding)+col);
                //newIndex = index;
                newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
                newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);

                rr  = real[(newIndex)*4];
                ii = imag[(newIndex)*4];
                result[(index)*4] = Math.log(calculteMagnitude(rr, ii) + 1);
                if(result[(index)*4] > maximumValue){
                    maximumValue =  result[(index)*4];
                }

                rr  = real[(newIndex)*4+ 1];
                ii = imag[(newIndex)*4+ 1];
                result[(index)*4+ 1] = Math.log(calculteMagnitude(rr, ii) + 1);
                if(result[(index)*4+ 1] > maximumValue){
                    maximumValue =  result[(index)*4+ 1];
                }

                rr  = real[(newIndex)*4+ 2];
                ii = imag[(newIndex)*4+ 2];
                result[(index)*4+ 2] = Math.log(calculteMagnitude(rr, ii) + 1);
                if(result[(index)*4+ 2] > maximumValue){
                    maximumValue =  result[(index)*4+ 2];
                }

                result[(index)*4+ 3] = 255 ;
            }
        }

        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                index = ((row*imageWidthZeroPadding)+col);
                result[(index)*4] = (result[(index)*4]/maximumValue)*255;
                result[(index)*4+1] = (result[(index)*4+1]/maximumValue)*255;
                result[(index)*4+2] = (result[(index)*4+2]/maximumValue)*255;
            }
        }


    }

    if(compressionType == 2) {//divided by number of samples
        /*for (var pp = 0; pp < result.length; pp += 4) {
            for (var kk = 0; kk < 3; ++kk) {
                index = pp + kk;
                rr = real[index];
                ii = imag[index];
                result[index] = calculteMagnitude(rr, ii) * 255/numberOfSamples ;
            }
            result[pp + 3] = 255;
        }*/

        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                index = ((row*imageWidthZeroPadding)+col);
                newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
                newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);

                rr  = real[(newIndex)*4];
                ii = imag[(newIndex)*4];
                result[(index)*4] = calculteMagnitude(rr, ii) * 255/numberOfSamples ;

                rr  = real[(newIndex)*4+ 1];
                ii = imag[(newIndex)*4+ 1];
                result[(index)*4+ 1] = calculteMagnitude(rr, ii) * 255/numberOfSamples ;

                rr  = real[(newIndex)*4+ 2];
                ii = imag[(newIndex)*4+ 2];
                result[(index)*4+ 2] = calculteMagnitude(rr, ii) * 255/numberOfSamples ;

                result[(index)*4+ 3] = 255 ;
            }
        }
    }

    context.putImageData( rawResult, 0, 0 );

    return fftData;
}

function IFFT( _fftData, _canvasId, compressionType ) {
    var canvas = document.getElementById( _canvasId );
    if ( !canvas ) {
        return false;
    }


    var ww = _fftData.width;
    var hh = _fftData.height;
    //var ww = widthFFT;
    //var hh = heightFFT;


    canvas.width = ww;
    canvas.height = hh;

    var context = canvas.getContext( '2d' );
    if ( !context ) {
        return false;
    }

    var real = _fftData.real.slice();
    var imag = _fftData.imag.slice();

    __performFFT( real, imag, hh, ww, ww*4, 4, true );
    __performFFT( real, imag, ww, hh, 4, ww*4, true );

    var rawResult = context.getImageData( 0, 0, ww, hh );
    var result = rawResult.data;


    var scale = ww * hh;


    if(compressionType == 1){
        for ( var pp=0; pp < result.length; pp += 4 ) {
            for ( var kk=0; kk < 3; ++kk ) {
                var index = pp + kk;
                //var vv = 255 * real[ index ] / scale;
                var vv = real[ index ]/numberOfSamples ;
                if ( vv < 0 ) {
                    vv = 0;
                }
                else if ( 255 < vv ) {
                    vv = 255;
                }
                result[ index ] = vv;
            }
            result[ pp + 3 ] = 255;
            //result[ pp + 3 ] =
        }
    }

    if(compressionType == 2){
        for ( var pp=0; pp < result.length; pp += 4 ) {
            for ( var kk=0; kk < 3; ++kk ) {
                var index = pp + kk;
                //var vv = 255 * real[ index ] / scale;
                var vv = real[ index ] /numberOfSamples;
                if ( vv < 0 ) {
                    vv = 0;
                }
                else if ( 255 < vv ) {
                    vv = 255;
                }
                result[ index ] = vv;
            }
            result[ pp + 3 ] = 255;
            //result[ pp + 3 ] =
        }
    }
    if(compressionType == 3){
        for ( var pp=0; pp < result.length; pp += 4 ) {
            for ( var kk=0; kk < 3; ++kk ) {
                var index = pp + kk;
                //var vv = 255 * real[ index ] / scale;
                var vv = real[ index ] /numberOfSamples;
                if ( vv < 0 ) {
                    vv = 0;
                }
                else if ( 255 < vv ) {
                    vv = 255;
                }
                result[ index ] = vv;
            }
            result[ pp + 3 ] = 255;
            //result[ pp + 3 ] =
        }
    }


    context.putImageData( rawResult, 0, 0 );
    return true;
}




/**
 * Created by mypc on 10/12/2015.
 */
