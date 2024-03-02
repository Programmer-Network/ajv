import StringUtils from "../Utils/StringUtils";
import { KeywordDefinition, SchemaValidateFunction } from "ajv";
import { DataValidateFunction } from "ajv/dist/types";

const keywordName = "disallow-profanity";

const keyword: KeywordDefinition = {
  type: "string",
  errors: true,
  keyword: keywordName,
  compile: function compile() {
    const validate: SchemaValidateFunction | DataValidateFunction = (
      value: any
    ) => {
      validate.errors = [];

      const badWords = StringUtils.getBadWords(value);
      if (badWords.length) {
        validate.errors = [
          {
            keyword: keywordName,
            message: `Profanity is not allowed. Please remove the following words: '${badWords.join(
              ", "
            )}'`,
            params: { invalidInput: value }
          }
        ];

        return false;
      }

      return true;
    };

    return validate;
  }
};

export default keyword;
