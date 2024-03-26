import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class InitData1711457576876 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
