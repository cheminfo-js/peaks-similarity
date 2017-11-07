'use strict';

require('should');
var Comparator = require('..');

describe('We check that array of points are not converted and are normalized', function () {
    var comparator = new Comparator({});
    comparator.setPeaks1([[1, 2], [2, 3]]);
    comparator.setPeaks2([[1, 2], [1, 1]]);

    it('getExtract1', function () {
        comparator.getExtract1().should.eql([[1, 2], [0.4, 0.6]]);
    });
    it('getExtract2', function () {
        comparator.getExtract2().should.eql([[1, 2], [0.5, 0.5]]);
    });
});


describe('We check that [[x1,x2,x3,...],[y1,y2,y3,...]] is converted and normalized', function () {
    var comparator2 = new Comparator({});
    comparator2.setPeaks1([[1, 2, 3], [1, 2, 5]]);
    comparator2.setPeaks2([[2, 3, 4], [2, 4, 2]]);

    it('getExtract1', function () {
        comparator2.getExtract1().should.eql([[1, 2, 3], [0.125, 0.25, 0.625]]);
    });
    it('getExtract2', function () {
        comparator2.getExtract2().should.eql([[2, 3, 4], [0.25, 0.5, 0.25]]);
    });
});

describe('We check that from / to options works', function () {
    var comparator3 = new Comparator({from: 1, to: 2});
    comparator3.setPeaks1([[1, 2, 3], [2, 2, 5]]);
    comparator3.setPeaks2([[2, 3, 4], [2, 4, 2]]);

    it('getExtract1', function () {
        comparator3.getExtract1().should.eql([[1, 2], [0.5, 0.5]]);
    });
    it('getExtract2', function () {
        comparator3.getExtract2().should.eql([[2], [1]]);
    });
});


describe('We check that from / to options works and can be changed', function () {
    var comparator4 = new Comparator();
    comparator4.setPeaks1([[1, 2, 3], [2, 2, 5]]);
    comparator4.setPeaks2([[2, 3, 4], [2, 4, 2]]);
    comparator4.setFromTo(1, 2);

    it('getExtract1', function () {
        comparator4.getExtract1().should.eql([[1, 2], [0.5, 0.5]]);
    });
    it('getExtract2', function () {
        comparator4.getExtract2().should.eql([[2], [1]]);
    });
});


describe('We check that we can change the peaks', function () {
    var comparator5 = new Comparator();
    comparator5.setPeaks1([[1], [2]]);
    comparator5.setPeaks2([[2, 3, 4], [2, 4, 2]]);
    comparator5.setFromTo(1, 2);
    comparator5.setPeaks1([[1, 2, 3], [2, 2, 5]]);

    it('getExtract1', function () {
        comparator5.getExtract1().should.eql([[1, 2], [0.5, 0.5]]);
    });
    it('getExtract2', function () {
        comparator5.getExtract2().should.eql([[2], [1]]);
    });
});

describe('We check similarity of identical spectra', function () {
    var comparator6 = new Comparator();
    comparator6.setTrapezoid(0.2, 0.2);
    comparator6.setPeaks1([[1, 2], [2, 3]]);
    comparator6.setPeaks2([[1, 2], [2, 3]]);

    it('getSimilarity', function () {
        var similarity = comparator6.getSimilarity();
        similarity.similarity.should.equal(1);
        similarity.extractInfo1.sum.should.equal(5);
        similarity.extractInfo1.min.should.equal(2);
        similarity.extractInfo1.max.should.equal(3);
    });
});

describe('We check similarity without overlap', function () {
    var comparator7 = new Comparator();
    comparator7.setTrapezoid(0.2, 0.2);

    it('getSimilarity', function () {
        comparator7.getSimilarity([[1, 2], [1, 1]], [[1, 2], [1, 1]]).similarity.should.equal(1);
        comparator7.getSimilarity([[1, 2], [1, 1]], [[1, 3], [1, 1]]).similarity.should.equal(0.5);
        comparator7.getSimilarity([[1, 2], [1, 1]], [[3, 4], [1, 1]]).similarity.should.equal(0);
    });
});

describe('We check similarity with overlap', function () {
    var comparator8 = new Comparator();
    comparator8.setTrapezoid(2, 2);

    it('getSimilarity', function () {
        comparator8.getSimilarity([[1, 2], [1, 1]], [[1, 1]]).similarity.should.equal(1);
        comparator8.getSimilarity([[1, 2], [1, 1]], [[1, 3], [1, 1]]).similarity.should.equal(1);
        comparator8.getSimilarity([[1, 2], [1, 1]], [[3, 4], [1, 1]]).similarity.should.equal(0.5);
    });
});

describe('We check similarity with overlap of trapezoid', function () {
    var comparator9 = new Comparator();
    comparator9.setTrapezoid(4, 2);

    it('getSimilarity', function () {
        comparator9.getSimilarity([[1, 2], [1, 1]], [[1, 1]]).similarity.should.equal(1);
        comparator9.getSimilarity([[1, 1]], [[1, 2], [1, 1]]).similarity.should.equal(1);
        comparator9.getSimilarity([[1, 1]], [[4, 1]]).similarity.should.equal(0.0);
        comparator9.getSimilarity([[1, 1]], [[1, 4], [1, 1]]).similarity.should.equal(0.5);

        comparator9.getSimilarity([[1, 2], [1, 1]], [[1, 3], [1, 1]]).similarity.should.equal(1);
        comparator9.getSimilarity([[1, 2], [1, 1]], [[3, 4], [1, 1]]).similarity.should.equal(0.5);

        comparator9.getSimilarity([[1, 1]], [[2.5, 1]]).similarity.should.equal(0.5);
        comparator9.getSimilarity([[1, 2], [1, 1]], [[2.5, 1]]).similarity.should.equal(1);
        comparator9.getSimilarity([[1, 2], [3, 1]], [[2.5, 1]]).similarity.should.equal(0.75);
        comparator9.getSimilarity([[1, 2], [1, 1]], [[2.5, 3.5], [1, 1]]).similarity.should.equal(0.75);
        comparator9.getSimilarity([[1, 2], [3, 1]], [[2.5, 3.5], [1, 1]]).similarity.should.equal(0.625);
    });
});
