

describe("tests dotenv", () => {
	it("test", () => {
		const database = process.env.DATABASE_URL;
		expect(database).not.toBeUndefined();
	});
});