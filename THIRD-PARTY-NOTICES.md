# Third-Party Notices

StampIt's own code is under the MIT License in [LICENSE.md](LICENSE.md). This file lists
the third-party software it includes and the licences that cover it.

## Font: Ubuntu Medium
- **License**: Ubuntu Font Licence 1.0, see [wasm/src/FONT-LICENSE.md](wasm/src/FONT-LICENSE.md)
- **Source**: [Ubuntu Font Family](https://design.ubuntu.com/font/)
- **Usage**: `app/assets/fonts/Ubuntu-M.ttf` is the full face. A subset of it, renamed
  *Ubuntu Medium derivative Image Stamper* as the licence requires of a modified version, is
  embedded in the WebAssembly binary to draw the caption

## Rust Dependencies
Every crate compiled into the WebAssembly binary, with the licence it is used under and that
licence's text, is listed in
[packages/image-stamper/THIRD-PARTY-LICENSES.md](packages/image-stamper/THIRD-PARTY-LICENSES.md),
generated from `wasm/Cargo.lock`. The direct dependencies are:
- **image**: MIT OR Apache-2.0
- **ab_glyph**: Apache-2.0
- **kamadak-exif**: BSD-2-Clause
- **wasm-bindgen**: MIT OR Apache-2.0
- **console_error_panic_hook**: MIT OR Apache-2.0

## JavaScript/TypeScript Dependencies
Please refer to `package.json` for a complete list of dependencies and their respective licenses.
