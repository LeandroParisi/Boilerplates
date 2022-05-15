import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ARGUMENT1652612903813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "template",
        columns: [
          {name: "tete", type: "varchar"}
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
