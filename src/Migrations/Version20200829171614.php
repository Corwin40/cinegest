<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200829171614 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE card (id INT AUTO_INCREMENT NOT NULL, adhesion_id INT DEFAULT NULL, season_id INT DEFAULT NULL, title VARCHAR(60) NOT NULL, status VARCHAR(50) DEFAULT NULL, adress VARCHAR(100) DEFAULT NULL, complement VARCHAR(100) DEFAULT NULL, zipcode VARCHAR(5) DEFAULT NULL, city VARCHAR(60) DEFAULT NULL, phone VARCHAR(14) DEFAULT NULL, email VARCHAR(100) DEFAULT NULL, create_at DATETIME DEFAULT NULL, update_at DATETIME DEFAULT NULL, INDEX IDX_161498D3F68139D7 (adhesion_id), INDEX IDX_161498D34EC001D1 (season_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D3F68139D7 FOREIGN KEY (adhesion_id) REFERENCES adhesion (id)');
        $this->addSql('ALTER TABLE card ADD CONSTRAINT FK_161498D34EC001D1 FOREIGN KEY (season_id) REFERENCES season (id)');
        $this->addSql('ALTER TABLE adherent ADD card_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE adherent ADD CONSTRAINT FK_90D3F0604ACC9A20 FOREIGN KEY (card_id) REFERENCES card (id)');
        $this->addSql('CREATE INDEX IDX_90D3F0604ACC9A20 ON adherent (card_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE adherent DROP FOREIGN KEY FK_90D3F0604ACC9A20');
        $this->addSql('DROP TABLE card');
        $this->addSql('DROP INDEX IDX_90D3F0604ACC9A20 ON adherent');
        $this->addSql('ALTER TABLE adherent DROP card_id');
    }
}
