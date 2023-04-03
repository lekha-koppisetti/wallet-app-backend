import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('wallets', (table) => {
        table.uuid('id').notNullable();
        table.string('name').notNullable();
        table.float('balance', 32, 4).defaultTo(0);
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
        table.primary(['id']);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('wallets');
}
