import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').notNullable();
        table.uuid('walletId').notNullable();
        table.decimal('balance',32, 4).notNullable();
        table.decimal('amount',32, 4).defaultTo(0);
        table.string('description').defaultTo('');
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.primary(['id','walletId']);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions');
}

