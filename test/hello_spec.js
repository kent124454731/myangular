/**
 * Created by Administrator on 2017/2/4.
 */
describe("Hello", function() {
    it("says hello to receiver", function() {
        expect(sayHello('Jane')).toBe("Hello, Jane!");
    });
});