import { describe, expect, it } from "vitest";
import { CurrencyParsers } from "./CurrencyParsers";
import { ResultService } from "../../services/ResultService";

describe("fromDirtyString", () => {
  it.each([
    ["123", 12300],
    ["1234", 123400],
    ["00012", 1200],
  ])("handles positive integers", (input, expected) => {
    expect(CurrencyParsers.fromDirtyString(input)).toEqual(
      ResultService.ok(expected),
    );
  });

  it.each([
    ["-123", -12300],
    ["-1234", -123400],
    ["-00012", -1200],
  ])("handles negative integers", (input, expected) => {
    expect(CurrencyParsers.fromDirtyString(input)).toEqual(
      ResultService.ok(expected),
    );
  });

  it.each([
    ["123.45", 12345],
    ["1234567.89", 123456789],
    ["12,345,678.90", 1234567890],
    ["-123.45", -12345],
    ["-1234567.89", -123456789],
    ["-12,345,678.90", -1234567890],
  ])("handles floats (`.` separator)", (input, expected) => {
    expect(CurrencyParsers.fromDirtyString(input)).toEqual(
      ResultService.ok(expected),
    );
  });

  it.each([
    ["123,45", 12345],
    ["1234567,89", 123456789],
    ["12.345.678,90", 1234567890],
    ["-123,45", -12345],
    ["-1234567,89", -123456789],
    ["-12.345.678,90", -1234567890],
  ])("handles floats (`,` separator)", (input, expected) => {
    expect(CurrencyParsers.fromDirtyString(input)).toEqual(
      ResultService.ok(expected),
    );
  });

  it.each([
    ["R$123", 12300],
    ["R$123,45", 12345],
    ["R$1234567,89", 123456789],
    ["-R$123", -12300],
    ["-R$123,45", -12345],
    ["-R$1234567,89", -123456789],
  ])("handles `R$` prefix", (input, expected) => {
    expect(CurrencyParsers.fromDirtyString(input)).toEqual(
      ResultService.ok(expected),
    );
  });

  it.each([
    ["83.8", 8380],
    ["-687.99", -68799],
  ])("handles Azos' format", (input, expected) => {
    expect(CurrencyParsers.fromDirtyString(input)).toEqual(
      ResultService.ok(expected),
    );
  });

  it.each([
    ["1.774,17", 177417],
    ["-R$  20,14 ", -2014],
  ])("handles Azos-bonus' format", (input, expected) => {
    expect(CurrencyParsers.fromDirtyString(input)).toEqual(
      ResultService.ok(expected),
    );
  });
});
