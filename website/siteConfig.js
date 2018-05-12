/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const users = [
  {
    caption: "Facebook",
    image: "img/logos/facebook.svg",
    infoLink: "https://www.facebook.com",
    pinned: true
  },
  {
    caption: "Messenger",
    image: "img/logos/messenger.svg",
    infoLink: "https://messenger.com",
    pinned: true
  },
  {
    caption: "WOW air",
    image: "img/logos/wowair.svg",
    infoLink: "https://wowair.com",
    pinned: true
  },
  {
    caption: "BeOpinion",
    image: "img/logos/beopinion.svg",
    infoLink: "https://beopinion.com",
    pinned: true
  },
  {
    caption: "Gain by Sentia",
    image: "img/logos/gain_logo.svg",
    infoLink: "https://gain.ai",
    pinned: true
  },
  {
    caption: "Social Tables",
    image: "img/logos/socialtables.svg",
    infoLink: "https://www.socialtables.com",
    pinned: true
  },
  {
    caption: "Ahrefs",
    image: "img/logos/ahrefs.svg",
    infoLink: "https://ahrefs.com",
    pinned: true
  },
];

const examples = [
  {
    name: "Hacker News",
    image: "/img/examples/hn.png",
    link: "https://github.com/reasonml-community/reason-react-hacker-news",
  },
  {
    name: "TodoMVC",
    image: "/img/examples/todomvc.png",
    link: "https://github.com/reasonml-community/reason-react-example/tree/master/src/todomvc",
  }
]

const siteConfig = {
  title: "BuckleScript",
  tagline: "Write safer and simpler code in OCaml & Reason, compile to JavaScript.",
  url: "https://bucklescript.github.io",
  editUrl: "https://github.com/bucklescript/bucklescript.github.io/tree/source/docs/",
  translationRecruitingLink: "https://crowdin.com/project/bucklescript",
  sourceCodeButton: null,
  baseUrl: "/",
  projectName: "",
  headerLinks: [
    { doc: "installation", label: "Docs" },
    { doc: "playground", label: "Try"},
    { doc: "stdlib-overview", label: "API" },
    { doc: "community", label: "Community" },
    { blog: true, label: "Blog" },
    { languages: true },
    { search: true },
    { href: "https://github.com/bucklescript/bucklescript", label: "GitHub" },
  ],
  scripts: ["/js/toggleSyntaxButton.js"],
  users,
  examples,
  headerIcon: "img/logos/bucklescript_small.svg",
  // footerIcon: "img/logo.svg",
  favicon: "img/logos/bucklescript_small.svg",
  /* colors for website */
  colors: {
    primaryColor: "#ab5ea3",
    secondaryColor: "#ab5ea3",
    codeColor:
      "rgba(171, 94, 163, 0.03)" /* primaryColor in rgba form, with 0.03 alpha */
  },
  highlight: {
    theme: 'arduino-light',
    hljs: function(hljs) {
      hljs.registerLanguage('reason', function(hljs) {
        var SWIFT_KEYWORDS = {
            forDocGrammarHighlighting: 'ifTrue ifFalse expression testCondition startVal endVal typeConstraint typeName typeFactoryName argOneType argTwoType finalArgType typeStructure typeParam typeArg1 typeArg2 typeParam1 typeParam2 argOne argTwo finalArg argument argumentType expressionType identifier',
            keyword: 'class deinit enum extension func import init rec class let pub pri val inherit ref mutable protocol static ' +
              'module include struct subscript type typealias var break case continue default do ' +
              'else fallthrough if in of for to downto return switch where while as dynamicType ' +
              'is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ ' +
              '__LINE__ associativity didSet get infix inout left mutating none ' +
              'nonmutating operator override postfix precedence prefix => right set '+
              'unowned unowned safe unsafe weak willSet',
            literal: 'true false nil',
            built_in: 'abs advance alignof alignofValue assert bridgeFromObjectiveC ' +
              'bridgeFromObjectiveCUnconditional bridgeToObjectiveC ' +
              'bridgeToObjectiveCUnconditional c contains count countElements ' +
              'countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump ' +
              'encodeBitsAsWords enumerate equal filter find getBridgedObjectiveCType ' +
              'getVaList indices insertionSort isBridgedToObjectiveC ' +
              'isBridgedVerbatimToObjectiveC isUniquelyReferenced join ' +
              'lexicographicalCompare map max maxElement min minElement numericCast ' +
              'partition posix print println quickSort reduce reflect reinterpretCast ' +
              'reverse roundUpToAlignment sizeof sizeofValue sort split startsWith strideof ' +
              'strideofValue swap swift toString transcode underestimateCount ' +
              'unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer ' +
              'withUnsafePointerToObject withUnsafePointers withVaList'
          };

        var TYPE = {
          className: 'type',
          begin: '\\b[A-Z][\\w\']*',
          relevance: 0
        };
        var BLOCK_COMMENT = hljs.COMMENT(
          '/\\*',
          '\\*/',
          {
            contains: ['self']
          }
        );
        var SUBST = {
          className: 'subst',
          begin: /\\\(/, end: '\\)',
          keywords: SWIFT_KEYWORDS,
          contains: [] // assigned later
        };
        var NUMBERS = {
            className: 'number',
            begin: '\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b',
            relevance: 0
        };
        var QUOTE_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
          contains: [SUBST, hljs.BACKSLASH_ESCAPE]
        });
        SUBST.contains = [NUMBERS];

        return {
          keywords: SWIFT_KEYWORDS,
          contains: [
            QUOTE_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            BLOCK_COMMENT,
            TYPE,
            NUMBERS,
            {
              className: 'func',
              beginKeywords: 'fun', end: '=>', excludeEnd: true,
              contains: [
                hljs.inherit(hljs.TITLE_MODE, {
                  begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
                  illegal: /\(/
                }),
                {
                  className: 'generics',
                  begin: /</, end: />/,
                  illegal: />/
                },
                {
                  className: 'params',
                  begin: /\s/, end: /\=\>/, endsParent: true, excludeEnd: true,
                  keywords: SWIFT_KEYWORDS,
                  contains: [
                    'self',
                    NUMBERS,
                    QUOTE_STRING_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    {begin: ':'} // relevance booster
                  ],
                  illegal: /["]/
                }
              ],
              illegal: /\[|%/
            },
            {
              className: 'class',
              beginKeywords: 'module struct protocol class extension enum',
              keywords: SWIFT_KEYWORDS,
              end: '\\{',
              excludeEnd: true,
              contains: [
                hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/})
              ]
            },
            {
              className: 'preprocessor', // @attributes
              begin: '(@assignment|@class_protocol|@exported|@final|@lazy|@noreturn|' +
                        '@NSCopying|@NSManaged|@objc|@optional|@required|@auto_closure|' +
                        '@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|' +
                        '@infix|@prefix|@postfix)'
            }
          ]
        };
      });
    }
  },
  algolia: {
    apiKey: "0fd97db83891aa20810559812d9e69ac",
    indexName: "bucklescript"
  },
};

module.exports = siteConfig;
