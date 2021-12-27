## Required

- create a utils directory in root
- in it create `sanityClient.js` with:

```js
import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "",
  dataset: "",
  apiVersion: "2021-08-31",
  useCdn: false,
});
```
