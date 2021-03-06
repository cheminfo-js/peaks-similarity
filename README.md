# peaks-similarity

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Peaks similarity - calculate a similarity between 0 and 1  of 2 arrays of [x,y] points.

## Description

The idea is to calculate a similarity value between 0 and 1 between two arrays of peaks ([x,y] points).

```javascript
var peaks1=[[1,1],[2,2]];
var peaks2=[[1,2],[2,1]];

var Comparator = require('..');
var comparator=new Comparator({widthBotom: 4, widthTop: 2});
var result=comparator.getSimilarity(peaks1, peaks2);

console.log(result);
```

options
 * widthBottom : bottom width of the trapezoid (default: 2)
 * widthTop : top width of the trapezoid (default: 1)
 * trapezoid : Should we use overlapping of trapezoids surface (default: false). If trapezoid is false it is based only on peaks and not surface.
 * common: Only take the common part of the array based on the widthBottom of the trapezoid (default: false)
   * true: take the common part between the 2 array
   * first: keep first array and take the common part of the second one
   * second: keep second array and take the common part of the first one

## Methods

* setOptions(newOptions)
* setPeaks1(anArray)
* setPeaks2(anArray)
* getExtract1()
* getExtract2()
* getExtractInfo1()
* getExtractInfo2()
* setTrapezoid(newWidthBottom, newWidthTop)
* setFromTo(newFrom, newTo)
* getOverlap(x1, y1, x2, y2)
* getOverlapTrapezoid(x1, y1, x2, y2)
* calculateDiff()
* checkArray(points)
* getSimilarity(newPeaks1, newPeaks2)
* fastSimilarity(newPeaks2, from, to)
  * newPeaks2 has to be normalized (sum to 1)
  * fastSimilarity will use the common parameter. This parameter
    may be 'second' and will take the peaks1 that are at a distance less
    than widthBottom of any peak of peaks2

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/peaks-similarity.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/peaks-similarity
[travis-image]: https://img.shields.io/travis/cheminfo-js/peaks-similarity/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/peaks-similarity
[david-image]: https://img.shields.io/david/cheminfo-js/peaks-similarity.svg?style=flat-square
[david-url]: https://david-dm.org/cheminfo-js/peaks-similarity
[download-image]: https://img.shields.io/npm/dm/peaks-similarity.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/peaks-similarity
