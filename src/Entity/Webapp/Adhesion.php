<?php

namespace App\Entity\Webapp;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\Webapp\AdhesionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AdhesionRepository::class)
 *
 * @ApiResource(
 *     normalizationContext={
 *      "Groups"={"adhesions_read"}
 *     }
 * )
 */
class Adhesion
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"adhesions_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=30)
     *
     * @Groups({"adhesions_read", "cards_read"})
     */
    private $type;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"adhesions_read"})
     */
    private $cotisation;

    /**
     * @ORM\ManyToOne(targetEntity=Season::class, inversedBy="adhesions")
     * @Groups({"adhesions_read"})
     */
    private $season;

    /**
     * @ORM\OneToMany(targetEntity=Card::class, mappedBy="adhesion")
     */
    private $cards;

    public function __construct()
    {
        $this->adress = new ArrayCollection();
        $this->cards = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCotisation(): ?string
    {
        return $this->cotisation;
    }

    public function setCotisation(?string $cotisation): self
    {
        $this->cotisation = $cotisation;

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

    /**
     * @return Collection|Card[]
     */
    public function getCards(): Collection
    {
        return $this->cards;
    }

    public function addCard(Card $card): self
    {
        if (!$this->cards->contains($card)) {
            $this->cards[] = $card;
            $card->setAdhesion($this);
        }

        return $this;
    }

    public function removeCard(Card $card): self
    {
        if ($this->cards->contains($card)) {
            $this->cards->removeElement($card);
            // set the owning side to null (unless already changed)
            if ($card->getAdhesion() === $this) {
                $card->setAdhesion(null);
            }
        }

        return $this;
    }
}
