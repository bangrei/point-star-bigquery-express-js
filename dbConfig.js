const { client } = require("google-cloud-bigquery");
const { join } = require("path");

const config = async (rows) => {
	const bigQuery = client.new({
		jsonKeyFile: join(__dirname, "./service-account.json"),
	});
	const db = bigQuery.db.get("point_star_123");
	const userTbl = db.table("tbl_registration");
	userTbl.exists().then((yes) =>
		yes
			? console.log(`Table '${userTbl.name}' already exists in DB '${db.name}'`)
			: userTbl.create
				.new({
					schema: {
						name: "string",
						email: "string",
						phone: "string",
						address: "string",
						country: "string",
						state: "string",
						city: "string",
						zipcode: "string",
						dob: "string",
						subscribe: "boolean",
						business: "string",
					},
				})
				.then(() =>
					console.log(
						`Table '${userTbl.name}' successfully added to DB '${db.name}'`
					)
				)
	);
	const res = userTbl.insert.values({
		data: rows,
		safeMode: true,
	});
	return res;
}

module.exports = config;
