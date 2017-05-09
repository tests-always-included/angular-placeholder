"use strict";

describe("taiPlaceholder as node library", () => {
    beforeEach(() => {
        var g;

        g = jasmine.getGlobal();
        g.angular = jasmine.createSpyObj("angular", [
            "directive",
            "module"
        ]);
        g.angular.directive.and.returnValue(g.angular);
        g.angular.module.and.returnValue(g.angular);
    });
    it("exports \"taiPlaceholder\"", () => {
        expect(require("..")).toEqual("taiPlaceholder");
    });
});
