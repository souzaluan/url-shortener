import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameUrlsTableColumns1729366062644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('urls', 'shortened_url', 'slug')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('urls', 'slug', 'shortened_url')
  }
}
