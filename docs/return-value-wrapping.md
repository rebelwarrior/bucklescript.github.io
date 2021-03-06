---
title: Return value wrapping
---

In general, the FFI code is error prone, and potentially will leak in
`undefined` or `null` values.

So we introduced auto coercion for return values to gain two benefits:

- More safety for FFI code without performance cost (explained later).

- More idiomatic OCaml code for users to consume the FFI.

Below is a contrived core example:

```reason
type element;
type dom;
[@bs.send] [@bs.return nullable]
external getElementById: (dom, string) => option(element) = "getElementById";

let test = dom => {
  let elem = dom->(getElementById("haha"));
  switch (elem) {
  | None => 1
  | Some(ui) =>
    Js.log(ui);
    2;
  };
};
```

```ocaml
type element
type dom
external getElementById : dom -> string -> element option = "getElementById"
[@@bs.send] [@@bs.return nullable]

let test dom =
    let elem = dom |. getElementById "haha" in
    match elem with
    | None -> 1
    | Some ui -> Js.log ui ; 2
```
`return nullable` attribute will automatically convert null and undefined to `option`

```reason
```
Output:
```js
function test(dom) {
  var elem = dom.getElementById("haha");
  if (elem == null) {
    return 1;
  } else {
    console.log(elem);
    return 2;
  }
}
```


Currently 4 directives are supported: `null_to_opt`, `undefined_to_opt`,
`nullable`(introduced in @1.9.0) and `identity`.
`null_undefined_to_opt` works the same as `nullable`,
but it is deprecated, `nullable` is encouraged


`null_to_opt`, `undefined_to_opt` and `nullable` will *semantically*
convert a nullable value to `option` which is a boxed value, but the compiler will
do smart optimizations to *remove such boxing overhead* when the returned value is destructed
in the same routine.

The three directives above require users to write literally `_ option`. It is
in theory not necessary, but it is required to reduce user errors.

When the return type is `unit`: the compiler will append its return value
with an OCaml `unit` literal to make sure it does return `unit`. Its main purpose
is to make the user consume FFI in idiomatic OCaml code, the cost is *very very small* and
the compiler will do smart optimizations to remove it when the returned value is not used (mostly likely).


`identity` will make sure that compiler will do nothing about the returned value. It
is rarely used, but introduced here for debugging purpose.
