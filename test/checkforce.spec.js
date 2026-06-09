import CheckForce from "../src/index.js";
var assert = require("assert");

describe("CheckForce", () => {
  before(() => {
    global.input = document.createElement("input");
    global.input.setAttribute("type", "password");
    global.input.setAttribute("id", "password");
    global.input.setAttribute("value", "Aa12!");
    document.body.appendChild(global.input);
  });

  describe("Test", () => {
    describe("Letters", () => {
      it("number of uppercase letters", function () {
        const res = new CheckForce("#password").checkPasswordOnlyTest();
        assert.equal(res.uppercaseCheck.lengthUppercase, 1);
      });

      it("number of lowercase letters", function () {
        const res = new CheckForce("#password").checkPasswordOnlyTest();
        assert.equal(res.lowercaseCheck.lengthLowercase, 1);
      });

      it("uppercase equals true", function () {
        const res = new CheckForce("#password").checkPasswordOnlyTest();
        assert.equal(res.uppercaseCheck.haveUppercase, true);
      });

      it("lowercase equals true", function () {
        const res = new CheckForce("#password").checkPasswordOnlyTest();
        assert.equal(res.lowercaseCheck.haveLowercase, true);
      });
    });

    describe("Numbers", () => {
      it("number of special characters", () => {
        const res = new CheckForce("#password").checkPasswordOnlyTest();
        assert.equal(res.charsSpecialCheck.lengthChars, 1);
      });

      it("number of numbers", function () {
        const res = new CheckForce("#password").checkPasswordOnlyTest();
        assert.equal(res.numberCheck.lengthNumber, 2);
      });
    });
  });
});
