/***
 * DO NOT EDIT THIS PAGE
 */

import * as t from "io-ts";

export const Joke = t.type({
  id: t.string,
  icon_url: t.string,
  url: t.string,
  value: t.string,
});

export type Joke = t.TypeOf<typeof Joke>;
