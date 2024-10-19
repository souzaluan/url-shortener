import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddUrlClicksColumn1729373634110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'urls',
      new TableColumn({
        name: 'clicks',
        type: 'int',
        default: 0,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('urls', 'clicks')
  }
}
