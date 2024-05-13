<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240510090845 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE trip_country (trip_id INT NOT NULL, country_id INT NOT NULL, INDEX IDX_659F8CCBA5BC2E0E (trip_id), INDEX IDX_659F8CCBF92F3E70 (country_id), PRIMARY KEY(trip_id, country_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE trip_country ADD CONSTRAINT FK_659F8CCBA5BC2E0E FOREIGN KEY (trip_id) REFERENCES trip (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trip_country ADD CONSTRAINT FK_659F8CCBF92F3E70 FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE trip DROP FOREIGN KEY FK_7656F53BF92F3E70');
        $this->addSql('DROP INDEX IDX_7656F53BF92F3E70 ON trip');
        $this->addSql('ALTER TABLE trip DROP country_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE trip_country DROP FOREIGN KEY FK_659F8CCBA5BC2E0E');
        $this->addSql('ALTER TABLE trip_country DROP FOREIGN KEY FK_659F8CCBF92F3E70');
        $this->addSql('DROP TABLE trip_country');
        $this->addSql('ALTER TABLE trip ADD country_id INT NOT NULL');
        $this->addSql('ALTER TABLE trip ADD CONSTRAINT FK_7656F53BF92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
        $this->addSql('CREATE INDEX IDX_7656F53BF92F3E70 ON trip (country_id)');
    }
}
