/**
 * @file Bvh grammar for tree-sitter
 * @author Stefan Webb <info@stefanwebb.me>
 * @license CC BY-SA 4.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "bvh",

  rules: {
    source_file: $ => seq(
      $.hierarchy,
      $.motion
    ),

    hierarchy: $ => seq(
      'HIERARCHY',
      $.root,
    ),

    root: $ => seq(
      'ROOT',
      $._elem
    ),

    joint: $ => seq(
      'JOINT',
      $._elem
    ),

    _elem: $ => seq(
      $.identifier,
      '{',
      $.offset,
      $.channels,
      choice(
        repeat1($.joint),
        $.end_site),
      '}',
    ),

    offset: $ => seq(
      'OFFSET',
      $.float,
      $.float,
      $.float
    ),

    channels: $ => seq(
      'CHANNELS',
      $.positive_integer,
      repeat1($.channel)
    ),

    channel: $ => choice(
      'Xposition',
      'Yposition',
      'Zposition',
      'Xrotation',
      'Yrotation',
      'Zrotation',
    ),

    end_site: $ => seq(
      'End Site',
      '{',
      $.offset,
      '}'
    ),

    motion: $ => seq(
      'MOTION',
      $.frames,
      $.frame_rate,
      $.motion_data
    ),

    frames: $ => seq(
      'Frames:',
      $.positive_integer
    ),

    frame_rate: $ => seq(
      'Frame Time:',
      $.float
    ),

    motion_data: $ => repeat1($.float),

    identifier: $ => /[$_a-zA-Z][$\w]*/,

    // TODO: Eliminate numbers like 007
    positive_integer: $ => /[0-9]+/,

    float: $ => /[+-]?(\d+\.\d*|\d*\.\d+)([eE][+-]?\d+)?/,
  }
});
