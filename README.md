# moleculer-web-rate-limit-leak-example

The first two tests will close correctly. One has no rate limiting config, the other has a custom memory store without a `setInterval`

```bash
npm install

npm test without-rate-limiting.test.js
npm test with-custom-rate-limiting.test

```


This test, that uses the default MemoryStore will cause a setInterval that leaks

```bash
npm install

npm test with-rate-limiting.test

```

