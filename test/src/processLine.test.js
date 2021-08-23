const { test, describe, expect, beforeEach } = require("@jest/globals");
const { processLine } = require("../../src");

describe('Process line test', () => {
  let jsonResult;

  beforeEach(() => {
    jsonResult = {};
  })

  test('Simple value should work fine', () => {
    processLine(jsonResult)('config = 3');
    expect(jsonResult).toStrictEqual({ config: 3 });
  });

  test('Deep nested value should work fine', () => {
    processLine(jsonResult)('config_c.root.a.b.c = 13');
    expect(jsonResult).toStrictEqual({ config_c: { root: { a: { b: { c: 13 } } } } });
  });

  test('Multiple lines should work fine', () => {
    processLine(jsonResult)('config = 3');
    processLine(jsonResult)('config_c.root.a.b.c = 13');
    expect(jsonResult).toStrictEqual({ config: 3, config_c: { root: { a: { b: { c: 13 } } } } });
  });

  test('Complex multiple lines should work fine', () => {
    processLine(jsonResult)('config_b.items = item1');
    processLine(jsonResult)('config_b.items = item2');
    processLine(jsonResult)('config_b.items.named_item = 123');
    processLine(jsonResult)('config_b.items2.items2.123 = 123');
    processLine(jsonResult)('config_b.items2.items2.456 = 456');
    processLine(jsonResult)('config_b.items2.a.b.c = 456');
    processLine(jsonResult)('config_b.items2.a.b.c = 456');
    processLine(jsonResult)('config_b.items2.a.b.c = 456');

    expect(jsonResult).toStrictEqual({
      config_b: {
        items: {
          0: 'item1',
          1: 'item2',
          named_item: 123
        },
        items2: {
          items2: {
            123: 123,
            456: 456
          },
          a: {
            b: {
              c: {

                0: 456,
                1: 456,
                2: 456,
              }
            }
          }
        }
      }
    });
  })
});