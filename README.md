# Programmer Network AJV

Programmer Network AJV is an isomorphic library that enriches AJV (Another JSON Schema Validator) with custom keywords, formats, and validation schemas. These enhancements are tailored for use in both client-side and server-side environments. The library is meticulously designed to support custom validation logic that spans from detecting profanity to validating secure strings, YouTube URLs, and text presence with specific length constraints. Fully implemented in TypeScript, it ensures type safety and integrates seamlessly into TypeScript projects.

## Features

- **Custom AJV Keywords**: Includes a range of custom keywords such as `getBadWords`, `has-text`, `secure-string`, and `is-youtube-url`, with more to be added.
- **Isomorphic Design**: Can be utilized on both the client (browser) and server (Node.js), making it a versatile choice for full-stack development.
- **Comprehensive Validation**: From profanity checks to URL validation and string security assessments, the library covers a wide array of validation needs.
- **Fully Tested**: Rigorously tested to ensure reliability and performance.
- **TypeScript Support**: Written in TypeScript, offering type safety and ease of integration into TypeScript projects.

## Installation

To install Programmer Network AJV, use npm or yarn:

```bash
pnpm i install @programmer-network/ajv
```

## Usage

After installation, you can import and use the custom keywords in your AJV instances. Here's an example of how to add and use a custom keyword:

```typescript
import Ajv from "ajv";
import keywords from "@programmer-network/ajv";

const ajv = new Ajv();

// "register" the keywords
keywords.map((keyword: KeywordDefinition) => ajv.addKeyword(keyword));
```

You can use the custom keywords like you generally would:

```typescript
const validate = ajv.compile({ type: "string", "secure-string": true });
const valid = validate("some data to validate !!!)02_____d");

if (!valid) {
    console.log(validate.errors);
}
```

Take a look at [Keywords](./src/Keywords/) for all the available keywords. If you want more details into how the keywords are implemented, take a look at the [tests](./src/Utils/) for each of the utility classes.

## Contributing

We welcome contributions! If you have a custom AJV keyword, format, or schema that could benefit others, please consider submitting a pull request.
