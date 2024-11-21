<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241119145716 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category_equipment (category_id INT NOT NULL, equipment_id INT NOT NULL, INDEX IDX_145807B312469DE2 (category_id), INDEX IDX_145807B3517FE9FE (equipment_id), PRIMARY KEY(category_id, equipment_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, equipment_id INT NOT NULL, content VARCHAR(255) NOT NULL, INDEX IDX_C53D045F517FE9FE (equipment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category_equipment ADD CONSTRAINT FK_145807B312469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE category_equipment ADD CONSTRAINT FK_145807B3517FE9FE FOREIGN KEY (equipment_id) REFERENCES equipment (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F517FE9FE FOREIGN KEY (equipment_id) REFERENCES equipment (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_equipment DROP FOREIGN KEY FK_145807B312469DE2');
        $this->addSql('ALTER TABLE category_equipment DROP FOREIGN KEY FK_145807B3517FE9FE');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F517FE9FE');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE category_equipment');
        $this->addSql('DROP TABLE image');
    }
}
