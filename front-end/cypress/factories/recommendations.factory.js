import { faker } from "@faker-js/faker"


export function generateCorrectNameAndLink() {
    const name = faker.lorem.words(3);
    const youtubeLink = `https://www.youtube.com/watch?v=${faker.random.word()}`;
    return {
        name,
        youtubeLink,
    };
}