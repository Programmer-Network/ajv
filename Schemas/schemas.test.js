import { ajv } from "../ajv";
import articleSchemas from "./article";

describe("Article Schema", () => {
    let validate;

    beforeEach(() => {
        validate = ajv.compile(articleSchemas.article);
    });

    test("should fail if title is less then minimum length", () => {
        const tiptapContent = JSON.stringify({
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [{ type: "text", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dolorum numquam adipisci optio! Numquam quibusdam nostrum odit veritatis rerum! Ipsum corporis fugiat voluptatibus quae odio, dignissimos blanditiis mollitia, eum eveniet officiis harum nihil error nisi excepturi distinctio! Nesciunt quasi sit aliquid dolorem accusamus ipsam provident, numquam ipsa minima. Maiores qui laudantium sequi unde, minima repellat velit illo quae, voluptatem harum nostrum ut nobis, amet esse incidunt a odio. Eveniet praesentium nobis iure neque eaque? Aliquid, temporibus? Quod numquam sit dignissimos laboriosam, tenetur optio aliquam reprehenderit. Dolor minima non quisquam provident nulla quo, voluptates blanditiis sint praesentium eos nobis dolorum placeat!" }],
                },
            ],
        });

        const article = {
            title:
                "Valid content that does not contain​ any bad words and is at least 250 characters ​ ====+++++​",
            summary: "A valid summary that is at least forty-five characters",
            tags: [1, 2],
            content: tiptapContent,
            isDraft: false,
        };

        const valid = validate(article);

        expect(valid).toBe(false);
    });
});
