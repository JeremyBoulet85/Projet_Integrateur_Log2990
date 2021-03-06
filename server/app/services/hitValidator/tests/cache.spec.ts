import * as chai from "chai";
import * as spies from "chai-spies";
import { Cache } from "../cache";
import { IDataToCache } from "../interfaces";

// tslint:disable:no-magic-numbers no-any

let cache: Cache<Buffer>;

const urls: string[] = ["a", "b", "c", "d", "e"];

const buffers: Buffer[] = [
    Buffer.from([0, 1, 2]),
    Buffer.from([12, 13, 24]),
    Buffer.from([34, 56, 54]),
    Buffer.from([45, 1, 78]),
    Buffer.from([4, 123, 232]),
];

const elements: IDataToCache<Buffer>[] = [
    { dataUrl: urls[0], data: buffers[0]},
    { dataUrl: urls[1], data: buffers[1]},
    { dataUrl: urls[2], data: buffers[2]},
    { dataUrl: urls[3], data: buffers[3]},
    { dataUrl: urls[4], data: buffers[4]},
];

describe("Cache tests", () => {

    beforeEach(() => {
        cache = new Cache(2);
        chai.use(spies);
    });

    it("should create an object of type Cache", (done: Function) => {

        chai.expect(new Cache(2)).instanceOf(Cache);
        done();
    });

    it("should be able to store an object of type ICachedElement", (done: Function) => {

        const spy: any = chai.spy.on(cache, "leastRecentlyUsedIndex");
        cache.insert(elements[0]);

        chai.expect(spy).to.have.been.called();
        done();
    });

    it("should be returning false on contains if cache is empty", (done: Function) => {

        const result: boolean = cache.contains(urls[0]);
        chai.expect(result).to.equal(false);
        done();
    });

    it("should be returning true on contains element is in cache", (done: Function) => {

        cache.insert(elements[0]);
        const result: boolean = cache.contains(urls[0]);
        chai.expect(result).to.equal(true);
        done();
    });

    it("should be inserting elements without loss until cache size is reached", (done: Function) => {

        cache.insert(elements[0]);
        cache.insert(elements[1]);

        const element0isCached: boolean = cache.contains(elements[0].dataUrl);
        const element1isCached: boolean = cache.contains(elements[1].dataUrl);

        chai.expect(element0isCached && element1isCached).to.equal(true);
        done();
    });

    it("should be overwriting an element once cache size is reached", (done: Function) => {

        cache.insert(elements[0]);
        cache.insert(elements[1]);
        cache.insert(elements[2]);

        const element0isCached: boolean = cache.contains(elements[0].dataUrl);

        chai.expect(element0isCached).to.equal(false);
        done();
    });

    it("should not be inserting element that is already cached", (done: Function) => {

        cache.insert(elements[0]);
        cache.insert(elements[1]);
        cache.insert(elements[0]);
        cache.insert(elements[0]);

        const element1isCached: boolean = cache.contains(elements[1].dataUrl);

        chai.expect(element1isCached).to.equal(true);
        done();
    });

    it("should be returning an element cached correctly", (done: Function) => {

        cache.insert(elements[0]);

        const elementRetrieved: Buffer | undefined = cache.get(elements[0].dataUrl);

        chai.expect(elementRetrieved).to.deep.equal(elements[0].data);
        done();
    });

    it("should be throwing an error if get function cannot find the object in cache", (done: Function) => {

        chai.expect(() => {
            cache.get(elements[0].dataUrl);
        }).to.throw(TypeError);
        done();
    });

});
