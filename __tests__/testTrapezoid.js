'use strict';

var Comparator = require('..');

describe('We check similarity of identical spectra trapezoid', function () {
  var comparator6 = new Comparator({ trapezoid: true });
  comparator6.setTrapezoid(0.2, 0.2);
  comparator6.setPeaks1([[1, 2], [2, 3]]);
  comparator6.setPeaks2([[1, 2], [2, 3]]);

  it('getSimilarity', function () {
    var similarity = comparator6.getSimilarity();
    expect(similarity.similarity).toBe(1);
    expect(similarity.extractInfo1.sum).toBe(5);
    expect(similarity.extractInfo1.min).toBe(2);
    expect(similarity.extractInfo1.max).toBe(3);
  });
});

describe('We check similarity without overlap trapezoid', function () {
  var comparator7 = new Comparator({ trapezoid: true });
  comparator7.setTrapezoid(0.2, 0.2);

  it('getSimilarity', function () {
    expect(
      comparator7.getSimilarity([[1, 2], [1, 1]], [[1, 2], [1, 1]]).similarity
    ).toBe(1);
    expect(
      comparator7.getSimilarity([[1, 2], [1, 1]], [[1, 3], [1, 1]]).similarity
    ).toBe(0.5);
    expect(
      comparator7.getSimilarity([[1, 2], [1, 1]], [[3, 4], [1, 1]]).similarity
    ).toBe(0);
  });
});

describe('We check similarity with overlap trapezoid', function () {
  var comparator8 = new Comparator({ trapezoid: true });
  comparator8.setTrapezoid(2, 2);

  it('getSimilarity', function () {
    expect(
      comparator8.getSimilarity([[1, 2], [1, 1]], [[1, 1]]).similarity
    ).toBe(0.75);
    expect(
      comparator8.getSimilarity([[1, 2], [1, 1]], [[1, 3], [1, 1]]).similarity
    ).toBe(0.75);
    expect(
      comparator8.getSimilarity([[1, 2], [1, 1]], [[3, 4], [1, 1]]).similarity
    ).toBe(0.25);
  });
});

describe('We check similarity with overlap of trapezoid', function () {
  var comparator9 = new Comparator({ trapezoid: true });
  comparator9.setTrapezoid(4, 2);

  it('getSimilarity', function () {
    expect(
      comparator9.getSimilarity([[1, 2], [1, 1]], [[1, 1]]).similarity
    ).toBe(0.8333333333333333);
    expect(
      comparator9.getSimilarity([[1, 1]], [[1, 2], [1, 1]]).similarity
    ).toBe(0.8333333333333333);
    expect(comparator9.getSimilarity([[1, 1]], [[4, 1]]).similarity).toBe(
      0.08333333333333337
    );
    expect(
      comparator9.getSimilarity([[1, 1]], [[1, 4], [1, 1]]).similarity
    ).toBe(0.5416666666666667);

    //     comparator9.getSimilarity([[1,1],[2,1]],[[1,1],[3,1]]).similarity.should.equal(0.75);
    //     comparator9.getSimilarity([[1,1],[2,1]],[[3,1],[4,1]]).similarity.should.equal(0.25);
  });
});
