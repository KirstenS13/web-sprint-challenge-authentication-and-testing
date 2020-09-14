exports.seed = async function (knex) {
  await knex("users").truncate()
  await knex("users").insert([
    { username: "amy", password: "$2a$14$ZmHxvNoT7VdPdOqKvg61l.b2O2mTulaRAFTpb.xYay1UzAMzknXKe" },
    { username: "mark", password: "$2a$14$ZmHxvNoT7VdPdOqKvg61l.b2O2mTulaRAFTpb.xYay1UzAMzknXKe" },
    { username: "ethan", password: "$2a$14$ZmHxvNoT7VdPdOqKvg61l.b2O2mTulaRAFTpb.xYay1UzAMzknXKe" },
  ])
}
