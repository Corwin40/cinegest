<?php

namespace App\Entity\Webapp;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\Webapp\VideoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=VideoRepository::class)
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"videos_read"}
 *     }
 * )
 */
class Video
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"videos_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"videos_read"})
     */
    private $titre;

    /**
     * @ORM\Column(type="string", length=6, nullable=true)
     *
     * @Groups({"videos_read"})
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=1, nullable=true)
     *
     * @Groups({"videos_read"})
     */
    private $lettre;

    /**
     * @ORM\Column(type="string", length=4, nullable=true)
     *
     * @Groups({"videos_read"})
     */
    private $annee;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"videos_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"videos_read"})
     */
    private $filename;

    /**
     * @ORM\ManyToOne(targetEntity=Season::class, inversedBy="videos")
     *
     * @Groups({"videos_read"})
     */
    private $season;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"videos_read"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"videos_read"})
     */
    private $updateAt;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getLettre(): ?string
    {
        return $this->lettre;
    }

    public function setLettre(?string $lettre): self
    {
        $this->lettre = $lettre;

        return $this;
    }

    public function getAnnee(): ?string
    {
        return $this->annee;
    }

    public function setAnnee(?string $annee): self
    {
        $this->annee = $annee;

        return $this;
    }

    public function getFilename(): ?string
    {
        return $this->filename;
    }

    public function setFilename(?string $filename): self
    {
        $this->filename = $filename;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getSeason(): ?Season
    {
        return $this->season;
    }

    public function setSeason(?Season $season): self
    {
        $this->season = $season;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    public function setCreateAt(?\DateTimeInterface $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->updateAt;
    }

    public function setUpdateAt(?\DateTimeInterface $updateAt): self
    {
        $this->updateAt = $updateAt;

        return $this;
    }
}
